import { AxiosInstance, AxiosRequestConfig } from 'axios';
declare module 'axios' {
    interface AxiosRequestConfig {
        allowDuplicate?: boolean;
    }
}
export interface PendingRequest {
    cancel: (message?: string) => void;
    timestamp: number;
}
export interface UseAxiosCancellationOptions {
    /**
     * 自定义判断是否允许重复请求的函数
     * @param config 当前请求的配置
     * @param pendingRequests 当前所有挂起的请求
     * @returns 返回 true 表示允许重复请求，false 表示不允许
     */
    shouldAllowDuplicate?: (config: AxiosRequestConfig, pendingRequests: Map<string, PendingRequest>) => boolean;
}
/**
 *
 * @param options
 * @returns
 * @example
    const { useService, cancelAllPendingRequests } = useAxiosCancellation({
            shouldAllowDuplicate: (config) => {
                    // 默认策略：POST请求不允许重复
                    return config.method?.toLowerCase() !== 'post'
                },
            });
        useService(axiso);
        router.beforeEach(() => {
            cancelAllPendingRequests();
        });
 */
export declare function useAxiosCancellation(options?: UseAxiosCancellationOptions): {
    pendingRequests: Map<string, PendingRequest>;
    useService: (service: AxiosInstance) => void;
    cancelAllPendingRequests: (message?: string) => void;
    cancelRequest: (predicate: (key: string, request: PendingRequest) => boolean, message?: string) => void;
    clearInterceptors: () => void;
};
