import { Ref } from 'vue';
/**
 *
 * @param comp
 * @example
 * Vue Script
 * const def = useDef(3);
 * const compInstance = useVShallowRef(CompA);
 * @returns
 */
export declare function useVShallowRef<C extends abstract new (...args: any) => any>(comp: C): import('vue').ShallowRef<InstanceType<C> | undefined, InstanceType<C> | undefined>;
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
export declare function useDef(frameNum: number, delay?: (frame: number) => number): (frame: number) => boolean;
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
export declare function useRestRef<T extends any>(initValue: T): {
    state: Ref<T>;
    resetState: Function;
};
export declare namespace useRestRef {
    var _clone: <T extends unknown>(val: T) => T;
}
