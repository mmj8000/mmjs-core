import { LegendComponentOption } from 'echarts';
import { CustomDataItem } from './types';
export declare function getSelectStatus(legend: LegendComponentOption, name: string): boolean;
export declare function formatter(legend: LegendComponentOption, name: string): string;
export declare function useRichStyleProperties(legend: LegendComponentOption): {};
export declare function getCustomLegendProperty(legend: LegendComponentOption): {
    [x: string]: import('./types').CssLegendPropValue;
};
export declare function getIconModified(icon: string | undefined, record: CustomDataItem): string[];
export declare function calculateViewBox(pathData?: string): string;
/**
 *
 * @param str
 * @example
 * const parsed = parseRichFormatString("{name|Union Ads}\n{test|测试}");
 * @returns
 */
export declare function parseRichFormatString(str: string): {
    type: "text" | "rich";
    content: string;
    name?: string;
}[];
