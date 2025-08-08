/**
 * 判断URL是否是完整链接，如果不是则拼接当前origin
 * @param {string} url - 要检查的URL
 * @param {string} base - Base
 * @example
    console.log(normalizeURL('https://example.com')); // "https://example.com"
    console.log(normalizeURL('http://example.com'));  // "http://example.com"
    console.log(normalizeURL('//example.com'));      // "http(s)://example.com" (取决于当前页面协议)
    console.log(normalizeURL('/api/data'));           // "http(s)://当前域名/api/data"
    console.log(normalizeURL('data.json'));           // "http(s)://当前域名/当前路径/data.json"
 * @returns {string} 处理后的完整URL
 */
export function normalizeURL(url: string) {
  if (!url) return url;
  if (!window) {
    const base = "http://localhost";
    if (/^((https|http)?:)/i.test(url)) {
      return url;
    }
    // 如果url以/开头，拼接当前origin
    if (url.startsWith("/")) {
      return base + url;
    }

    return base + "/" + url;
  }
  // 如果url已经是完整URL（http或https协议），直接返回
  if (/^(https?:)?\/\//i.test(url)) {
    return url.replace(/^(https?:)?\/\//i, (match, p1) => {
      // 如果协议部分缺失（如以//开头），补充当前协议
      return p1 ? match : window.location.protocol + "//";
    });
  }

  // 如果url以/开头，拼接当前origin
  if (url.startsWith("/")) {
    return window.location.origin + url;
  }

  // 其他情况（相对路径），拼接当前origin和当前路径的目录
  const basePath = window.location.pathname.substring(
    0,
    window.location.pathname.lastIndexOf("/") + 1
  );
  return window.location.origin + basePath + url;
}
