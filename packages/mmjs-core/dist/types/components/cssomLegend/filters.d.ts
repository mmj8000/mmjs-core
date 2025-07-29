import { LegendComponentOption, SeriesOption } from 'echarts';
import { CustomDataItem, FilterTemplate } from './types';
export declare const transformCss: FilterTemplate;
export declare const transformTextStyle: FilterTemplate;
export declare function normalizeLegendName({ legendIndex, series, legend, }: {
    legend: LegendComponentOption;
    legendIndex: number;
    series: SeriesOption[];
}): CustomDataItem[];
