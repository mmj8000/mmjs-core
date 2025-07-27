import { ECharts } from 'echarts';
import { ShallowRef } from 'vue';
export declare function useLegendAction(ec: ShallowRef<ECharts | undefined>): {
    legendToggleSelect: (name: string) => void;
    highlight: (name: string) => void;
    downplay: (name: string) => void;
};
