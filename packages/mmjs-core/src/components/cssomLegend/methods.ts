import { type LegendComponentOption } from "echarts";
import { matchCenterKey, translateCenterXMaps, translateCenterYMaps } from "./help.const";
import { transformCss } from "./filters";
import { CssLegendPropType } from "./types";

export function getCustomLegendProperty(legend: LegendComponentOption) {
  console.log(legend)
  const propertys: CssLegendPropType = {};
  for (let key in legend) {
    if (legend.hasOwnProperty(key) && typeof legend[key] !== "object") {
      normalizeProperty(key, propertys, legend[key]);
    }
  }
  return {
    ...propertys,
  };
}

function normalizeProperty(
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
  const filterFn = transformCss[key as keyof typeof transformCss];
  propertys[`--${key}`] = filterFn ? filterFn(value, propertys) : transformCss.default(value, propertys);
}
