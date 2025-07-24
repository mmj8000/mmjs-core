import { ShallowRef } from 'vue';
/**
 *
 * @param target
 * @param options
 * @example
 * const zoomContentRef = useTemplateRef<HTMLElement>('zoomContentRefName');
 * const { wheel } = useWheel(zoomContentRef);
 * @returns
 */
export declare function useWheel(target: ShallowRef<HTMLElement>, options?: {
    initialValue?: number;
    max?: number;
    min?: number;
    step?: number;
    callback?: (e: WheelEvent, v: number) => void;
}): {
    wheel: import('vue').Ref<number, number>;
    removeEvent: () => void;
};
