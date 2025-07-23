export interface AsyncIntervalFnOptions {
    immediate?: boolean;
}
/**
 *
 * @param fn
 * @param timeoutTime
 * @param optins
 * @example
 * useAsyncIntervalFn(() => fetch(''), 1000 * 10);
 * @returns
 */
export declare function useAsyncIntervalFn(fn: () => Promise<any>, timeoutTime: number, optins?: AsyncIntervalFnOptions): {
    pause: () => void;
    resume: () => void;
};
