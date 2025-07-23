/**
 * 合并相同的请求
 * @example const newFn = useMergeRequest(async () => {})
 */
export declare function useMergeRequest<T extends (...args: any[]) => any>(fn: T): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>;
