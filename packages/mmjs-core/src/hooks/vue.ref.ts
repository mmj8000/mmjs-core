import { Ref, ref, shallowRef, UnwrapRef } from "vue";
import { requestAnimationFrame } from "raf-polyfill-es";

/**
 *
 * @param comp
 * @example
 * Vue Script
 * const def = useDef(3);
 * const compInstance = useVShallowRef(CompA);
 * @returns
 */
export function useVShallowRef<C extends abstract new (...args: any) => any>(
  comp: C
) {
  return shallowRef<InstanceType<typeof comp>>();
}

/**
 * @param frameNum
 * @param delay
 * @example
 * Vue Template
 * const def = useDef(3);
 * <template v-if="def(1)"></template>
 * <template v-if="def(2)"></template>
 * <template v-if="def(3)"></template>
 * @returns
 */
export function useDef(
  frameNum: number,
  delay = (frame: number) => frame * 500
) {
  const currentFrameRate = ref(0);
  const isDone = ref(false);

  function nextFrame() {
    requestAnimationFrame(() => {
      currentFrameRate.value += 1;
      if (currentFrameRate.value < frameNum) {
        isDone.value = false;
        setTimeout(nextFrame, delay(frameNum));
      } else {
        isDone.value = true;
      }
    });
  }
  nextFrame();
  return function (frame: number) {
    if (isDone.value) return true;
    return currentFrameRate.value >= frame;
  };
}

/**
 * 
 * @param initValue 
 * @example
 * const { state: querys, resetState } = useRestRef({
        date: [],
        name: '',
        index: null
    });
 */
export function useRestRef<T extends any>(
  initValue: T
): {
  state: Ref<T>;
  resetState: Function;
};
export function useRestRef(initValue) {
  const _initValue = useRestRef._clone(initValue);
  const state = ref(initValue);
  function resetState() {
    state.value = useRestRef._clone(_initValue);
  }
  return {
    state,
    resetState,
  };
}
useRestRef._clone = function <T extends any>(val: T) {
  return window && "structuredClone" in window
    ? structuredClone<T>(val)
    : (JSON.parse(JSON.stringify(val)) as T);
};
