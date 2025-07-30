import { normalizeNumUnit as n } from "../../utils/format.js";
import { ecOrientValue as u } from "./help.const.js";
const p = {
  orient({ value: r, record: t, effectProp: e }) {
    if (Array.isArray(r)) return "";
    switch (r) {
      case u.horizontal:
        return "row";
      case u.vertical:
        return "column";
      default:
        return r;
    }
  },
  align({ value: r, record: t, effectProp: e }) {
    switch (r) {
      case "right":
        return "row-reverse";
      default:
        return "row";
    }
  },
  left({ value: r, record: t, effectProp: e, key: i }) {
    return Array.isArray(r) ? "" : r === "center" ? (e["--custom-root-justify"] = "center", "") : (e["--custom-root-justify"] = "flex-start", n(r));
  },
  right({ value: r, record: t, effectProp: e, key: i }) {
    return Array.isArray(r) ? "" : r === "center" ? (e["--custom-root-justify"] = "center", "") : (e["--custom-root-justify"] = "flex-end", n(r));
  },
  top({ value: r, record: t, effectProp: e, key: i }) {
    return Array.isArray(r) ? "" : r === "center" ? (e["--custom-root-justify"] = "center", "") : n(r);
  },
  bottom({ value: r, record: t, effectProp: e, key: i }) {
    return Array.isArray(r) ? "" : r === "center" ? (e["--custom-root-justify"] = "center", "") : n(r);
  },
  height({ value: r, record: t, effectProp: e }) {
    return Array.isArray(r) ? "" : n(r);
  },
  data({ value: r, record: t, effectProp: e }) {
    return "";
  },
  icon({ value: r, record: t, effectProp: e }) {
    var i, a;
    return r != null && r.toString().startsWith("path:") ? (i = r == null ? void 0 : r.toString()) == null ? void 0 : i.slice(8) : r != null && r.toString().startsWith("image:") ? (a = r == null ? void 0 : r.toString()) == null ? void 0 : a.slice(8) : "";
  },
  lineHeight({ value: r, record: t, effectProp: e }) {
    return Array.isArray(r) ? "" : n(r);
  },
  itemWidth({ value: r, record: t, effectProp: e }) {
    return Array.isArray(r) ? "" : n(r);
  },
  itemHeight({ value: r, record: t, effectProp: e }) {
    return Array.isArray(r) ? "" : n(r);
  },
  itemGap({ value: r, record: t, effectProp: e }) {
    return Array.isArray(r) ? "" : n(r);
  },
  padding({ value: r }) {
    return Array.isArray(r) ? r.map((t) => n(t)).join(" ") : n(r);
  },
  selectorButtonGap({ value: r, record: t, effectProp: e }) {
    return Array.isArray(r) ? "" : n(r);
  },
  selectorItemGap({ value: r, record: t, effectProp: e }) {
    return Array.isArray(r) ? "" : n(r);
  },
  borderRadius({ value: r, record: t, effectProp: e }) {
    return Array.isArray(r) ? "" : n(r);
  },
  width({ value: r, record: t, effectProp: e }) {
    if (Array.isArray(r)) return "";
    switch (r) {
      case "auto":
        return "100%";
      default:
        return n(r);
    }
  },
  borderWidth({ value: r, record: t, effectProp: e }) {
    if (Array.isArray(r)) return "";
    switch (r) {
      case "auto":
        return "2px";
      default:
        return n(r);
    }
  },
  inactiveWidth({ value: r, record: t, effectProp: e }) {
    return Array.isArray(r) ? "" : n(r);
  },
  fontSize({ value: r, record: t, effectProp: e }) {
    return Array.isArray(r) ? "" : n(r);
  },
  inactiveBorderWidth({ value: r, record: t, effectProp: e }) {
    if (Array.isArray(r)) return "";
    switch (r) {
      case "auto":
        return "0px";
      default:
        return n(r);
    }
  },
  default({ value: r, record: t, effectProp: e }) {
    return Array.isArray(r) ? "" : r;
  }
}, h = {
  fontSize({ value: r }) {
    return Array.isArray(r) ? "" : n(r);
  },
  width({ value: r }) {
    return Array.isArray(r) ? "" : n(r);
  },
  height({ value: r }) {
    return Array.isArray(r) ? "" : n(r);
  },
  lineHeight({ value: r }) {
    return Array.isArray(r) ? "" : n(r);
  },
  borderWidth({ value: r }) {
    return Array.isArray(r) ? "" : n(r);
  },
  padding({ value: r }) {
    return Array.isArray(r) ? r.map((t) => n(t)).join(" ") : n(r);
  },
  default({ value: r }) {
    return Array.isArray(r) ? r.join(" ") : r;
  }
};
function g({
  legendIndex: r,
  series: t,
  legend: e
}) {
  var s;
  const i = t.at(r) ?? t.at(0);
  if (!i) return [];
  const a = (i == null ? void 0 : i.data) ?? [];
  if (!a.length) return [];
  let y = [];
  if ((s = e == null ? void 0 : e.data) != null && s.length && (y = e.data.map((o) => typeof o == "string" ? {
    name: o
  } : {
    ...o,
    name: o.name,
    icon: o.icon
  })), (i == null ? void 0 : i.type) === "pie") {
    if (y.length) {
      const o = a.reduce((f, c) => (f[c.name] = c.name, f.serie = i, f), {});
      return y.filter((f) => !!o[f.name]);
    }
    return a;
  }
  if (t != null && t[0].name) {
    if (y.length) {
      const o = t.reduce((f, c) => (f[c.name] = c.name, f), {});
      return y.filter((f) => !!o[f.name]);
    }
    return t.map((o, f) => {
      var c, A;
      return {
        ...((c = e[f]) == null ? void 0 : c.data) ?? {},
        serie: o,
        name: (A = o.name) == null ? void 0 : A.toString()
      };
    }).filter(Boolean);
  }
  return [];
}
export {
  g as normalizeLegendName,
  p as transformCss,
  h as transformTextStyle
};
