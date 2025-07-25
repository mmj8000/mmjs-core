import { ComputedRef, InjectionKey } from 'vue';
import { ECharts } from 'echarts';
export declare const ecInjectName: InjectionKey<ComputedRef<ECharts> | undefined>;
