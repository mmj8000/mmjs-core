import { LegendComponentOption } from 'echarts';
export declare function getSelectStatus(legend: LegendComponentOption, name: string): boolean;
export declare function formatter(legend: LegendComponentOption, name: string): string;
export declare function getCustomLegendProperty(legend: LegendComponentOption): {
    [x: string]: import('./types').CssLegendPropValue;
};
export declare function getIconModified(icon?: string): any;
export declare function calculateViewBox(pathData?: string): string;
