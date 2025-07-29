import { LegendComponentOption, SeriesOption } from "echarts";

export interface PieSeriesRecordDataType$1 {
  value: number;
  name: string;
}
interface ShadowOptionMixin {
  shadowBlur?: number;
  shadowColor?: string;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
}
export type ZRLineType = "solid" | "dotted" | "dashed" | number | number[];
export type ZRFontStyle = "normal" | "italic" | "oblique";
export type ZRFontWeight = "normal" | "bold" | "bolder" | "lighter" | number;
export type RendererType = "canvas" | "svg";
export type LayoutOrient = "vertical" | "horizontal";
export type HorizontalAlign = "left" | "center" | "right";
export type VerticalAlign = "top" | "middle" | "bottom";
export type ImageLike = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
export interface TextCommonOption extends ShadowOptionMixin {
  color?: string;
  fontStyle?: ZRFontStyle;
  fontWeight?: ZRFontWeight;
  fontFamily?: string;
  fontSize?: number | string;
  align?: HorizontalAlign;
  verticalAlign?: VerticalAlign;
  baseline?: VerticalAlign;
  opacity?: number;
  lineHeight?: number;
  backgroundColor?:
    | string
    | {
        image: ImageLike | string;
      };
  borderColor?: string;
  borderWidth?: number;
  borderType?: ZRLineType;
  borderDashOffset?: number;
  borderRadius?: number | number[];
  padding?: number | number[];
  width?: number | string;
  height?: number;
  textBorderColor?: string;
  textBorderWidth?: number;
  textBorderType?: ZRLineType;
  textBorderDashOffset?: number;
  textShadowBlur?: number;
  textShadowColor?: string;
  textShadowOffsetX?: number;
  textShadowOffsetY?: number;
  tag?: string;
}
export type TextCommonOptionKey = keyof TextCommonOption | string;
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
  inactiveBorderWidth?: number | "auto";
  /**
   * Legend label formatter
   */
  formatter?: string | ((name: string) => string);
  symbolRotate?: number | "inherit";
}

export interface DataItem extends LegendStyleOption {
  name?: string;
  icon?: string;
  textStyle?: LegendComponentOption["textStyle"];
  tooltip?: unknown;
}
type DecalDashArrayX = number | (number | number[])[];
type DecalDashArrayY = number | number[];
interface DecalObject {
  symbol?: string | string[];
  symbolSize?: number;
  symbolKeepAspect?: boolean;
  color?: string;
  backgroundColor?: string;
  dashArrayX?: DecalDashArrayX;
  dashArrayY?: DecalDashArrayY;
  rotation?: number;
  maxTileWidth?: number;
  maxTileHeight?: number;
}
interface BorderOptionMixin {
  borderColor?: string;
  borderWidth?: number;
  borderType?: ZRLineType;
  borderCap?: CanvasLineCap;
  borderJoin?: CanvasLineJoin;
  borderDashOffset?: number;
  borderMiterLimit?: number;
}
export interface ItemStyleOption {
  color?: string;
  opacity?: number;
  borderRadius?: (number | string)[] | number | string;
}
export interface CustomDataItem extends DataItem {
  name?: string;
  value?: number;
  serie?: (SeriesOption & { itemStyle?: ItemStyleOption }) | undefined;
}

export type FilterTemplateFnParameters = {
  value: CssLegendPropValue | any[];
  record: LegendComponentOption;
  effectProp: CssLegendPropType;
  key: string;
  parentKey: string;
};

export type FilterTemplateFn = (
  options: FilterTemplateFnParameters
) => CssLegendPropValue;

export type FilterTemplate = {
  [key: string]: FilterTemplateFn;
} & { default: FilterTemplateFn };

export type TransfromState = {
  transform(
    value: CssLegendPropValue,
    options: FilterTemplateFnParameters
  ): CssLegendPropValue;
};
