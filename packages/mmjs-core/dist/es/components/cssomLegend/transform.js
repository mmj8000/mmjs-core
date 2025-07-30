import { normalizeNumUnit as g } from "../../utils/format.js";
function s(o) {
  var n;
  return (n = o ?? []) == null ? void 0 : n.map((t) => `${t.color} ${t.offset * 100}%`).join(", ");
}
const p = {
  transform(o, n) {
    return o;
  },
  transformGradientCss(o) {
    if (typeof o == "string") return o;
    if (!(o != null && o.type)) return "";
    if (o.type === "pattern") {
      const {
        image: n,
        imageHeight: t,
        imageWidth: r,
        svgElement: l,
        svgHeight: e,
        svgWidth: f
      } = o;
      if (n)
        return `url(${n}) center/${g(
          r ?? 0
        )} ${g(t ?? 0)}`;
      if (l)
        return `url(${l}) center/${g(
          f ?? 0
        )} ${g(e ?? 0)}`;
    }
    if (o.type === "linear") {
      const { x: n, y: t, x2: r, y2: l } = o, e = r - n, f = l - t;
      return `linear-gradient(${90 - Math.atan2(f, e) * 180 / Math.PI}deg, ${s(
        o.colorStops
      )})`;
    }
    if (o.type === "radial") {
      const { x: n, y: t, r } = o;
      return `radial-gradient(${r * 100}%  ${r * 100}% at ${n * 100}% ${t * 100}%, ${s(o.colorStops)})`;
    }
    return "";
  }
};
export {
  p as transfromState
};
