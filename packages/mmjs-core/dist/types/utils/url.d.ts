/**
 * 判断URL是否是完整链接，如果不是则拼接当前origin
 * @param {string} url - 要检查的URL
 * @example
    console.log(normalizeURL('https://example.com')); // "https://example.com"
    console.log(normalizeURL('http://example.com'));  // "http://example.com"
    console.log(normalizeURL('//example.com'));      // "http(s)://example.com" (取决于当前页面协议)
    console.log(normalizeURL('/api/data'));           // "http(s)://当前域名/api/data"
    console.log(normalizeURL('data.json'));           // "http(s)://当前域名/当前路径/data.json"
 * @returns {string} 处理后的完整URL
 */
export declare function normalizeURL(url: string): string;
