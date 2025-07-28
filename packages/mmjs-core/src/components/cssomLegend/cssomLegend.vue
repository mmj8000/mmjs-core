<template>
  <div class="cssom_legend">
    <div class="cssom_legend__wrapper">
      <div
        class="cssom_legend__legend"
        v-for="(legend, key) in renderLegends"
        :class="[
          `cssom_legend--box-${key}`,
          `cssom_legend__legend--${legend.type ?? 'plain'}`,
        ]"
        :style="getCustomLegendProperty(legend)"
        :key
      >
        <div
          class="cssom_legend__legend__wrap"
          :class="[`cssom_legend__legend__wrap--${legend.type ?? 'plain'}`]"
        >
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
            @click.stop="legendClick(record.name!)"
            @mouseenter.stop="legendMouseEnter(record.name!)"
            @mouseleave.stop="legendMouseLeave(record.name!)"
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
              :class="[...getIconModified(record.icon ?? legend.icon, record)]"
            ></div>
            <div
              class="cssom_legend__text"
              v-html=" formatter(legend, record.name!)"
            ></div>
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
  ref,
  computed,
  watchEffect,
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
import { throttle } from "mmjs-share";

const ecInjectInstance = inject(cssomLegendInjectKey, void 0);
const {
  ecInstance,
  eventName = "rendered",
  throttleTime = 500,
  disabled = false,
} = defineProps<{
  ecInstance?: ECharts;
  eventName?: "rendered" | "finished";
  throttleTime?: number;
  disabled?: boolean;
}>();

const proxyEcInstance = shallowRef<ECharts>();
const renderOption = ref<EChartsOption>();
const $emits = defineEmits<{
  (name: "legendToggleSelect", v: string): void;
  (name: "highlight", v: string): void;
  (name: "downplay", v: string): void;
}>();

const { legendToggleSelect, highlight, downplay } =
  useLegendAction(proxyEcInstance);

function legendClick(name: string) {
  !disabled && legendToggleSelect(name);
  $emits("legendToggleSelect", name);
}
function legendMouseEnter(name: string) {
  !disabled && highlight(name);
  $emits("highlight", name);
}
function legendMouseLeave(name: string) {
  !disabled && downplay(name);
  $emits("downplay", name);
}
function getLegendNames(legend: LegendComponentOption, legendIndex: number) {
  const series = (renderOption.value?.series as SeriesOption[]) ?? [];
  return normalizeLegendName({
    legend,
    series,
    legendIndex,
  });
}

const renderLegends = computed(
  () => (renderOption.value?.legend ?? []) as LegendComponentOption[]
);
const colors = computed(() => renderOption.value?.color ?? []);
const renderedHandler = throttle(function (this: echarts.ECharts) {
  renderOption.value = this.getOption() as EChartsOption;
}, throttleTime);

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

watchEffect(() => {
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
  pointer-events: none;

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
    display: flex;
    justify-content: var(--custom-root-justify);
    box-sizing: border-box;
    background-color: var(--backgroundColor);

    &--scroll {
      max-width: calc(calc(100% - var(--left, 0px)) - var(--padding, 0));
      overflow: auto;
      pointer-events: auto;

      /* 设置滚动条宽度 */
      &::-webkit-scrollbar {
        width: 2px;
        height: 2px;
      }
      // 必须添加这两个部分
      &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 8px;
      }
    }
  }

  &__legend__wrap {
    width: 100%;
    height: 100%;
    display: inline-flex;
    flex-direction: var(--orient, row);
    flex-wrap: wrap;
    gap: var(--itemGap);

    &--scroll {
      flex-wrap: nowrap;
    }
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
      &--line {
        height: 1.5px;
        position: relative;
        &.legend-symbol {
          &--emptyCircle {
            &::before {
              content: "";
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              width: calc(
                var(--itemHeight, 25px) - var(--itemStyle-borderWidth, 1px)
              );
              height: calc(
                var(--itemHeight, 25px) - var(--itemStyle-borderWidth, 1px)
              );
              border-radius: 50%;
              background: #fff;
              border: var(--itemStyle-borderWidth, 1px) solid var(--item-color);
              box-sizing: border-box;
            }
          }
          &--circle {
            &::before {
              content: "";
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              width: calc(
                var(--itemHeight, 25px) - var(--itemStyle-borderWidth, 1px)
              );
              height: calc(
                var(--itemHeight, 25px) - var(--itemStyle-borderWidth, 1px)
              );
              border-radius: 50%;
              background: var(--item-color);
              border: var(--itemStyle-borderWidth, 1px) solid var(--item-color);
              box-sizing: border-box;
            }
          }
          &--line {
            &::before {
              display: none;
            }
          }
        }
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
    width: var(--textStyle-width, auto);
    height: var(--textStyle-height, auto);
    line-height: var(--textStyle-lineHeight, auto);
    :deep(.cssom_legend-rich) {
      display: inline-block;
      color: var(--rich-textStyle-color);
      font-size: var(--rich-textStyle-fontSize, inherit);
      width: var(--rich-textStyle-width, auto);
      height: var(--rich-textStyle-height, auto);
      line-height: var(--rich-textStyle-lineHeight, auto);
      padding: var(--rich-textStyle-padding);
    }
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
        &.legend-symbol {
          &--circle {
            &::before {
              border-color: var(--inactiveColor);
              background: var(--inactiveColor);
            }
          }
          &--emptyCircle {
            &::before {
              border-color: var(--inactiveColor);
            }
          }
        }
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
