import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { onUnmounted } from 'vue';



declare module 'axios' {
    interface AxiosRequestConfig {
        allowDuplicate?: boolean
    }
}

export interface PendingRequest {
    cancel: (message?: string) => void
    timestamp: number
}

export function useAxiosCancellation() {
    const pendingRequests = new Map<string, PendingRequest>()
    let requestInterceptor: number | null = null
    let responseInterceptor: number | null = null

    // 生成更精确的请求标识（考虑请求体）
    function getRequestKey(config: AxiosRequestConfig): string {
        const { method, url, params, data } = config
        const keyParts = [method?.toUpperCase(), url]

        if (params) {
            keyParts.push(`params:${JSON.stringify(params)}`)
        }

        if (data && typeof data === 'object') {
            keyParts.push(`data:${JSON.stringify(data)}`)
        } else if (data) {
            keyParts.push(`data:${data}`)
        }

        return keyParts.join('|')
    }

    function useService(service: AxiosInstance) {
        // 清除已有拦截器
        clearInterceptors()

        // 添加请求拦截器
        requestInterceptor = service.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                const requestKey = getRequestKey(config)

                // 如果已有相同请求，先取消
                if (pendingRequests.has(requestKey) && !config.allowDuplicate) {
                    const pendingRequest = pendingRequests.get(requestKey)
                    pendingRequest?.cancel(`取消重复请求: ${requestKey}`)
                    pendingRequests.delete(requestKey)
                }

                config.cancelToken = new axios.CancelToken(cancel => {
                    pendingRequests.set(requestKey, {
                        cancel,
                        timestamp: Date.now()
                    })
                })

                return config
            }
        )

        // 添加响应拦截器
        responseInterceptor = service.interceptors.response.use(
            (response: AxiosResponse) => {
                const requestKey = getRequestKey(response.config)
                pendingRequests.delete(requestKey)
                return response
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