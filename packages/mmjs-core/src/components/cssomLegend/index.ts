import CssomLegend from "./cssomLegend.vue";
export * from "./const";
export type CssomLegendInstanceType = InstanceType<typeof CssomLegend>;

/**
 * @example
   <template>
     <!-- 注意这里我用relative 定位 -->
     <div class="chart_wrap relative">
        <div class="chart" ref="chartDomKey"></div>
        <!-- 可以使用provide cssomLegendInjectKey 或者 props 传递给CssomLegend -->
        <CssomLegend :ec-instance="chartInstance" :transfrom-fn="transformFn" />
    </div>
   </template>
    <script lang="ts" setup>
        // 这里可以转换你要的 css var properties
        function transformFn(val, options) {
          return val;
        }
    </script>
 */
const UseCssomLegend =  /* @__PURE__ */  CssomLegend;
export { UseCssomLegend as CssomLegend };
