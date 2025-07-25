<template>
  <div class="chart" ref="chartDomKey"></div>
  <CssomLegend />
  <button @click="setOption">变化</button>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { computed, onMounted, provide, shallowRef, useTemplateRef } from "vue";
import {
  CssomLegend,
  cssomLegendInjectKey,
} from "mmjs-core/components/cssomLegend";
const chartDom = useTemplateRef("chartDomKey");

const option = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
    },
  ],
};

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
          { value: 1048, name: "2 Engine" },
          { value: 7352, name: "4" },
          { value: 5804, name: "3" },
          { value: 4844, name: "Union Ads" },
        ],
      },
    ],
  });
}
</script>
<style lang="less" scoped>
.chart {
  width: 40vw;
  height: 20vw;
  border: 1px dashed #ccc;
}
</style>
