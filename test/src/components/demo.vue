<template>
  <div class="chart_wrap relative">
    <div class="chart" ref="chartDomKey"></div>
    <CssomLegend />
  </div>
  <button @click="setOption">变化</button>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import {
  computed,
  onMounted,
  onScopeDispose,
  provide,
  shallowRef,
  useTemplateRef,
} from "vue";
import {
  CssomLegend,
  cssomLegendInjectKey,
} from "mmjs-core/components/cssomLegend";

const { option = {} } = defineProps<{
  option: echarts.EChartsOption;
}>();
const chartDom = useTemplateRef("chartDomKey");
const chartInstance = shallowRef<echarts.ECharts>();
  provide(
    cssomLegendInjectKey,
    computed(() => {
      return {
        ec: chartInstance.value!,
      };
    })
  );

function resize() {
  chartInstance.value?.resize();
}

onMounted(() => {
  chartInstance.value = echarts.init(chartDom.value);
  chartInstance.value.setOption(option);
  addEventListener("resize", resize);
  onScopeDispose(() => {
    removeEventListener("resize", resize);
  });
});
function setOption() {
  chartInstance.value!.setOption({
    series: [
      {
        data: [
          {
            value: Math.random() * 1048,
            name: `2 ${(Math.random() * 100).toFixed(2)}你好`,
          },
          { value: Math.random() * 7352, name: "你好" },
          { value: Math.random() * 5804, name: "你好0" },
          { value: Math.random() * 4844, name: "你好1" },
          { value: Math.random() * 4844, name: "你好2" },
        ],
      },
    ],
  });
}
</script>
<style lang="less" scoped>
.chart_wrap {
  width: 40vw;
  height: 20vw;
  border: 1px dashed #ccc;
  position: relative;

  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
