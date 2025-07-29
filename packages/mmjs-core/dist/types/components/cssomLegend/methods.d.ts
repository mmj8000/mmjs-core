import { LegendComponentOption } from 'echarts';
import { CustomDataItem } from './types';
export declare function getSelectStatus(legend: LegendComponentOption, name: string): boolean;
export declare function formatter(legend: LegendComponentOption, name: string): string;
export declare function useRichStyleProperties(legend: LegendComponentOption): {};
export declare function getCustomLegendProperty(legend: LegendComponentOption): {
    [x: string]: import('./types').CssLegendPropValue;
};
export declare function getIconModified(icon: string | undefined, record: CustomDataItem): string[];
