import { normalizeNumUnit as o } from "../../utils/format.js";
import { ecOrientValue as i } from "./help.const.js";
const l = {
  orient(r, e, t) {
    switch (r) {
      case i.horizontal:
        return "row";
      case i.vertical:
        return "column";
      default:
        return r;
    }
  },
  align(r, e, t) {
    switch (r) {
      case "right":
        return "row-reverse";
      default:
        return "row";
    }
  },
  left(r, e, t) {
    return t["--custom-root-justify"] = "flex-start", o(r);
  },
  right(r, e, t) {
    return t["--custom-root-justify"] = "flex-end", o(r);
  },
  height(r, e, t) {
    return o(r);
  },
  lineHeight(r, e, t) {
    return o(r);
  },
  itemWidth(r, e, t) {
    return o(r);
  },
  itemHeight(r, e, t) {
    return o(r);
  },
  itemGap(r, e, t) {
    return o(r);
  },
  padding(r, e, t) {
    return o(r);
  },
  selectorButtonGap(r, e, t) {
    return o(r);
  },
  selectorItemGap(r, e, t) {
    return o(r);
  },
  borderRadius(r, e, t) {
    return o(r);
  },
  borderWidth(r, e, t) {
    switch (r) {
      case "auto":
        return "2px";
      default:
        return o(r);
    }
  },
  inactiveWidth(r, e, t) {
    return o(r);
  },
  fontSize(r, e, t) {
    return o(r);
  },
  inactiveBorderWidth(r, e, t) {
    switch (r) {
      case "auto":
        return "0px";
      default:
        return o(r);
    }
  },
  default(r, e, t) {
    return r;
  }
};
function h({
  serie: r,
  series: e,
  legend: t
}) {
  var d;
  const u = (r == null ? void 0 : r.data) ?? [];
  if (!u.length) return [];
  let f = [];
  if ((d = t == null ? void 0 : t.data) != null && d.length && (f = t.data.map((c) => {
    const n = typeof c == "string" ? c : c.name;
    return typeof c == "string" ? {
      name: n
    } : {
      ...c
    };
  })), (r == null ? void 0 : r.type) === "pie") {
    if (f.length) {
      const c = u.reduce((n, a) => (n[a.name] = a.name, n), {});
      return f.filter((n) => !!c[n.name]);
    }
    return u;
  }
  if (e != null && e[0].name) {
    if (f.length) {
      const c = e.reduce((n, a) => (n[a.name] = a.name, n), {});
      return f.filter((n) => !!c[n.name]);
    }
    return e.map((c) => {
      var n;
      return {
        name: (n = c.name) == null ? void 0 : n.toString()
      };
    }).filter(Boolean);
  }
  return [];
}
export {
  h as normalizeLegendName,
  l as transformCss
};
