import { normalizeNumUnit as n } from "../../utils/format.js";
import { ecOrientValue as m } from "./help.const.js";
const h = {
  orient({ value: r, record: t, effectProp: e }) {
    switch (r) {
      case m.horizontal:
        return "row";
      case m.vertical:
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
  left({ value: r, record: t, effectProp: e, key: o }) {
    return r === "center" ? (e["--custom-root-justify"] = "center", "") : (e["--custom-root-justify"] = "flex-start", n(r));
  },
  right({ value: r, record: t, effectProp: e, key: o }) {
    return r === "center" ? (e["--custom-root-justify"] = "center", "") : (e["--custom-root-justify"] = "flex-end", n(r));
  },
  top({ value: r, record: t, effectProp: e, key: o }) {
    return r === "center" ? (e["--custom-root-justify"] = "center", "") : n(r);
  },
  bottom({ value: r, record: t, effectProp: e, key: o }) {
    return r === "center" ? (e["--custom-root-justify"] = "center", "") : n(r);
  },
  height({ value: r, record: t, effectProp: e }) {
    return n(r);
  },
  lineHeight({ value: r, record: t, effectProp: e }) {
    return n(r);
  },
  itemWidth({ value: r, record: t, effectProp: e }) {
    return n(r);
  },
  itemHeight({ value: r, record: t, effectProp: e }) {
    return n(r);
  },
  itemGap({ value: r, record: t, effectProp: e }) {
    return n(r);
  },
  padding({ value: r, record: t, effectProp: e }) {
    return n(r);
  },
  selectorButtonGap({ value: r, record: t, effectProp: e }) {
    return n(r);
  },
  selectorItemGap({ value: r, record: t, effectProp: e }) {
    return n(r);
  },
  borderRadius({ value: r, record: t, effectProp: e }) {
    return n(r);
  },
  width({ value: r, record: t, effectProp: e }) {
    switch (r) {
      case "auto":
        return "100%";
      default:
        return n(r);
    }
  },
  borderWidth({ value: r, record: t, effectProp: e }) {
    switch (r) {
      case "auto":
        return "2px";
      default:
        return n(r);
    }
  },
  inactiveWidth({ value: r, record: t, effectProp: e }) {
    return n(r);
  },
  fontSize({ value: r, record: t, effectProp: e }) {
    return n(r);
  },
  inactiveBorderWidth({ value: r, record: t, effectProp: e }) {
    switch (r) {
      case "auto":
        return "0px";
      default:
        return n(r);
    }
  },
  default({ value: r, record: t, effectProp: e }) {
    return r;
  }
}, l = {
  fontSize({ value: r }) {
    return n(r);
  },
  width({ value: r }) {
    return n(r);
  },
  height({ value: r }) {
    return n(r);
  },
  lineHeight({ value: r }) {
    return n(r);
  },
  borderWidth({ value: r }) {
    return n(r);
  },
  padding({ value: r }) {
    return Array.isArray(r) ? r.map((t) => n(t)).join(" ") : n(r);
  },
  default({ value: r }) {
    return r;
  }
};
function y({
  legendIndex: r,
  series: t,
  legend: e
}) {
  var d;
  const o = t.at(r) ?? t.at(0);
  if (!o) return [];
  const a = (o == null ? void 0 : o.data) ?? [];
  if (!a.length) return [];
  let i = [];
  if ((d = e == null ? void 0 : e.data) != null && d.length && (i = e.data.map((f) => {
    const c = typeof f == "string" ? f : f.name;
    return typeof f == "string" ? {
      name: c,
      serie: o
    } : {
      name: f.name,
      icon: f.icon,
      serie: o
    };
  })), (o == null ? void 0 : o.type) === "pie") {
    if (i.length) {
      const f = a.reduce((c, u) => (c[u.name] = u.name, c.serie = o, c), {});
      return i.filter((c) => !!f[c.name]);
    }
    return a;
  }
  if (t != null && t[0].name) {
    if (i.length) {
      const f = t.reduce((c, u) => (c[u.name] = u.name, c), {});
      return i.filter((c) => !!f[c.name]);
    }
    return t.map((f, c) => {
      var u;
      return {
        serie: t.at(c),
        name: (u = f.name) == null ? void 0 : u.toString()
      };
    }).filter(Boolean);
  }
  return [];
}
export {
  y as normalizeLegendName,
  h as transformCss,
  l as transformTextStyle
};
