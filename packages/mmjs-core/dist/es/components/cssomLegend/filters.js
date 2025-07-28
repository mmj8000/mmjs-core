import { normalizeNumUnit as n } from "../../utils/format.js";
import { ecOrientValue as m } from "./help.const.js";
const l = {
  orient(r, t, e) {
    switch (r) {
      case m.horizontal:
        return "row";
      case m.vertical:
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
  const c = t.at(r) ?? t.at(0);
  if (!c) return [];
  const i = (c == null ? void 0 : c.data) ?? [];
  if (!i.length) return [];
  let u = [];
  if ((d = e == null ? void 0 : e.data) != null && d.length && (u = e.data.map((f) => {
    const o = typeof f == "string" ? f : f.name;
    return typeof f == "string" ? {
      name: o,
      serie: c
    } : {
      name: f.name,
      icon: f.icon,
      serie: c
    };
  })), (c == null ? void 0 : c.type) === "pie") {
    if (u.length) {
      const f = i.reduce((o, a) => (o[a.name] = a.name, o.serie = c, o), {});
      return u.filter((o) => !!f[o.name]);
    }
    return i;
  }
  if (t != null && t[0].name) {
    if (u.length) {
      const f = t.reduce((o, a) => (o[a.name] = a.name, o), {});
      return u.filter((o) => !!f[o.name]);
    }
    return t.map((f, o) => {
      var a;
      return {
        serie: t.at(o),
        name: (a = f.name) == null ? void 0 : a.toString()
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
