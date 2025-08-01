/**
 * @see https://www.npmjs.com/package/mmjs-share
 * @deprecated 已经迁移到 mmjs-share package
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
export declare const parseUrlParams: (url?: string, options?: {
    includeHashParams?: boolean;
}) => Record<string, string | boolean | string[]>;
