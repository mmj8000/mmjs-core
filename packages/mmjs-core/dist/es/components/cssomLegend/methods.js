import { innerIocnNames as l } from "./help.const.js";
import { transformTextStyle as m, transformCss as h } from "./filters.js";
import { parseRichFormatString as S } from "./tools.js";
import { isPlainObject as x } from "mmjs-share";
import { transfromState as $ } from "./transform.js";
function A(t, s) {
  var r;
  return ((r = t == null ? void 0 : t.selected) == null ? void 0 : r[s]) ?? !0;
}
function C(t, s) {
  var o;
  const r = typeof (t == null ? void 0 : t.formatter) == "function" ? t == null ? void 0 : t.formatter(s) : t.formatter ?? s;
  return (o = t == null ? void 0 : t.textStyle) != null && o.rich ? b({
    legend: t,
    richName: r
  }) : r;
}
function F(t) {
  var o;
  const s = {}, r = ((o = t.textStyle) == null ? void 0 : o.rich) ?? {};
  for (let n in r) {
    const e = r[n];
    if (e)
      for (let c in e)
        s[`--textStyle-${c}`] = e[c];
  }
  return s;
}
function b({
  legend: t,
  richName: s
}) {
  return S(s).map((r) => {
    var o, n, e;
    switch (r.type) {
      case "rich":
        const f = (((o = t.textStyle) == null ? void 0 : o.rich) ?? {})[r == null ? void 0 : r.name], i = {};
        return p(
          f,
          i,
          "rich-textStyle",
          m
        ), `<span style="${Object.entries(i).map((a) => a.join(":")).join(";")}" class="cssom_legend-rich cssom_legend-rich--${r.name}">${r.content}</span>`;
      case "text":
        return (e = (n = r.content) == null ? void 0 : n.replaceAll(" ", "&nbsp;")) == null ? void 0 : e.replaceAll(`
`, "<br />");
      default:
        return "";
    }
  }).join("");
}
function I(t) {
  const s = {};
  return p(t, s, "", h), {
    ...s
  };
}
function p(t, s, r, o) {
  for (let n in t) {
    const e = t[n];
    if (x(e))
      p(e, s, n, o);
    else if (typeof e != "function" && e !== null) {
      const f = [r, n].filter(Boolean).join("-"), i = o[n] ?? o.default, u = {
        value: e,
        record: t,
        effectProp: s,
        key: n,
        parentKey: r
      }, a = i(u), y = $.transform(a, u);
      s[`--${f}`] = y;
    }
  }
}
function L(t, s) {
  var o, n, e, c;
  const r = [];
  return t ? r.push(`legend-icon--${l[t] ?? t}`) : (o = s.serie) != null && o.type ? r.push(`legend-icon--${(n = s.serie) == null ? void 0 : n.type}`) : t || r.push("legend-icon--roundRect"), (e = s.serie) != null && e.symbol && r.push(`legend-symbol--${(c = s.serie) == null ? void 0 : c.symbol}`), r;
}
export {
  p as forPropertsEffect,
  C as formatter,
  I as getCustomLegendProperty,
  L as getIconModified,
  A as getSelectStatus,
  F as useRichStyleProperties
};
