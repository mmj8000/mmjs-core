import { normalizeURL } from "./url";

/**
 * 增强版URL参数解析，支持解析所有位置的查询参数
 * @param url - 要解析的URL字符串，默认为当前页面URL
 * @param options - 配置选项
 * @param options.includeHashParams - 是否包含hash部分的参数，默认为true
 * @example
   const url = 'https://example.com/?test=has#/path?without=value';
   parseUrlParams(url)  // {test: 'has', without: 'value'}
   parseUrlParams(url, { includeHashParams: false }) // {test: 'has'}
 * @returns 包含所有参数键值对的对象
 */
export const parseUrlParams = (() => {
  let supportsNativeURL: boolean | null = null;

  // 提取所有查询参数部分
  const extractAllQueryStrings = (url: string): string[] => {
    const result: string[] = [];
    // 1. 首先处理 # 前面的部分（可能包含 search 参数）
    const hashIndex = url.indexOf("#");
    const beforeHash = hashIndex === -1 ? url : url.slice(0, hashIndex);

    // 解析主查询参数
    const searchStart = beforeHash.indexOf("?");
    if (searchStart !== -1) {
      result[0] = beforeHash.slice(searchStart + 1);
    }

    // 2. 然后处理 # 后面的部分（可能包含 hash 路由参数）
    if (hashIndex !== -1) {
      const afterHash = url.slice(hashIndex);
      const hashParamStart = afterHash.indexOf("?");

      // 解析 hash 中的参数
      if (hashParamStart !== -1) {
        result[1] = afterHash.slice(hashParamStart + 1);
      }
    }
    return result;
  };

  // 标准化参数值为字符串
  const normalizeValue = (value: string | boolean): string => {
    return typeof value === "boolean" ? value.toString() : value;
  };

  // 解析单个查询字符串（统一实现）
  const parseQueryString = (
    queryString: string,
    initialParams: Record<string, string | boolean | string[]> = {}
  ) => {
    const params = { ...initialParams };

    for (const pair of queryString.split("&")) {
      if (!pair.trim()) continue;

      const [encodedKey, encodedValue] = pair.split("=");
      const key = decodeURIComponent(encodedKey);
      const value =
        encodedValue === undefined ? true : decodeURIComponent(encodedValue);
      if (key in params) {
        // 如果已存在，转换为数组或添加到数组
        if (Array.isArray(params[key])) {
          (params[key] as string[]).push(normalizeValue(value));
        } else {
          params[key] = [
            normalizeValue(params[key] as string | boolean),
            normalizeValue(value),
          ];
        }
      } else {
        // 不存在，直接赋值
        params[key] = value;
      }
    }

    return params;
  };

  // 自定义实现（统一使用parseQueryString）
  const fallbackImplementation = (
    url: string,
    includeHashParams: boolean = true
  ): Record<string, string | boolean | string[]> => {
    const queryStrings = extractAllQueryStrings(url);
    if (queryStrings.length === 0) return {};
    let params = parseQueryString(queryStrings[0] ?? "");
    if (includeHashParams && queryStrings.length > 1) {
      params = parseQueryString(queryStrings[1], params);
    }

    return params;
  };

  // 原生实现（也使用parseQueryString保持一致性）
  const nativeImplementation = (
    url: string,
    includeHashParams: boolean = true
  ): Record<string, string | boolean | string[]> => {
    try {
      let params = {};

      // 解析主查询参数
      const mainUrl = new URL(normalizeURL(url));
      const mainQueryString = mainUrl.search.slice(1); // 去掉开头的'?'
      if (mainQueryString) {
        params = parseQueryString(mainQueryString);
      }

      // 解析hash中的查询参数
      if (includeHashParams) {
        const hash = mainUrl.hash;
        const hashQueryIndex = hash.indexOf("?");
        if (hashQueryIndex !== -1) {
          const hashQueryString = hash.slice(hashQueryIndex + 1);
          params = parseQueryString(hashQueryString, params);
        }
      }

      return params;
    } catch (e) {
      console.warn("Failed to use native URL parser, falling back", e);
      return fallbackImplementation(url, includeHashParams);
    }
  };

  return (
    url: string = window.location.href,
    options: { includeHashParams?: boolean } = {}
  ) => {
    const { includeHashParams = true } = options;

    if (supportsNativeURL === null) {
      supportsNativeURL =
        typeof URL !== "undefined" &&
        typeof URLSearchParams !== "undefined" &&
        typeof window !== "undefined";
    }

    return supportsNativeURL
      ? nativeImplementation(url, includeHashParams)
      : fallbackImplementation(url, includeHashParams);
  };
})();
