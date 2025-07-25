<template>
  <div class="cssom_legend">
    <div class="cssom_legend__wrapper">
      <div
        class="cssom_legend__legend"
        v-for="(legend, key) in renderLegends"
        :class="[`cssom_legend--box-${key}`]"
        :style="getCustomLegendProperty(legend)"
        :key
      >
        <div class="cssom_legend__legend_item">{{ key }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  inject,
  onScopeDispose,
  shallowRef,
  watchPostEffect,
  ref,
  computed,
} from "vue";
import { cssomLegendInjectKey } from "./const";
import { type ECharts, type EChartsCoreOption } from "echarts";
import { getCustomLegendProperty } from "./methods";

const ecInjectInstance = inject(cssomLegendInjectKey, void 0);
const { ecInstance, eventName = "rendered" } = defineProps<{
  ecInstance?: ECharts;
  eventName?: "rendered" | "finished";
}>();

const proxyEcInstance = shallowRef();
const renderOption = ref<EChartsCoreOption>();

const renderLegends = computed(() => renderOption.value?.legend ?? []);
function renderedHandler(this: echarts.ECharts) {
  renderOption.value = this.getOption();
}

function onEcEvents() {
  proxyEcInstance.value?.on(eventName, renderedHandler);
}

function offEc() {
  proxyEcInstance.value?.off(eventName, renderedHandler);
}

watchPostEffect(() => {
  proxyEcInstance.value = ecInstance ?? ecInjectInstance?.value?.ec;
  offEc();
  onEcEvents();
});

onScopeDispose(() => {
  offEc();
});
</script>
<style lang="less" scoped>
.cssom_legend {
  position: absolute;
  inset: 0;
  transform: translate(0, 110%);
  pointer-events: none;
  border: 1px dashed #ccc;

  &__legend {
    position: absolute;
    top: var(--top);
    right: var(--right);
    bottom: var(--bottom);
    left: var(--left);
    transform: var(--css-translate);
    width: var(--width, 100%);
    text-align: center;
  }

  &__legend_item {
    pointer-events: auto;
  }

  &__wrapper {
    position: relative;
    inset: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
