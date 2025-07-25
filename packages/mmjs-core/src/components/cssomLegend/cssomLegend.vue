<template>
  <div class="cssom_legend"></div>
</template>

<script lang="ts" setup>
import { inject, onScopeDispose, shallowRef, watchPostEffect } from "vue";
import { cssomLegendInjectKey } from "./const";
import { type ECharts } from "echarts";

const ecInjectInstance = inject(cssomLegendInjectKey, void 0);
const { ecInstance } = defineProps<{
  ecInstance?: ECharts;
}>();

const proxyEcInstance = shallowRef();
function renderedHandler(this: echarts.ECharts) {
  console.log(this.getOption());
}

function onEcRendered() {
  proxyEcInstance.value?.on("finished", renderedHandler);
}

function offEc() {
  proxyEcInstance.value?.off("finished", renderedHandler);
}

watchPostEffect(() => {
  proxyEcInstance.value = ecInstance ?? ecInjectInstance?.value?.ec;
  offEc();
  onEcRendered();
});

onScopeDispose(() => {
  offEc();
});
</script>
