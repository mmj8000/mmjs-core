import { type LegendComponentOption, type SeriesOption } from "echarts";
import { normalizeNumUnit } from "../../utils/format";
import { ecOrientValue } from "./help.const";
import type { CssLegendPropType, CssLegendPropValue, PieSeriesRecordDataType$1 } from "./types";


export const transformCss = {
    orient(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        switch (value) {
            case ecOrientValue.horizontal:
                if(record.width === 'auto') {
                    effectProp
                }
                return 'row';
            case ecOrientValue.vertical:
                return 'column';
            default:
                return value;
        }
    },
    align(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        switch (value) {
            case 'right':
                return 'row-reverse';
            default:
                return 'row';
        }
    },
    itemWidth(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    itemHeight(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    itemGap(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    padding(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    selectorButtonGap(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    selectorItemGap(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    borderRadius(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    borderWidth(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    inactiveWidth(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    fontSize(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return normalizeNumUnit(value);
    },
    default(value: CssLegendPropValue, record: LegendComponentOption, effectProp: CssLegendPropType) {
        return value;
    }
}

export function normalizeLegendName(
    serie: SeriesOption,
    record: PieSeriesRecordDataType$1
) {
    switch (serie.type) {
        case "pie":
            return record.name;
    }

    return record;
}