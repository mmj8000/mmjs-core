import { onMounted, onScopeDispose, ref, ShallowRef } from "vue";

/**
 * 
 * @param target 
 * @param options 
 * @example
 * const zoomContentRef = useTemplateRef<HTMLElement>('zoomContentRefName');
 * const { wheel } = useWheel(zoomContentRef);
 * @returns 
 */
export function useWheel(
    target: ShallowRef<HTMLElement>,
    options?: {
        initialValue?: number;
        max?: number;
        min?: number;
        step?: number;
        callback?: (e: WheelEvent, v: number) => void;
    }
) {
    const { initialValue = 1, max = 4, min = 0.5, step = 0.1, callback } = options ?? {};
    const wheel = ref(initialValue);
    function wheelHandler(e: WheelEvent) {
        if (e.deltaY > 0) {
            wheel.value -= step;
        } else {
            wheel.value += step;
        }
        wheel.value = Math.min(Math.max(wheel.value, min), max);
        callback?.(e, wheel.value);
    }
    onMounted(() => {
        target.value.addEventListener('wheel', wheelHandler, {
            passive: false
        });
    });

    function removeEvent() {
        target.value.removeEventListener('wheel', wheelHandler);
    }

    onScopeDispose(() => {
        removeEvent();
    });

    return {
        wheel,
        removeEvent
    };
}
