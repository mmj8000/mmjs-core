import type { ECharts } from "echarts";
import { type ShallowRef } from "vue";

export function useLegendAction(ec: ShallowRef<ECharts | undefined>) {
    function legendToggleSelect(name: string) {
        ec.value?.dispatchAction({
            type: "legendToggleSelect",
            // 图例名称
            name,
        });
    }

    function highlight(name: string) {
        // 如果要高亮系列：
        ec.value?.dispatchAction({
            type: 'highlight',
            // 图例名称
            name,
        });
    }
    function downplay(name: string) {
        // 如果要取消高亮系列：
        ec.value?.dispatchAction({
            type: 'downplay',
            // 图例名称
            name,
        });
    }

    return {
        legendToggleSelect,
        highlight,
        downplay,
    }
}