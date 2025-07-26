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
        <div
          class="cssom_legend__legend_item"
          v-for="(name, index) in getLegendNames(key)"
          :key="index"
        >
          <div class="cssom_legend__rect"></div>
          <div class="cssom_legend__text">
            {{ name }}
          </div>
        </div>
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
import { EChartsOption, SeriesOption, type ECharts } from "echarts";
import { getCustomLegendProperty } from "./methods";
import { normalizeLegendName } from "./filters";

const ecInjectInstance = inject(cssomLegendInjectKey, void 0);
const { ecInstance, eventName = "finished" } = defineProps<{
  ecInstance?: ECharts;
  eventName?: "rendered" | "finished";
}>();

const proxyEcInstance = shallowRef<ECharts>();
const renderOption = ref<EChartsOption>();

function getLegendNames(index: number) {
  const series = (renderOption.value?.series as SeriesOption[]) ?? [];
  const serie = series.at(index) ?? series.at(0);
  if (!serie) return [];
  const data = (serie?.data as any[]) ?? [];
  return data.map((item) => normalizeLegendName(serie, item));
}

const renderLegends = computed(() => renderOption.value?.legend ?? []);
function renderedHandler(this: echarts.ECharts) {
  renderOption.value = this.getOption() as EChartsOption;
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
    transform: var(--custom-translate);
    width: var(--width, auto);
    display: flex;
    gap: var(--itemGap);
    flex-direction: var(--orient, row);
    z-index: var(--z);
    padding: var(--padding);
    flex-wrap: wrap;
    box-sizing: border-box;
  }

  &__rect {
    background: red;
    width: var(--itemWidth);
    height: var(--itemHeight);
    box-sizing: border-box;
    border-color: var(--itemStyle-borderColor);
    border-width: var(--itemStyle-borderWidth);
    border-style: solid;
  }

  &__text {
    color: var(--textStyle-color);
    white-space: nowrap;
    font-size: var(--textStyle-fontSize, 12px);
  }

  &__legend_item {
    pointer-events: auto;
    display: inline-flex;
    width: fit-content;
    flex-direction: var(--align, row);
    align-items: var(--itemAlign, center);
    gap: var(--itemGap);
  }

  &__wrapper {
    position: relative;
    inset: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
