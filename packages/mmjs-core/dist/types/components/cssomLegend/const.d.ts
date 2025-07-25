import { ComputedRef, InjectionKey } from 'vue';
import { ECharts } from 'echarts';
export declare const cssomLegendInjectKey: InjectionKey<ComputedRef<{
    ec: ECharts;
}> | undefined>;
