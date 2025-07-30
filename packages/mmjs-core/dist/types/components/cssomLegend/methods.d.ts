import { LegendComponentOption } from 'echarts';
import { CustomDataItem, FilterTemplate } from './types';
export declare function getSelectStatus(legend: LegendComponentOption, name: string): boolean;
export declare function formatter(legend: LegendComponentOption, name: string): string;
export declare function useRichStyleProperties(legend: LegendComponentOption): {};
export declare function getCustomLegendProperty(legend: LegendComponentOption): {
    [x: string]: import('./types').CssLegendPropValue;
};
export declare function forPropertsEffect(data: object, propertys: Record<string, string | number>, parentKey: string, filterTemplate: FilterTemplate): void;
export declare function getIconModified(icon: string | undefined, record: CustomDataItem): string[];
