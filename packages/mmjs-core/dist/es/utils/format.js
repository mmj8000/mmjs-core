function f(m, r = 2, t = !1) {
  let e = m;
  if (typeof e != "number" && (e = Number(e)), Number.isNaN(e))
    return 0;
  if (t)
    return Number(e.toFixed(r));
  let [u, i] = `${e}`.split(".");
  return typeof r == "number" && i ? +`${u}.${i.slice(0, r)}` : Number(u);
}
export {
  f as keepDecimals
};
