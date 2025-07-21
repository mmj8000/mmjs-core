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

4. useDef (`^0.6.0-alpha.1`)
    - 重组件 def
    - Example
    ```vue
    <script setup>
     const def = useDef(3);
    </script>
    <template v-if="def(1)"></template>
    <template v-if="def(2)"></template>
    <template v-if="def(3)"></template>
    ```
    
5. useVShallowRef (`^0.6.0-alpha.1`)
    - InstanceType、 推导InstanceType
    - Example
    ```vue
    <script setup>
        const compInstance = useVShallowRef(CompA);
    </script>
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

## Utils

1. keepDecimals (`^0.6.0-alpha.1`)
    - Format Number Fixed
    - Example
    ```ts
    keepDecimals(100.322, 2) // 100.32
    keepDecimals(100.388888888, 2, true) // 100.39
    ```