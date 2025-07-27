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
}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{
    ecInstance?: import('echarts').ECharts;
    eventName?: "rendered" | "finished";
}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export { UseCssomLegend as CssomLegend };
