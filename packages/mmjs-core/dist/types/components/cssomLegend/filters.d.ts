import { SeriesOption } from 'echarts';
import { CssLegendPropType, CssLegendPropValue, PieSeriesRecordDataType$1 } from './types';
export declare const transformCss: {
    orient(value: CssLegendPropValue, effectProp: CssLegendPropType): CssLegendPropValue;
    itemWidth(value: CssLegendPropValue, effectProp: CssLegendPropType): string;
    itemHeight(value: CssLegendPropValue, effectProp: CssLegendPropType): string;
    itemGap(value: CssLegendPropValue, effectProp: CssLegendPropType): string;
    default(value: CssLegendPropValue, effectProp: CssLegendPropType): CssLegendPropValue;
};
export declare function normalizeLegendName(serie: SeriesOption, record: PieSeriesRecordDataType$1): string | PieSeriesRecordDataType$1;
