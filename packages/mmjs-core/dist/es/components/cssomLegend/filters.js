import { normalizeNumUnit as n } from "../../utils/format.js";
import { ecOrientValue as p } from "./help.const.js";
const l = {
  orient(r, t, e) {
    switch (r) {
      case p.horizontal:
        return "row";
      case p.vertical:
        return "column";
      default:
        return r;
    }
  },
  align(r, t, e) {
    switch (r) {
      case "right":
        return "row-reverse";
      default:
        return "row";
    }
  },
  left(r, t, e) {
    return e["--custom-root-justify"] = "flex-start", n(r);
  },
  right(r, t, e) {
    return e["--custom-root-justify"] = "flex-end", n(r);
  },
  height(r, t, e) {
    return n(r);
  },
  lineHeight(r, t, e) {
    return n(r);
  },
  itemWidth(r, t, e) {
    return n(r);
  },
  itemHeight(r, t, e) {
    return n(r);
  },
  itemGap(r, t, e) {
    return n(r);
  },
  padding(r, t, e) {
    return n(r);
  },
  selectorButtonGap(r, t, e) {
    return n(r);
  },
  selectorItemGap(r, t, e) {
    return n(r);
  },
  borderRadius(r, t, e) {
    return n(r);
  },
  width(r, t, e) {
    switch (r) {
      case "auto":
        return "100%";
      default:
        return n(r);
    }
  },
  borderWidth(r, t, e) {
    switch (r) {
      case "auto":
        return "2px";
      default:
        return n(r);
    }
  },
  inactiveWidth(r, t, e) {
    return n(r);
  },
  fontSize(r, t, e) {
    return n(r);
  },
  inactiveBorderWidth(r, t, e) {
    switch (r) {
      case "auto":
        return "0px";
      default:
        return n(r);
    }
  },
  default(r, t, e) {
    return r;
  }
}, s = {
  fontSize({ value: r }) {
    return n(r);
  },
  width({ value: r }) {
    return n(r);
  },
  height({ value: r }) {
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
function P({
  legendIndex: r,
  series: t,
  legend: e
}) {
  var d;
  const f = t.at(r) ?? t.at(0);
  if (!f) return [];
  const i = (f == null ? void 0 : f.data) ?? [];
  if (!i.length) return [];
  let u = [];
  if ((d = e == null ? void 0 : e.data) != null && d.length && (u = e.data.map((c) => {
    const o = typeof c == "string" ? c : c.name;
    return typeof c == "string" ? {
      name: o,
      serie: f
    } : {
      name: c.name,
      icon: c.icon,
      serie: f
    };
  })), (f == null ? void 0 : f.type) === "pie") {
    if (u.length) {
      const c = i.reduce((o, a) => (o[a.name] = a.name, o.serie = f, o), {});
      return u.filter((o) => !!c[o.name]);
    }
    return i;
  }
  if (t != null && t[0].name) {
    if (u.length) {
      const c = t.reduce((o, a) => (o[a.name] = a.name, o), {});
      return u.filter((o) => !!c[o.name]);
    }
    return t.map((c, o) => {
      var a;
      return {
        serie: t.at(o),
        name: (a = c.name) == null ? void 0 : a.toString()
      };
    }).filter(Boolean);
  }
  return [];
}
export {
  P as normalizeLegendName,
  l as transformCss,
  s as transformTextStyle
};
