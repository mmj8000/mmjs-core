import { UseIntersectionObserverOptions } from '@vueuse/core';
type __VLS_Props = {
    timeoutTime?: number;
    once?: boolean;
    skeletonRows?: number;
    noSupportTime?: number;
    useIntersectionObserverOptions?: UseIntersectionObserverOptions;
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        temp?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {
        intersectionRef: HTMLDivElement;
    };
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_Props, {
    isSupported: import('vue').ComputedRef<boolean>;
    pause: import('@vueuse/core').Fn;
    stop: () => void;
    resume: import('@vueuse/core').Fn;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    show: () => any;
    hide: () => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onShow?: (() => any) | undefined;
    onHide?: (() => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    intersectionRef: HTMLDivElement;
}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
