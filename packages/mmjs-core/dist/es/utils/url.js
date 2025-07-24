function a(t) {
  if (/^(https?:)?\/\//i.test(t))
    return t.replace(/^(https?:)?\/\//i, (o, i) => i ? o : window.location.protocol + "//");
  if (t.startsWith("/"))
    return window.location.origin + t;
  const n = window.location.pathname.substring(
    0,
    window.location.pathname.lastIndexOf("/") + 1
  );
  return window.location.origin + n + t;
}
export {
  a as normalizeURL
};
