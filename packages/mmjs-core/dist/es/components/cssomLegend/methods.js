import { matchCenterKey as N, innerIocnNames as h } from "./help.const.js";
import { transformCss as a } from "./filters.js";
function b(t, i) {
  var r;
  return ((r = t == null ? void 0 : t.selected) == null ? void 0 : r[i]) ?? !0;
}
function j(t, i) {
  return typeof (t == null ? void 0 : t.formatter) == "function" ? t == null ? void 0 : t.formatter(i) : t.formatter ?? i;
}
function M(t) {
  const i = {};
  return y(t, i, ""), {
    ...i
  };
}
function y(t, i, r = "") {
  for (let o in t) {
    const n = t[o];
    typeof n == "string" || typeof n == "number" ? p(r, o, i, n, t) : Object.prototype.toString.call(n) === "[object Object]" && y(n, i, o);
  }
}
function p(t, i, r, o, n) {
  const u = [t, i].filter(Boolean).join("-");
  if (N.includes(i) && o === "center") {
    r["--custom-root-justify"] = "center";
    return;
  }
  const f = a[i];
  r[`--${u}`] = f ? f(o, n, r) : a.default(o, n, r);
}
function $(t) {
  return t ? h[t] ?? "roundRect" : "roundRect";
}
function l(t = "") {
  let i = 1 / 0, r = 1 / 0, o = -1 / 0, n = -1 / 0;
  const c = t.match(/[a-df-z][^a-df-z]*/gi);
  return c == null || c.forEach((u) => {
    const f = u.slice(1).trim().split(/[\s,]+/).map(Number);
    for (let e = 0; e < f.length; e += 2) {
      const s = f[e], m = f[e + 1];
      isNaN(s) || (i = Math.min(i, s)), isNaN(m) || (r = Math.min(r, m)), isNaN(s) || (o = Math.max(o, s)), isNaN(m) || (n = Math.max(n, m));
    }
  }), `${i} ${r} ${o - i + 2} ${n - r + 2}`;
}
export {
  l as calculateViewBox,
  j as formatter,
  M as getCustomLegendProperty,
  $ as getIconModified,
  b as getSelectStatus
};
