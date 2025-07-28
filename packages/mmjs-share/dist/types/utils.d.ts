/**
 *
 * @param func
 * @param delay
 * @example
 * const throttledFn = throttle(() => {
        console.log('Throttled function');
    }, 500);

    // 手动取消节流
    setTimeout(() => {
        throttledFn.cancel();
    }, 2000);
 * @returns
 */
export declare function throttle<T extends Function>(func: T, delay: number): {
    (...args: any[]): void;
    cancel(): void;
};
export type CacheEntry<T> = {
    data: T;
    expireAt: number;
};
/**
 *
 * @param func
 * @param resolver
 * @param ttl
 * @example
 * const add = (a: number, b: number): number => {
   console.log('Calculating...');
    return a + b;
    };

    const memoizedAdd = memoize(add);
    console.log(memoizedAdd(1, 2)); // 输出计算日志
    console.log(memoizedAdd(1, 2)); // 从缓存读取
 * @returns
 */
export declare function memoize<T extends (...args: any[]) => any>(func: T, resolver?: (...args: Parameters<T>) => string, ttl?: number): {
    (...args: Parameters<T>): ReturnType<T>;
    cache: Map<string, CacheEntry<ReturnType<T>>>;
    clear: () => void;
};
