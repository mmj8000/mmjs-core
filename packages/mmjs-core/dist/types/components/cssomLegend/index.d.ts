import { default as CssomLegend } from './cssomLegend';
export * from './const';
export type CssomLegendInstanceType = InstanceType<typeof CssomLegend>;
/**
 * @example
 <template>
  <!-- // 注意这里我用relative 定位 -->
  <div class="chart_wrap relative">
     <div class="chart" ref="chartDomKey"></div>
     <CssomLegend />
 </div>
</template>
 <script lang="ts" setup>
 import {
  CssomLegend,
  cssomLegendInjectKey,
} from "mmjs-core/components/cssomLegend";
 import { provide } from 'vue';
     // 使用provide 或者 props 传递给CssomLegend
     provide(
         cssomLegendInjectKey,
         computed(() => {
             return {
                 ec: chartInstance.value!,
             };
         })
     );
 </script>
 */
declare const UseCssomLegend: import('vue').DefineComponent<{
    ecInstance?: import('echarts').ECharts;
    eventName?: "rendered" | "finished";
    throttleTime?: number;
    disabled?: boolean;
    enchanceCenter?: boolean;
    transfromFn?: import('./types').TransfromState["transform"];
}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    legendToggleSelect: (v: string) => any;
    highlight: (v: string) => any;
    downplay: (v: string) => any;
}, string, import('vue').PublicProps, Readonly<{
    ecInstance?: import('echarts').ECharts;
    eventName?: "rendered" | "finished";
    throttleTime?: number;
    disabled?: boolean;
    enchanceCenter?: boolean;
    transfromFn?: import('./types').TransfromState["transform"];
}> & Readonly<{
    onLegendToggleSelect?: ((v: string) => any) | undefined;
    onHighlight?: ((v: string) => any) | undefined;
    onDownplay?: ((v: string) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    cssomLegendRefKey: HTMLDivElement[];
    cssomLegendWrapRefKey: HTMLDivElement;
}, HTMLDivElement>;
export { UseCssomLegend as CssomLegend };
