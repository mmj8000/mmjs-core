function f(e, t = 2, n = !1) {
  let r = e;
  if (typeof r != "number" && (r = Number(r)), Number.isNaN(r))
    return 0;
  if (n)
    return Number(r.toFixed(t));
  let [u, i] = `${r}`.split(".");
  return typeof t == "number" && i ? +`${u}.${i.slice(0, t)}` : Number(u);
}
function m(e, t = "px") {
  return !e && e !== 0 || typeof e == "string" ? e : `${e}${t}`;
}
export {
  f as keepDecimals,
  m as normalizeNumUnit
};
