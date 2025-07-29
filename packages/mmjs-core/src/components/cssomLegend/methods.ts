import { type LegendComponentOption } from "echarts";
import { innerIocnNames } from "./help.const";
import { transformCss, transformTextStyle } from "./filters";
import type {
  CssLegendPropType,
  CustomDataItem,
  FilterTemplate,
} from "./types";
import { parseRichFormatString } from "./tools";
import { isObject } from "mmjs-share";
import { transfromState } from "./transform";

export function getSelectStatus(legend: LegendComponentOption, name: string) {
  return legend?.selected?.[name] ?? true;
}
export function formatter(legend: LegendComponentOption, name: string) {
  const richName =
    typeof legend?.formatter === "function"
      ? legend?.formatter(name)
      : legend.formatter ?? name;
  if (!legend?.textStyle?.rich) {
    return richName;
  }
  return matchRichText({
    legend,
    richName,
  });
}

export function useRichStyleProperties(legend: LegendComponentOption) {
  const styles = {};
  const richs = legend.textStyle?.rich ?? {};
  for (let key in richs) {
    const rich = richs[key];
    if (rich) {
      for (let key2 in rich) {
        styles[`--textStyle-${key2}`] = rich[key2];
      }
    }
  }
  return styles;
}
function matchRichText({
  legend,
  richName,
}: {
  legend: LegendComponentOption;
  richName: string;
}) {
  return parseRichFormatString(richName)
    .map((item) => {
      switch (item.type) {
        case "rich":
          const richs = legend.textStyle?.rich ?? {};
          const rich = richs[item?.name!];
          const propertys: CssLegendPropType = {};
          forPropertsEffect(
            rich,
            propertys,
            "rich-textStyle",
            transformTextStyle
          );
          const styles = Object.entries(propertys)
            .map((item) => item.join(":"))
            .join(";");
          return `<span style="${styles}" class="cssom_legend-rich cssom_legend-rich--${item.name}">${item.content}</span>`;
        case "text":
          return item.content
            ?.replaceAll(" ", "&nbsp;")
            ?.replaceAll("\n", "<br />");
        default:
          return "";
      }
    })
    .join("");
}
export function getCustomLegendProperty(legend: LegendComponentOption) {
  const propertys: CssLegendPropType = {};
  forPropertsEffect(legend, propertys, "", transformCss);
  return {
    ...propertys,
  };
}

function forPropertsEffect(
  data: object,
  propertys: Record<string, string | number>,
  parentKey: string,
  filterTemplate: FilterTemplate
) {
  for (let key in data) {
    const item = data[key];
    if (typeof item === "string" || typeof item === "number") {
      const keys = [parentKey, key].filter(Boolean);
      const newKey = keys.join("-");
      const filterFn = filterTemplate[key] ?? filterTemplate.default;
      const options = {
        value: item,
        record: data,
        effectProp: propertys,
        key,
        parentKey,
      };
      const tempValue = filterFn(options);
      const newValue = transfromState.transform(tempValue, options);
      propertys[`--${newKey}`] = newValue;
    } else if (isObject(item)) {
      forPropertsEffect(item, propertys, key, filterTemplate);
    }
  }
}

export function getIconModified(
  icon: string | undefined,
  record: CustomDataItem
) {
  const classList: string[] = [];
  if (icon) {
    classList.push(`legend-icon--${innerIocnNames[icon] ?? icon}`);
  } else if (record.serie?.type) {
    classList.push(`legend-icon--${record.serie?.type}`);
  } else if (!icon) {
    classList.push(`legend-icon--roundRect`);
  }
  // @ts-ignore
  if (record.serie?.symbol!) {
    // @ts-ignore
    classList.push(`legend-symbol--${record.serie?.symbol!}`);
  }

  return classList;
}
