function m(r, t = 2, n = !1) {
  let e = r;
  if (typeof e != "number" && (e = Number(e)), Number.isNaN(e))
    return 0;
  if (n)
    return Number(e.toFixed(t));
  let [u, i] = `${e}`.split(".");
  return typeof t == "number" && i ? +`${u}.${i.slice(0, t)}` : Number(u);
}
function f(r, t = "px") {
  return typeof r == "string" ? r : `${r}${t}`;
}
export {
  m as keepDecimals,
  f as normalizeNumUnit
};
