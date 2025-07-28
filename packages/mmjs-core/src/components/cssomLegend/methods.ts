import { type LegendComponentOption } from "echarts";
import { innerIocnNames, matchCenterKey } from "./help.const";
import { transformCss, transformTextStyle } from "./filters";
import type { CssLegendPropType, CustomDataItem } from "./types";

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
          const styles: string[] = [];
          const richs = legend.textStyle?.rich ?? {};
          const rich = richs[item?.name!];
          for (let key in rich) {
            const filterFn =
              transformTextStyle[key] ?? transformTextStyle.default;
            styles.push(
              `--rich-textStyle-${key}: ${filterFn({
                value: rich[key],
              })}`
            );
          }
          return `<span style="${styles.join(
            ";"
          )}" class="cssom_legend-rich cssom_legend-rich--${item.name}">${
            item.content
          }</span>`;
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
  forPropertsEffect(legend, propertys, "");
  return {
    ...propertys,
  };
}

function forPropertsEffect(
  data: LegendComponentOption,
  propertys: Record<string, string | number>,
  pkey: string = ""
) {
  for (let key in data) {
    const item = data[key];
    if (typeof item === "string" || typeof item === "number") {
      normalizeProperty(pkey, key, propertys, item, data);
    } else if (Object.prototype.toString.call(item) === "[object Object]") {
      forPropertsEffect(item, propertys, key);
    }
  }
}

function normalizeProperty(
  parentKey: string,
  key: string,
  propertys: Record<string, string | number>,
  value: string | number,
  data: LegendComponentOption
) {
  const keys = [parentKey, key].filter(Boolean);
  const newKey = keys.join("-");
  if (matchCenterKey.includes(key) && value === "center") {
    // propertys[`--${newKey}`] = "50%";
    propertys[`--custom-root-justify`] = "center";
    // propertys[`--custom-translate`] = `translate(${[
    //   translateCenterXMaps[key] ?? translateCenterXMaps.default,
    //   translateCenterYMaps[key] ?? translateCenterYMaps.default,
    // ].join(",")})`;
    return;
  }
  const filterFn = transformCss[key as keyof typeof transformCss];
  propertys[`--${newKey}`] = filterFn
    ? filterFn(value, data, propertys)
    : transformCss.default(value, data, propertys);
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

export function calculateViewBox(pathData: string = "") {
  let minX = Infinity,
    minY = Infinity;
  let maxX = -Infinity,
    maxY = -Infinity;

  // 简化版path解析逻辑
  const commands = pathData.match(/[a-df-z][^a-df-z]*/gi);
  commands?.forEach((cmd) => {
    const nums = cmd
      .slice(1)
      .trim()
      .split(/[\s,]+/)
      .map(Number);
    for (let i = 0; i < nums.length; i += 2) {
      const x = nums[i],
        y = nums[i + 1];
      if (!isNaN(x)) minX = Math.min(minX, x);
      if (!isNaN(y)) minY = Math.min(minY, y);
      if (!isNaN(x)) maxX = Math.max(maxX, x);
      if (!isNaN(y)) maxY = Math.max(maxY, y);
    }
  });

  return `${minX} ${minY} ${maxX - minX + 2} ${maxY - minY + 2}`;
}

/**
 *
 * @param str
 * @example
 * const parsed = parseRichFormatString("{name|Union Ads}\n{test|测试}");
 * @returns
 */
export function parseRichFormatString(str: string) {
  const result: {
    type: "text" | "rich";
    content: string;
    name?: string;
  }[] = [];
  const regex = /\{([^}|]+)\|([^}]+)\}/g;
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(str)) !== null) {
    // 添加普通文本（如果有）
    if (match.index > lastIndex) {
      result.push({
        type: "text",
        content: str.substring(lastIndex, match.index),
      });
    }

    // 添加富文本部分
    result.push({
      type: "rich",
      name: match[1],
      content: match[2] ?? "",
    });

    lastIndex = match.index + match[0].length;
  }

  // 添加剩余的普通文本（如果有）
  if (lastIndex < str.length) {
    result.push({
      type: "text",
      content: str.substring(lastIndex),
    });
  }

  return result;
}
