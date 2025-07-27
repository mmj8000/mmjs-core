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
        <div class="cssom_legend__legend__wrap">
          <div
            class="cssom_legend__legend_item"
            v-for="(record, index) in getLegendNames(legend, key)"
            :key="index"
            :style="getItemStyleProperties(index, record)"
            :class="{
              'cssom_legend__legend_item--unselect': !getSelectStatus(
                legend,
                record.name!
              ),
            }"
            @click="legendToggleSelect(record.name!)"
            @mouseenter="highlight(record.name!)"
            @mouseleave="downplay(record.name!)"
          >
            <img
              v-if="(record.icon ?? legend.icon)?.startsWith('image://')"
              class="cssom_legend__image_icon"
              :class="{
              'cssom_legend__image_icon--unselect': !getSelectStatus(
                legend,
                record.name!
              ),
            }"
              :src="(record.icon ?? legend.icon)?.slice(8)"
              alt=""
            />
            <svg
              v-else-if="(record.icon ?? legend.icon)?.startsWith('path://')"
              class="cssom_legend__svg_icon"
              :class="{
              'cssom_legend__svg_icon--unselect': !getSelectStatus(
                legend,
                record.name!
              ),
              }"
              :viewBox="
                calculateViewBox((record.icon ?? legend.icon)?.slice(7))
              "
            >
              <path :d="(record.icon ?? legend.icon)?.slice(7)" />
            </svg>
            <div
              v-else
              class="cssom_legend__rect"
              :class="[
                `legend-icon--${getIconModified(record.icon ?? legend.icon)}`,
              ]"
            ></div>
            <div class="cssom_legend__text" :title="record.name">
              {{ formatter(legend, record.name!) }}
            </div>
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
import type {
  EChartsOption,
  LegendComponentOption,
  SeriesOption,
  ECharts,
} from "echarts";
import {
  getCustomLegendProperty,
  getSelectStatus,
  formatter,
  getIconModified,
  calculateViewBox,
} from "./methods";
import { normalizeLegendName } from "./filters";
import { useLegendAction } from "./legend-action";
import { DataItem } from "./types";

const ecInjectInstance = inject(cssomLegendInjectKey, void 0);
const { ecInstance, eventName = "rendered" } = defineProps<{
  ecInstance?: ECharts;
  eventName?: "rendered" | "finished";
}>();

const proxyEcInstance = shallowRef<ECharts>();
const renderOption = ref<EChartsOption>();
const { legendToggleSelect, highlight, downplay } =
  useLegendAction(proxyEcInstance);
function getLegendNames(legend: LegendComponentOption, index: number) {
  const series = (renderOption.value?.series as SeriesOption[]) ?? [];
  const serie = series.at(index) ?? series.at(0);
  if (!serie) return [];
  if (legend?.data?.length) {
    return normalizeLegendName({
      legend,
      serie,
      series,
    });
  }
  return normalizeLegendName({
    legend,
    serie,
    series,
  });
}

const renderLegends = computed(
  () => (renderOption.value?.legend ?? []) as LegendComponentOption[]
);
const colors = computed(() => renderOption.value?.color ?? []);
function renderedHandler(this: echarts.ECharts) {
  renderOption.value = this.getOption() as EChartsOption;
}

function getItemStyleProperties(index: number, dataItem: DataItem) {
  let color = colors.value[index];
  return {
    "--item-color": color,
    "--textStyle-color": dataItem?.textStyle?.color,
  };
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
  transform: translate(110%, 0%);
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
    height: var(--height, auto);
    z-index: var(--z);
    padding: var(--padding);
    display: inline-flex;
    justify-content: var(--custom-root-justify);
    box-sizing: border-box;
    background-color: var(--backgroundColor);
  }

  &__legend__wrap {
    width: fit-content;
    height: 100%;
    display: inline-flex;
    flex-direction: var(--orient, row);
    flex-wrap: wrap;
    gap: var(--itemGap);
  }

  &__image_icon {
    width: var(--itemWidth);
    height: var(--itemHeight);
    object-fit: contain;

    &--unselect {
      opacity: 0.5;
    }
  }
  &__svg_icon {
    width: var(--itemWidth);
    height: var(--itemHeight);
    object-fit: contain;
    path {
      stroke: var(--itemStyle-borderColor, #fff);
      fill: var(--itemStyle-borderColor, #fff);
      stroke-width: var(--itemStyle-borderWidth, 3px);
    }
    &--unselect {
      path {
        stroke: var(--inactiveBorderColor, #ccc);
        fill: var(--inactiveBorderColor, #ccc);
        stroke-width: 2px;
      }
    }
  }
  &__rect {
    background: var(--item-color);
    width: var(--itemWidth);
    height: var(--itemHeight);
    line-height: var(--itemHeight);
    box-sizing: border-box;

    &.legend-icon {
      &--none {
        display: none;
      }
      &--roundRect {
        border-color: var(--itemStyle-borderColor, #fff);
        border-width: var(--itemStyle-borderWidth, 1px);
        border-style: solid;
        border-radius: 4px;
      }
      &--rect {
        border-color: var(--itemStyle-borderColor, #fff);
        border-width: var(--itemStyle-borderWidth, 1px);
        border-style: solid;
        border-radius: 0px;
      }
      &--circle {
        border-radius: 50%;
        width: var(--itemHeight);
      }
    }
  }

  &__text {
    color: var(--textStyle-color);
    white-space: nowrap;
    font-size: var(--textStyle-fontSize, 12px);
    height: var(--textStyle-height, auto);
    line-height: var(--textStyle-lineHeight, auto);
  }

  &__legend_item {
    pointer-events: auto;
    display: inline-flex;
    width: fit-content;
    flex-direction: var(--align, row);
    align-items: var(--itemAlign, center);
    gap: var(--itemGap);

    &--unselect {
      .cssom_legend__rect {
        background: var(--inactiveBorderColor);
        border-width: var(--inactiveBorderWidth, 1px);
      }
      .cssom_legend__text {
        color: var(--inactiveColor);
      }
    }

    &:hover {
      cursor: pointer;
    }
  }

  &__wrapper {
    position: relative;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
