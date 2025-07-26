import { matchCenterKey as f, translateCenterXMaps as e, translateCenterYMaps as s } from "./help.const.js";
import { transformCss as a } from "./filters.js";
function m(t) {
  console.log(t);
  const n = {};
  for (let o in t) {
    const r = t[o];
    (typeof r == "string" || typeof r == "number") && i(o, n, r);
  }
  return console.log(n), {
    ...n
  };
}
function i(t, n, o) {
  if (f.includes(t) && o === "center") {
    n[`--${t}`] = "50%", n["--css-translate"] = `translate(${[
      e[t] ?? e.default,
      s[t] ?? s.default
    ].join(",")})`;
    return;
  }
  const r = a[t];
  n[`--${t}`] = r ? r(o, n) : a.default(o, n);
}
export {
  m as getCustomLegendProperty
};
