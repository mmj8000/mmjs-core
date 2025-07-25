import { ComputedRef, InjectionKey } from "vue";
import type { ECharts } from "echarts";

export const cssomLegendInjectKey: InjectionKey<
  | ComputedRef<{
      ec: ECharts;
    }>
  | undefined
> = Symbol("cssomLegendInjectKey");
