import { LegendComponentOption, SeriesOption } from 'echarts';
import { CssLegendPropType, CssLegendPropValue, DataItem } from './types';
export declare const transformCss: {
    orient(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType): CssLegendPropValue;
    align(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType): "row" | "row-reverse";
    left(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType): string;
    right(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType): string;
    height(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType): string;
    lineHeight(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType): string;
    itemWidth(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType): string;
    itemHeight(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType): string;
    itemGap(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType): string;
    padding(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType): string;
    selectorButtonGap(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType): string;
    selectorItemGap(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType): string;
    borderRadius(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType): string;
    borderWidth(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType): string;
    inactiveWidth(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType): string;
    fontSize(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType): string;
    inactiveBorderWidth(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType): string;
    default(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType): CssLegendPropValue;
};
export declare function normalizeLegendName({ serie, series, legend, }: {
    legend: LegendComponentOption;
    serie: SeriesOption;
    series: SeriesOption[];
}): DataItem[];
