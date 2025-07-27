import { type LegendComponentOption } from "echarts";
import { innerIocnNames, matchCenterKey } from "./help.const";
import { transformCss } from "./filters";
import { CssLegendPropType } from "./types";

export function getSelectStatus(legend: LegendComponentOption, name: string) {
  return legend?.selected?.[name] ?? true;
}
export function formatter(legend: LegendComponentOption, name: string) {
  return typeof legend?.formatter === 'function' ? legend?.formatter(name) : legend.formatter ?? name;
}
export function getCustomLegendProperty(legend: LegendComponentOption) {
  const propertys: CssLegendPropType = {};
  forPropertsEffect(legend, propertys, '');
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
    // propertys[`--${newKey}`] = "50%";  
    propertys[`--custom-root-justify`] = 'center';
    // propertys[`--custom-translate`] = `translate(${[
    //   translateCenterXMaps[key] ?? translateCenterXMaps.default,
    //   translateCenterYMaps[key] ?? translateCenterYMaps.default,
    // ].join(",")})`;
    return;
  }
  const filterFn = transformCss[key as keyof typeof transformCss];
  propertys[`--${newKey}`] = filterFn ? filterFn(value, data, propertys) : transformCss.default(value, data, propertys);
}

export function getIconModified(icon?: string) {
  if (!icon) return 'roundRect';
  return innerIocnNames[icon] ?? 'roundRect';
}

export function calculateViewBox(pathData: string = '') {
  let minX = Infinity, minY = Infinity;
  let maxX = -Infinity, maxY = -Infinity;

  // 简化版path解析逻辑
  const commands = pathData.match(/[a-df-z][^a-df-z]*/gi);
  commands?.forEach(cmd => {
    const nums = cmd.slice(1).trim().split(/[\s,]+/).map(Number);
    for (let i = 0; i < nums.length; i += 2) {
      const x = nums[i], y = nums[i + 1];
      if (!isNaN(x)) minX = Math.min(minX, x);
      if (!isNaN(y)) minY = Math.min(minY, y);
      if (!isNaN(x)) maxX = Math.max(maxX, x);
      if (!isNaN(y)) maxY = Math.max(maxY, y);
    }
  });

  return `${minX} ${minY} ${maxX - minX + 2} ${maxY - minY + 2}`;
}