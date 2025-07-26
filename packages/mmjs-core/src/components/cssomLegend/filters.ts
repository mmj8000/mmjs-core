import { normalizeNumUnit } from "../../utils/format";
import { ecOrientValue } from "./help.const";
import type { CssLegendPropType, CssLegendPropValue } from "./types";


export const transformCss = {
    orient(value: CssLegendPropValue, effectProp: CssLegendPropType) {
        switch (value) {
            case ecOrientValue.horizontal:
                return 'row';
                break;
            case ecOrientValue.vertical:
                return 'column';
                break;
            default:
                return value;
                break;
        }
    },
    itemWidth(value: CssLegendPropValue, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    itemHeight(value: CssLegendPropValue, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    itemGap(value: CssLegendPropValue, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    default(value: CssLegendPropValue, effectProp: CssLegendPropType) {
        return value;
    }
}