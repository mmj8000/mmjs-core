import CssomLegend from "./cssomLegend.vue";
export * from "./const";
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
const UseCssomLegend =  /* @__PURE__ */  CssomLegend;
export { UseCssomLegend as CssomLegend };
