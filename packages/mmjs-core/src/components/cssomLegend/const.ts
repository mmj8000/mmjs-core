import { ComputedRef, InjectionKey } from "vue";
import type { ECharts } from "echarts";

export const ecInjectName: InjectionKey<ComputedRef<ECharts> | undefined> =
  Symbol("ecInjectName");
