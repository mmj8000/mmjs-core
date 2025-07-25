import { type LegendComponentOption } from "echarts";

export function getCustomLegendProperty(legend: LegendComponentOption) {
  console.log(legend);
  const propertys = {};
  for (let key in legend) {
    if (legend.hasOwnProperty(key) && typeof legend[key] !== "object") {
      normalizeCenterProperty(key, propertys, legend[key]);
    }
  }
  console.log(propertys);
  return {
    ...propertys,
  };
}
const matchCenterKey = ["left", "top", "right", "bottom"];
const translateCenterXMaps = {
  left: "-50%",
  right: "50%",
  default: "0px",
} as const;
const translateCenterYMaps = {
  bottom: "50%",
  top: "-50%",
  default: "0px",
} as const;
function normalizeCenterProperty(
  key: string,
  propertys: Record<string, string | number>,
  value: string | number
) {
  if (matchCenterKey.includes(key) && value === "center") {
    propertys[`--${key}`] = "50%";
    propertys[`--css-translate`] = `translate(${[
      translateCenterXMaps[key] ?? translateCenterXMaps.default,
      translateCenterYMaps[key] ?? translateCenterYMaps.default,
    ].join(",")})`;
    return;
  }
  propertys[`--${key}`] = value;
}
