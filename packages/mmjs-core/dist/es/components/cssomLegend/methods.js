import { matchCenterKey as m, innerIocnNames as p } from "./help.const.js";
import { transformTextStyle as l, transformCss as h } from "./filters.js";
function j(t, n) {
  var e;
  return ((e = t == null ? void 0 : t.selected) == null ? void 0 : e[n]) ?? !0;
}
function I(t, n) {
  var i;
  const e = typeof (t == null ? void 0 : t.formatter) == "function" ? t == null ? void 0 : t.formatter(n) : t.formatter ?? n;
  return (i = t == null ? void 0 : t.textStyle) != null && i.rich ? x({
    legend: t,
    richName: e
  }) : e;
}
function M(t) {
  var i;
  const n = {}, e = ((i = t.textStyle) == null ? void 0 : i.rich) ?? {};
  for (let r in e) {
    const s = e[r];
    if (s)
      for (let c in s)
        n[`--textStyle-${c}`] = s[c];
  }
  return n;
}
function x({
  legend: t,
  richName: n
}) {
  return b(n).map((e) => {
    var i, r, s;
    switch (e.type) {
      case "rich":
        const c = [], u = (((i = t.textStyle) == null ? void 0 : i.rich) ?? {})[e == null ? void 0 : e.name];
        for (let o in u) {
          const a = l[o] ?? l.default;
          c.push(
            `--rich-textStyle-${o}: ${a({
              value: u[o]
            })}`
          );
        }
        return `<span style="${c.join(
          ";"
        )}" class="cssom_legend-rich cssom_legend-rich--${e.name}">${e.content}</span>`;
      case "text":
        return (s = (r = e.content) == null ? void 0 : r.replaceAll(" ", "&nbsp;")) == null ? void 0 : s.replaceAll(`
`, "<br />");
      default:
        return "";
    }
  }).join("");
}
function k(t) {
  const n = {};
  return y(t, n, ""), {
    ...n
  };
}
function y(t, n, e = "") {
  for (let i in t) {
    const r = t[i];
    typeof r == "string" || typeof r == "number" ? $(e, i, n, r, t) : Object.prototype.toString.call(r) === "[object Object]" && y(r, n, i);
  }
}
function $(t, n, e, i, r) {
  const c = [t, n].filter(Boolean).join("-");
  if (m.includes(n) && i === "center") {
    e["--custom-root-justify"] = "center";
    return;
  }
  const f = h[n];
  e[`--${c}`] = f ? f(i, r, e) : h.default(i, r, e);
}
function w(t, n) {
  var i, r, s, c;
  const e = [];
  return t ? e.push(`legend-icon--${p[t] ?? t}`) : (i = n.serie) != null && i.type ? e.push(`legend-icon--${(r = n.serie) == null ? void 0 : r.type}`) : t || e.push("legend-icon--roundRect"), (s = n.serie) != null && s.symbol && e.push(`legend-symbol--${(c = n.serie) == null ? void 0 : c.symbol}`), e;
}
function P(t = "") {
  let n = 1 / 0, e = 1 / 0, i = -1 / 0, r = -1 / 0;
  const s = t.match(/[a-df-z][^a-df-z]*/gi);
  return s == null || s.forEach((c) => {
    const f = c.slice(1).trim().split(/[\s,]+/).map(Number);
    for (let u = 0; u < f.length; u += 2) {
      const o = f[u], a = f[u + 1];
      isNaN(o) || (n = Math.min(n, o)), isNaN(a) || (e = Math.min(e, a)), isNaN(o) || (i = Math.max(i, o)), isNaN(a) || (r = Math.max(r, a));
    }
  }), `${n} ${e} ${i - n + 2} ${r - e + 2}`;
}
function b(t) {
  const n = [], e = /\{([^}|]+)\|([^}]+)\}/g;
  let i, r = 0;
  for (; (i = e.exec(t)) !== null; )
    i.index > r && n.push({
      type: "text",
      content: t.substring(r, i.index)
    }), n.push({
      type: "rich",
      name: i[1],
      content: i[2] ?? ""
    }), r = i.index + i[0].length;
  return r < t.length && n.push({
    type: "text",
    content: t.substring(r)
  }), n;
}
export {
  P as calculateViewBox,
  I as formatter,
  k as getCustomLegendProperty,
  w as getIconModified,
  j as getSelectStatus,
  b as parseRichFormatString,
  M as useRichStyleProperties
};
