import { LegendComponentOption } from 'echarts';
export interface PieSeriesRecordDataType$1 {
    value: number;
    name: string;
}
export type CssLegendPropValue = string | number;
export type CssLegendPropType = Record<string, CssLegendPropValue>;
interface LegendStyleOption {
    /**
     * Icon of the legend items.
     * @default 'roundRect'
     */
    icon?: string;
    /**
     * Color when legend item is not selected
     */
    inactiveColor?: string;
    /**
     * Border color when legend item is not selected
     */
    inactiveBorderColor?: string;
    /**
     * Border color when legend item is not selected
     */
    inactiveBorderWidth?: number | 'auto';
    /**
     * Legend label formatter
     */
    formatter?: string | ((name: string) => string);
    symbolRotate?: number | 'inherit';
}
export interface DataItem extends LegendStyleOption {
    name?: string;
    icon?: string;
    textStyle?: LegendComponentOption['textStyle'];
    tooltip?: unknown;
}
export {};
