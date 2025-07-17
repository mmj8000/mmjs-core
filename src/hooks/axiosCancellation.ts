import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { onUnmounted } from 'vue'

declare module 'axios' {
    interface AxiosRequestConfig {
        allowDuplicate?: boolean
    }
}
export interface PendingRequest {
    cancel: (message?: string) => void
    timestamp: number
}

export interface UseAxiosCancellationOptions {
    /**
     * 自定义判断是否允许重复请求的函数
     * @param config 当前请求的配置
     * @param pendingRequests 当前所有挂起的请求
     * @returns 返回 true 表示允许重复请求，false 表示不允许
     */
    shouldAllowDuplicate?: (config: AxiosRequestConfig, pendingRequests: Map<string, PendingRequest>) => boolean
}

/**
 * 
 * @param options 
 * @returns 
 * @example 
 * const { useService } = useAxiosCancellation({
 * shouldAllowDuplicate: (config) => {
 * // 默认策略：POST请求不允许重复
 * return config.method?.toLowerCase() !== 'post'
 * }
 */
export function useAxiosCancellation(options?: UseAxiosCancellationOptions) {
    const pendingRequests = new Map<string, PendingRequest>()
    let requestInterceptor: number | null = null
    let responseInterceptor: number | null = null

    // 生成请求唯一标识
    function getRequestKey(config: AxiosRequestConfig): string {
        const { method, url, params, data } = config ?? {};
        let keyParts = [method?.toUpperCase(), url]

        if (params && Object.keys(params).length) {
            keyParts.push(`params:${JSON.stringify(params)}`)
        }

        if (data) {
            if (typeof data === 'object') {
                keyParts.push(`data:${JSON.stringify(data)}`)
            } else {
                keyParts.push(`data:${data}`)
            }
        }

        return keyParts.join('|')
    }

    // 判断是否应该取消重复请求
    function shouldCancelDuplicate(config: AxiosRequestConfig): boolean {
        // 优先使用请求配置中的 allowDuplicate
        if (config.allowDuplicate !== undefined) {
            return !config.allowDuplicate
        }

        // 其次使用用户提供的自定义判断函数
        if (options?.shouldAllowDuplicate) {
            return !options.shouldAllowDuplicate(config, pendingRequests)
        }

        // 默认行为：取消重复请求
        return true
    }

    function useService(service: AxiosInstance) {
        // 清除已有拦截器
        clearInterceptors()

        // 添加请求拦截器
        requestInterceptor = service.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                const requestKey = getRequestKey(config)

                // 只有当需要取消重复请求时，才检查并取消
                if (pendingRequests.has(requestKey) && shouldCancelDuplicate(config)) {
                    const pendingRequest = pendingRequests.get(requestKey)
                    pendingRequest?.cancel(`取消重复请求: ${requestKey}`)
                    pendingRequests.delete(requestKey)
                }

                config.cancelToken = new axios.CancelToken(cancel => {
                    pendingRequests.set(requestKey, {
                        cancel,
                        timestamp: Date.now()
                    });
                });

                return config
            }
        )

        // 添加响应拦截器
        responseInterceptor = service.interceptors.response.use(function (response: AxiosResponse) {
            if (response.config) {
                const requestKey = getRequestKey(response.config)
                pendingRequests.delete(requestKey)
            }

            return response;
        },
            (error: AxiosError) => {
                if (axios.isCancel(error)) {
                    console.log('请求被取消:', error.message)
                    return Promise.reject({
                        isCancelled: true,
                        message: error.message
                    })
                }

                // 请求失败时也清除记录
                if (error.config) {
                    const requestKey = getRequestKey(error.config)
                    pendingRequests.delete(requestKey)
                }

                return Promise.reject(error)
            }
        )
    }

    // 清除拦截器
    function clearInterceptors() {
        if (requestInterceptor !== null && responseInterceptor !== null) {
            axios.interceptors.request.eject(requestInterceptor)
            axios.interceptors.response.eject(responseInterceptor)
            requestInterceptor = null
            responseInterceptor = null
        }
    }

    // 取消所有请求
    function cancelAllPendingRequests(message = '取消所有未完成请求') {
        pendingRequests.forEach(({ cancel }, key) => {
            cancel(`${message}: ${key}`)
            pendingRequests.delete(key)
        })
    }
    // 取消特定请求
    function cancelRequest(
        predicate: (key: string, request: PendingRequest) => boolean,
        message = '取消指定请求'
    ) {
        pendingRequests.forEach((request, key) => {
            if (predicate(key, request)) {
                request.cancel(`${message}: ${key}`)
                pendingRequests.delete(key)
            }
        })
    }
    // 组件卸载时自动清理
    onUnmounted(() => {
        cancelAllPendingRequests('组件卸载取消请求')
        clearInterceptors()
    })

    return {
        pendingRequests,
        useService,
        cancelAllPendingRequests,
        cancelRequest,
        clearInterceptors
    }
}