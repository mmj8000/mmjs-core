<template>
  <div class="chart_wrap">
    <div class="chart" ref="chartDomKey"></div>
    <CssomLegend />
  </div>
  <button @click="setOption">变化</button>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { computed, onMounted, provide, shallowRef, useTemplateRef } from "vue";
import {
  CssomLegend,
  cssomLegendInjectKey,
} from "../../../packages/mmjs-core/src/components/cssomLegend";
import { option } from "./const";

const chartDom = useTemplateRef("chartDomKey");
const chartInstance = shallowRef();
provide(
  cssomLegendInjectKey,
  computed(() => {
    return {
      ec: chartInstance.value,
    };
  })
);

onMounted(() => {
  chartInstance.value = echarts.init(chartDom.value);
  chartInstance.value.setOption(option);
});
function setOption() {
  chartInstance.value.setOption({
    series: [
      {
        data: [
          {
            value: Math.random() * 1048,
            name: `2 ${(Math.random() * 100).toFixed(2)}Engine`,
          },
          { value: Math.random() * 7352, name: "4" },
          { value: Math.random() * 5804, name: "3" },
          { value: Math.random() * 4844, name: "Union Ads" },
          { value: Math.random() * 4844, name: "Union Ads2" },
        ],
      },
    ],
  });
}
</script>
<style lang="less" scoped>
.chart_wrap {
  width: 50vw;
  height: 30vw;
  border: 1px dashed #ccc;
  position: relative;
  
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
