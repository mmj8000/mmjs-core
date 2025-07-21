#  mmjs-core hooks component vue

## hooks
1. useAxiosCancellation
    - 管理请求，
    - abortControl
    - abort重复请求
    - Example
    ```ts
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
    ```
2. useMergeRequest
    - 合并相同的请求
    - Example
    ```ts
    const newFn = useMergeRequest(async () => {})
    ```

3. WebSocketClient
    - ws client
    - Example
    ```ts 
    const wsClient = new WebSocketClient(wsBaseURL);
    wsClient.onOpen = () => {
        console.log('连接已建立，发送欢迎消息');
        wsClient.send({ message: 'xx', });
        wsClient.close();
    };
    wsClient.onMessage = () => {};
    ```

## Components

1. OptimizedVideoPlayer (`^0.4.0-alpha.3`)
    - video.js optimeized
    - Example
    ```vue
    <OptimizedVideoPlayer src="" />
    ```
2. IntersectionDraw (`^0.5.0-alpha.1`)
    - Intersection Render Slot
    - Example
    ```vue
    <IntersectionDraw>
        <div>content ....</div>
    </IntersectionDraw>
    ```