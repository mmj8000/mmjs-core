function e(t) {
  if (!t) return t;
  if (!window) {
    const n = "http://localhost";
    return /^((https|http)?:)/i.test(t) ? t : t.startsWith("/") ? n + t : n + "/" + t;
  }
  if (/^(https?:)?\/\//i.test(t))
    return t.replace(/^(https?:)?\/\//i, (n, o) => o ? n : window.location.protocol + "//");
  if (t.startsWith("/"))
    return window.location.origin + t;
  const i = window.location.pathname.substring(
    0,
    window.location.pathname.lastIndexOf("/") + 1
  );
  return window.location.origin + i + t;
}
export {
  e as normalizeURL
};
