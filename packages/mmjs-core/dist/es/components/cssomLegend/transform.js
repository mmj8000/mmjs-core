import { normalizeNumUnit as f } from "../../utils/format.js";
function $(o) {
  var n;
  return (n = o ?? []) == null ? void 0 : n.map((t) => `${t.color} ${t.offset * 100}%`).join(", ");
}
const i = {
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
        svgElement: e,
        svgHeight: g,
        svgWidth: u
      } = o;
      if (n)
        return `url(${n}) center/${f(
          r ?? 0
        )} ${f(t ?? 0)}`;
      if (e)
        return `url(${e}) center/${f(
          u ?? 0
        )} ${f(g ?? 0)}`;
    }
    if (o.type === "linear") {
      const { x: n, y: t, x2: r, y2: e } = o, g = r - n, u = e - t;
      return `linear-gradient(${90 - Math.atan2(u, g) * 180 / Math.PI}deg, ${$(
        o.colorStops
      )})`;
    }
    if (o.type === "radial") {
      const { x: n, y: t, r } = o;
      return `radial-gradient(${r * 100}%  ${r * 100}% at ${n * 100}% ${t * 100}%, ${$(o.colorStops)})`;
    }
    return "";
  },
  transformWrapMaxWidth(o, n) {
    return !o && typeof o == "number" ? "auto" : `${o}${n}`;
  }
};
export {
  i as transfromState
};
