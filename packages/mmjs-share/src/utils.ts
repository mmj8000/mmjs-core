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
export function throttle<T extends Function>(func: T, delay: number) {
  let lastTime = 0;
  let timeoutId: NodeJS.Timeout | null = null;

  const throttled = function (...args) {
    const now = Date.now();
    const remainingTime = delay - (now - lastTime);

    if (remainingTime <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      func.apply(this, args);
      lastTime = now;
    } else if (!timeoutId) {
      // 如果剩余时间 > 0，并且没有定时器，就设置一个
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastTime = Date.now();
        timeoutId = null;
      }, remainingTime);
    }
  };

  // 添加取消方法
  throttled.cancel = function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return throttled;
}

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
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => string,
  ttl?: number
): {
  (...args: Parameters<T>): ReturnType<T>;
  cache: Map<string, CacheEntry<ReturnType<T>>>;
  clear: () => void;
} {
  const cache = new Map<string, CacheEntry<ReturnType<T>>>();
  const defaultResolver = (...args: Parameters<T>): string =>
    JSON.stringify(args);

  const memoized = function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = (resolver || defaultResolver)(...args);

    // 检查缓存是否有效
    if (cache.has(key)) {
      const entry = cache.get(key)!;
      if (entry.expireAt > Date.now()) {
        return entry.data;
      }
      cache.delete(key); // 清除过期缓存
    }

    // 执行原函数并缓存
    const result = func.apply(this, args);
    cache.set(key, {
      data: result,
      expireAt: Date.now() + (ttl ?? Infinity), // 默认永不过期
    });

    return result;
  };

  // 附加属性和方法
  memoized.cache = cache;
  memoized.clear = () => cache.clear();

  return memoized as typeof memoized & {
    cache: typeof cache;
    clear: () => void;
  };
}

/**
 * 判断是否是一个对象 包含Array
 * @param value
 * @example
 * isObject({}) // true
 * @returns
 */
export function isObject(value: unknown): value is Record<string, unknown>  {
  const type = typeof value;
  return value != null && (type == "object" || type == "function");
}

/**
 * 判断是否是一个普通对象
 * @param value 
 * @returns 
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}