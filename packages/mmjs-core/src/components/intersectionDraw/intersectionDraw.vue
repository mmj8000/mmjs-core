<template>
  <div class="intersection_draw" ref="intersectionRef">
    <slot name="temp" v-if="!targetIsVisible">
      <div class="intersection_draw__loading_content">
        <div class="intersection_draw__inner_skeleton">
          <div class="intersection_draw__skeleton_item" v-for="(_, key) in skeletonRows" :key></div>
        </div>
      </div>
    </slot>
    <slot v-else></slot>
  </div>
</template>
<script lang="ts" setup>
import { useIntersectionObserver, type UseIntersectionObserverOptions } from '@vueuse/core';
import { ref, shallowRef, watch } from 'vue';
import { requestAnimationFrame } from 'raf-polyfill-es';
const {
  timeoutTime = 100,
  noSupportTime = 500,
  once = true,
  skeletonRows = 10,
  useIntersectionObserverOptions
} = defineProps<{
  timeoutTime?: number;
  once?: boolean;
  skeletonRows?: number;
  noSupportTime?: number;
  useIntersectionObserverOptions?: UseIntersectionObserverOptions;
}>();
const $emits = defineEmits<{
  (name: 'show'): void;
  (name: 'hide'): void;
}>();
const targetIsVisible = ref(false);
const intersectionRef = shallowRef();
const { isSupported, stop, resume, pause } = useIntersectionObserver(
  intersectionRef,
  ([entry]) => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        targetIsVisible.value = entry?.isIntersecting || false;
      }, timeoutTime);
    });
    if (entry?.isIntersecting) {
      $emits('show');
      once && stop();
    } else {
      $emits('hide');
    }
  },
  useIntersectionObserverOptions
);
watch(
  isSupported,
  (val) => {
    if (val === false) {
      setTimeout(() => {
        targetIsVisible.value = true;
      }, noSupportTime);
    }
  },
  {
    immediate: true
  }
);
defineExpose({
  isSupported,
  pause,
  stop,
  resume
});
</script>

<style lang="less" scoped>
.intersection_draw {
  width: 100%;
  margin: 20px 0;
  text-align: center;

  @keyframes opacity-keyframe {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }

  &__inner_skeleton {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px;
    background-color: #fff;
    border-radius: 10px;
  }
  &__skeleton_item {
    background: #f0f2f5;
    width: 100%;
    border-radius: 4px;
    height: 16px;
    animation: opacity-keyframe linear 1s infinite;
  }
}
</style>
