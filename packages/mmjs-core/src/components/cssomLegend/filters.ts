import { type LegendComponentOption, type SeriesOption } from "echarts";
import { normalizeNumUnit } from "../../utils/format";
import { ecOrientValue } from "./help.const";
import type { CssLegendPropType, CssLegendPropValue, DataItem, PieSeriesRecordDataType$1 } from "./types";


export const transformCss = {
    orient(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        switch (value) {
            case ecOrientValue.horizontal:
                return 'row';
            case ecOrientValue.vertical:
                return 'column';
            default:
                return value;
        }
    },
    align(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        switch (value) {
            case 'right':
                return 'row-reverse';
            default:
                return 'row';
        }
    },
    left(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        effectProp[`--custom-root-justify`] = 'flex-start';
        return normalizeNumUnit(value);
    },
    right(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        effectProp[`--custom-root-justify`] = 'flex-end';
        return normalizeNumUnit(value);
    },
    height(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    lineHeight(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    itemWidth(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    itemHeight(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    itemGap(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    padding(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    selectorButtonGap(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    selectorItemGap(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    borderRadius(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    borderWidth(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        switch (value) {
            case 'auto':
                return '2px';
            default:
                return normalizeNumUnit(value);
        }
    },
    inactiveWidth(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    fontSize(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    inactiveBorderWidth(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        switch (value) {
            case 'auto':
                return '0px';
            default:
                return normalizeNumUnit(value);
        }
    },
    default(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return value;
    }
}

export function normalizeLegendName({
    serie,
    series,
    legend,
}: {
    legend: LegendComponentOption;
    serie: SeriesOption;
    series: SeriesOption[];
}): DataItem[] {
    const data = (serie?.data as any[]) ?? [];
    if (!data.length) return [];
    let legendData: DataItem[] = [];
    if (legend?.data?.length) {
        legendData = (legend.data.map((item) => {
            const name = typeof item === 'string' ? item : item.name;
            return typeof item === 'string' ? {
                name,
            } : {
                ...item,
            };
        }))
    }

    if (serie?.type === 'pie') {
        if (legendData.length) {
            const serieNames = data.reduce((pre, cur) => {
                pre[cur.name] = cur.name;
                return pre;
            }, {});
            return legendData.filter(item => !!serieNames[item.name!]);
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
            return legendData.filter(item => !!serieNames[item.name!]);
        }
        return series.map(item => {
            return {
                name: item.name?.toString(),
            }
        }).filter(Boolean);
    }

    return []
}