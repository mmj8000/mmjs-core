
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
export function useAsyncIntervalFn(
    fn: () => Promise<any>,
    timeoutTime: number,
    optins?: AsyncIntervalFnOptions) {
    let timeouter: NodeJS.Timeout | undefined;
    const {
        immediate = true,
    } = optins ?? {};
    let fnProxy: ((() => Promise<any>) | null) = fn;

    function pause() {
        fnProxy = null
        if (timeouter) {
            clearTimeout(timeouter);
            timeouter = void 0;
        }
    }
    function resume() {
        fnProxy = fn;
        intervalFn();
    }

    function intervalFn() {
        timeouter = setTimeout(() => {
            fnProxy?.()?.finally(intervalFn);
        }, timeoutTime);
    }

    if (immediate) {
        intervalFn();
    }

    return {
        pause,
        resume,
    }
}
