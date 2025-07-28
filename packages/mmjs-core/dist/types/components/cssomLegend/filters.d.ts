import { LegendComponentOption, SeriesOption } from 'echarts';
import { CssLegendPropType, CssLegendPropValue, CustomDataItem, TextCommonOptionKey } from './types';
export declare const transformCss: {
    [key: string]: (value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) => CssLegendPropValue;
};
type TextTransformStyleFn = <T extends {
    value: CssLegendPropValue;
}>(opts: T) => T["value"];
export declare const transformTextStyle: {
    [key in TextCommonOptionKey]: TextTransformStyleFn;
} & {
    default: TextTransformStyleFn;
};
export declare function normalizeLegendName({ legendIndex, series, legend, }: {
    legend: LegendComponentOption;
    legendIndex: number;
    series: SeriesOption[];
}): CustomDataItem[];
export {};
