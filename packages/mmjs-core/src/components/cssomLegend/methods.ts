import { type LegendComponentOption } from "echarts";
import { matchCenterKey, translateCenterXMaps, translateCenterYMaps } from "./help.const";
import { transformCss } from "./filters";
import { CssLegendPropType } from "./types";

export function getCustomLegendProperty(legend: LegendComponentOption) {
  const propertys: CssLegendPropType = {};
  forPropertsEffect(legend, propertys, '');
  console.log(propertys)
  return {
    ...propertys,
  };
}

function forPropertsEffect(data: LegendComponentOption, propertys: Record<string, string | number>, pkey: string = '') {
  for (let key in data) {
    const item = data[key];
    if (typeof item === "string" || typeof item === 'number') {
      normalizeProperty(pkey, key, propertys, item, data);
    } else if (Object.prototype.toString.call(item) === '[object Object]') {
      forPropertsEffect(item, propertys, key);
    }
  }
}

function normalizeProperty(
  parentKey: string,
  key: string,
  propertys: Record<string, string | number>,
  value: string | number,
  data: LegendComponentOption,
) {
  const keys = [parentKey, key].filter(Boolean);
  const newKey = keys.join('-');
  if (matchCenterKey.includes(key) && value === "center") {
    propertys[`--${newKey}`] = "50%";
    propertys[`--custom-translate`] = `translate(${[
      translateCenterXMaps[key] ?? translateCenterXMaps.default,
      translateCenterYMaps[key] ?? translateCenterYMaps.default,
    ].join(",")})`;
    return;
  }
  const filterFn = transformCss[key as keyof typeof transformCss];
  propertys[`--${newKey}`] = filterFn ? filterFn(value, data, propertys) : transformCss.default(value, data, propertys);
}
