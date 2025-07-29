<template>
  <button @click="test = !test">切换1</button>
  <Demo :option="pieChartOption" v-if="test" />
  <Demo :option="lineOption" />
  <Demo :option="barOption" />
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { pieOption, lineOption, barOption, echartsOptions } from "./const";
import { merge } from "lodash-es";
import Demo from "./demo.vue";
const test = ref(true);

const pieChartSerieData = computed(() => {
  return {
    已执行: 2450,
    未执行: 3230,
    延误: 21212,
    取消: 323,
  };
});
const pieChartOption = computed(() =>
  merge({},  echartsOptions, {
    color: ["#2E8100", "#909399", "#F19A05", "#EC0012"],
    legend: {
      formatter: function (name) {
        const value = pieChartSerieData.value[name] ?? 0;
        return `{value|${value}}\n{name|${name}}`;
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "50%"],
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
          { value: 1048, name: "已执行" },
          { value: 735, name: "未执行" },
          { value: 580, name: "延误" },
          { value: 484, name: "取消" },
        ],
      },
    ],
  })
);
</script>
<style lang="less" scoped></style>
