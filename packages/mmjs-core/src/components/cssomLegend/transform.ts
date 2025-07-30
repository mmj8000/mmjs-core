import type { ImagePatternObject, SVGPatternObject } from "echarts";
import type { GradientColorStop, TransfromState } from "./types";
import { normalizeNumUnit } from "../../utils/format";

function getCssStops(colorStops: GradientColorStop[]) {
  return (colorStops ?? [])
    ?.map((item) => {
      return `${item.color} ${item.offset * 100}%`;
    })
    .join(", ");
}
export const transfromState: TransfromState = {
  transform(value, _options) {
    return value;
  },
  transformGradientCss(echartsGradient) {
    if (typeof echartsGradient === "string") return echartsGradient;
    if (!echartsGradient?.type) return "";
    if (echartsGradient.type === "pattern") {
      const {
        image,
        imageHeight,
        imageWidth,
        svgElement,
        svgHeight,
        svgWidth,
      } = echartsGradient as ImagePatternObject & SVGPatternObject;
      if (image) {
        return `url(${image}) center/${normalizeNumUnit(
          imageWidth ?? 0
        )} ${normalizeNumUnit(imageHeight ?? 0)}`;
      } else if (svgElement) {
        return `url(${svgElement}) center/${normalizeNumUnit(
          svgWidth ?? 0
        )} ${normalizeNumUnit(svgHeight ?? 0)}`;
      }
    }

    if (echartsGradient.type === "linear") {
      const { x: lx, y: ly, x2, y2 } = echartsGradient;

      // 计算角度
      const dx = x2 - lx;
      const dy = y2 - ly;
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      const cssAngle = 90 - angle;
      return `linear-gradient(${cssAngle}deg, ${getCssStops(
        echartsGradient.colorStops
      )})`;
    }

    if (echartsGradient.type === "radial") {
      const { x: rx, y: ry, r: rr } = echartsGradient;

      return `radial-gradient(${rr * 100}%  ${rr * 100}% at ${rx * 100}% ${
        ry * 100
      }%, ${getCssStops(echartsGradient.colorStops)})`;
    }

    return "";
  },
  transformWrapMaxWidth(val: number, unit: "px") {
    return !val && typeof val === 'number' ? "auto" : `${val}${unit}`;
  },
};
