import { type LegendComponentOption, type SeriesOption } from "echarts";
import { normalizeNumUnit } from "../../utils/format";
import { ecOrientValue } from "./help.const";
import type { CustomDataItem, FilterTemplate } from "./types";

export const transformCss: FilterTemplate = {
  orient({ value, record, effectProp }) {
    if (Array.isArray(value)) return "";
    switch (value) {
      case ecOrientValue.horizontal:
        return "row";
      case ecOrientValue.vertical:
        return "column";
      default:
        return value;
    }
  },
  align({ value, record, effectProp }) {
    switch (value) {
      case "right":
        return "row-reverse";
      default:
        return "row";
    }
  },
  left({ value, record, effectProp, key }) {
    if (Array.isArray(value)) return "";
    if (value === "center") {
      effectProp[`--custom-root-justify`] = "center";
      return "";
    }
    effectProp[`--custom-root-justify`] = "flex-start";
    return normalizeNumUnit(value);
  },
  right({ value, record, effectProp, key }) {
    if (Array.isArray(value)) return "";
    if (value === "center") {
      effectProp[`--custom-root-justify`] = "center";
      return "";
    }
    effectProp[`--custom-root-justify`] = "flex-end";
    return normalizeNumUnit(value);
  },
  top({ value, record, effectProp, key }) {
    if (Array.isArray(value)) return "";
    if (value === "center") {
      effectProp[`--custom-root-justify`] = "center";
      return "";
    }
    return normalizeNumUnit(value);
  },
  bottom({ value, record, effectProp, key }) {
    if (Array.isArray(value)) return "";
    if (value === "center") {
      effectProp[`--custom-root-justify`] = "center";
      return "";
    }
    return normalizeNumUnit(value);
  },
  height({ value, record, effectProp }) {
    if (Array.isArray(value)) return "";
    return normalizeNumUnit(value);
  },
  data({ value, record, effectProp }) {
    return "";
  },
  icon({ value, record, effectProp }) {
    if (value?.toString().startsWith("path:")) {
      return value?.toString()?.slice(8);
    } else if (value?.toString().startsWith("image:")) {
      return value?.toString()?.slice(8);
    }
    return "";
  },
  lineHeight({ value, record, effectProp }) {
    if (Array.isArray(value)) return "";
    return normalizeNumUnit(value);
  },
  itemWidth({ value, record, effectProp }) {
    if (Array.isArray(value)) return "";
    return normalizeNumUnit(value);
  },
  itemHeight({ value, record, effectProp }) {
    if (Array.isArray(value)) return "";
    return normalizeNumUnit(value);
  },
  itemGap({ value, record, effectProp }) {
    if (Array.isArray(value)) return "";
    return normalizeNumUnit(value);
  },
  padding({ value }) {
    if (Array.isArray(value)) {
      return value.map((v) => normalizeNumUnit(v)).join(" ");
    }
    return normalizeNumUnit(value);
  },
  selectorButtonGap({ value, record, effectProp }) {
    if (Array.isArray(value)) return "";
    return normalizeNumUnit(value);
  },
  selectorItemGap({ value, record, effectProp }) {
    if (Array.isArray(value)) return "";
    return normalizeNumUnit(value);
  },
  borderRadius({ value, record, effectProp }) {
    if (Array.isArray(value)) return "";
    return normalizeNumUnit(value);
  },
  width({ value, record, effectProp }) {
    if (Array.isArray(value)) return "";
    switch (value) {
      case "auto":
        return "100%";
      default:
        return normalizeNumUnit(value);
    }
  },
  borderWidth({ value, record, effectProp }) {
    if (Array.isArray(value)) return "";
    switch (value) {
      case "auto":
        return "2px";
      default:
        return normalizeNumUnit(value);
    }
  },
  inactiveWidth({ value, record, effectProp }) {
    if (Array.isArray(value)) return "";
    return normalizeNumUnit(value);
  },
  fontSize({ value, record, effectProp }) {
    if (Array.isArray(value)) return "";
    return normalizeNumUnit(value);
  },
  inactiveBorderWidth({ value, record, effectProp }) {
    if (Array.isArray(value)) return "";
    switch (value) {
      case "auto":
        return "0px";
      default:
        return normalizeNumUnit(value);
    }
  },
  default({ value, record, effectProp }) {
    if (Array.isArray(value)) return "";
    return value;
  },
};

export const transformTextStyle: FilterTemplate = {
  fontSize({ value }) {
    if (Array.isArray(value)) return "";
    return normalizeNumUnit(value);
  },
  width({ value }) {
    if (Array.isArray(value)) return "";
    return normalizeNumUnit(value);
  },
  height({ value }) {
    if (Array.isArray(value)) return "";
    return normalizeNumUnit(value);
  },
  lineHeight({ value }) {
    if (Array.isArray(value)) return "";
    return normalizeNumUnit(value);
  },
  borderWidth({ value }) {
    if (Array.isArray(value)) return "";
    return normalizeNumUnit(value);
  },
  padding({ value }) {
    if (Array.isArray(value)) {
      return value.map((v) => normalizeNumUnit(v)).join(" ");
    }
    return normalizeNumUnit(value);
  },
  default({ value }) {
    if (Array.isArray(value)) return value.join(" ");
    return value;
  },
};

export function normalizeLegendName({
  legendIndex,
  series,
  legend,
}: {
  legend: LegendComponentOption;
  legendIndex: number;
  series: SeriesOption[];
}): CustomDataItem[] {
  const serie = series.at(legendIndex) ?? series.at(0);
  if (!serie) return [];
  const data = (serie?.data as any[]) ?? [];
  if (!data.length) return [];
  let legendData: CustomDataItem[] = [];
  if (legend?.data?.length) {
    legendData = legend.data.map((item) => {
      if (typeof item === "string") {
        return {
          name: item,
   
        };
      }
      return {
        ...item,
        name: item.name!,
        icon: item.icon,
      
      };
    });
  }

  if (serie?.type === "pie") {
    if (legendData.length) {
      const serieNames = data.reduce((pre, cur) => {
        pre[cur.name] = cur.name;
        pre["serie"] = serie;
        return pre;
      }, {});
      return legendData.filter((item) => !!serieNames[item.name!]);
    }
    return data;
  }

  // 其余格式
  if (series?.[0].name) {
    if (legendData.length) {
      const serieNames = series.reduce((pre, cur) => {
        pre[cur.name!] = cur.name;
        return pre;
      }, {});
      return legendData.filter((item) => !!serieNames[item.name!]);
    }
    return series
      .map((item, index) => {
        return {
          ...(legend[index]?.data ?? {}),
          serie: item,
          name: item.name?.toString(),
        };
      })
      .filter(Boolean);
  }

  return [];
}
