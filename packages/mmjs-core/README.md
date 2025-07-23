#  mmjs-core hooks component vue
- Install
    ```shell
    pnpm add mmjs-core
    ```
    
- **支持按需导入版本（^0.7.0-alpha.1以上）**
- Example
    ```ts
    import {} from "mmjs-core/components";
    import {} from "mmjs-core/components/{组件名}";
    import {} from "mmjs-core/client";
    import {} from "mmjs-core/hooks";
    import {} from "mmjs-core/utils";
    // ***************************
    ```
- tsconfig.json
  - （如果用 Vite/Webpack 等打包工具）
  ```json
  {
      "moduleResolution": "Bundler",
  }
  ```

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
    - FrameWork (Vue)
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

    - FrameWork (Vue)

    - InstanceType、 推导InstanceType

    - Example

    ```vue
    <!-- vue -->
    <script setup>
        const compInstance = useVShallowRef(CompA);
    </script>
    ```

6. useAsyncIntervalFn (`^0.6.0-alpha.2`)
    - Interval Request、callback
    - Example
    ```ts
    useAsyncIntervalFn(() => fetch(''), 1000 * 10);
    ```

## Components

1. OptimizedVideoPlayer (`^0.4.0-alpha.3`) 
    - FrameWork (**Vue**)
    - video.js optimeized
    - Example
    ```vue
    <OptimizedVideoPlayer src="" />
    ```
2. IntersectionDraw (`^0.5.0-alpha.1`)
    - FrameWork (**Vue**)
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

2. scale (`^0.8.0`)
    - value * ratio **BigScreen**
    - Example
    ```ts
    console.log(scale(10), scale('10px')); 
    // 8.13888888888889 '8.13888888888889px'
    setScaleOption({
    	clientHeight: 500,
    });
    console.log(scale(10), scale('10px')); 
    // 4.62962962962963 '4.62962962962963px'
    ```