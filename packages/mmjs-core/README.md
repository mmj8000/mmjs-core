# mmjs-core hooks component vue

- Install
  ```shell
  pnpm add mmjs-core
  ```
- **支持按需导入版本（^0.7.0-alpha.1 以上）**

  - **components 在^0.11.0后已从全局导出去除**

- Example
  ```ts
  import {} from "mmjs-core/components/{组件名}";
  import {} from "mmjs-core/client";
  import {} from "mmjs-core/hooks";
  import {} from "mmjs-core/utils";
  import {} from "mmjs-core/share";
  ```
- tsconfig.json
  - （如果用 Vite/Webpack 等打包工具）
  ```json
  {
    "moduleResolution": "Bundler"
  }
  ```

## 近期更新
- Components
  1. CssomLegend (`ECharts Option 转 Html 结构的Legend 很有用`)



## Client

1. WebSocketClient

   - ws client
   - Example

   ```ts
   const wsClient = new WebSocketClient(wsBaseURL);
   wsClient.onOpen = () => {
     console.log("连接已建立，发送欢迎消息");
     wsClient.send({ message: "xx" });
     wsClient.close();
   };
   wsClient.onMessage = () => {};
   ```

## Hooks

1. useAxiosCancellation

   - 管理请求，
   - abortControl
   - abort 重复请求
   - Example

   ```ts
   const { useService, cancelAllPendingRequests } = useAxiosCancellation({
     shouldAllowDuplicate: (config) => {
       // 默认策略：POST请求不允许重复
       return config.method?.toLowerCase() !== "post";
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
   const newFn = useMergeRequest(async () => {});
   ```

3. useDef (`^0.6.0-alpha.1`)

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

4. useVShallowRef (`^0.6.0-alpha.1`)

   - FrameWork (Vue)
   - InstanceType、 推导 InstanceType
   - Example

   ```vue
   <!-- vue -->
   <script setup>
   const compInstance = useVShallowRef(CompA);
   </script>
   ```

5. useAsyncIntervalFn (`^0.6.0-alpha.2`)

   - Interval Request、callback
   - Example

   ```ts
   useAsyncIntervalFn(() => fetch(""), 1000 * 10);
   ```

6. useWheel (`^0.9.0-alpha.1`)

   - FrameWork (Vue)
   - Example

   ```vue
   <script>
   const zoomContentRef = useTemplateRef<HTMLElement>("zoomContentRefName");
   const { wheel } = useWheel(zoomContentRef);
   </script>
   ```

7. useRestRef (`^0.10.0-alpha.1`)

   - FrameWork (Vue)
   - Example

   ```vue
   <script>
   const { state: querys, resetState } = useRestRef({
     date: [],
     name: "",
     index: null,
   });
   </script>
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
3. CssomLegend (`^0.12.0-alpha.1`)
   - FrameWork (**Vue**、**ECharts**) 
   - 针对pie、line、bar显示，其余后续版本陆续支持
   - Example
   ```vue
   <template>
     <!-- // 注意这里我用relative 定位 -->
     <div class="chart_wrap relative">
        <div class="chart" ref="chartDomKey"></div>
        <CssomLegend />
    </div>
   </template>
    <script lang="ts" setup>
    import {
     CssomLegend,
     cssomLegendInjectKey,
   } from "mmjs-core/components/cssomLegend";
    import { provide } from 'vue'; 
        // 使用provide 或者 props 传递给CssomLegend
        provide(
            cssomLegendInjectKey,
            computed(() => {
                return {
               	 ec: chartInstance.value!,
                };
            })
        );
    </script>
   ```

## Utils

1. keepDecimals (`^0.6.0-alpha.1`)

   - Format Number Fixed
   - Example

   ```ts
   keepDecimals(100.322, 2); // 100.32
   keepDecimals(100.388888888, 2, true); // 100.39
   ```

2. scale (`^0.8.0`)
   - value \* ratio 场景推荐： **BigScreen**  、**Echarts**
   - Example
   ```ts
   console.log(scale(10), scale("10px"));
   // 8.13888888888889 '8.13888888888889px'
   setScaleOption({
     clientHeight: 500,
   });
   console.log(scale(10), scale("10px"));
   // 4.62962962962963 '4.62962962962963px'
   ```
3. normalizeURL (`^0.9.0-alpha.1`)
   - 规范 URL
   - Example
   ```ts
   normalizeURL("https://example.com"); // "https://example.com"
   normalizeURL("http://example.com"); // "http://example.com"
   normalizeURL("//example.com"); // "http(s)://example.com" (取决于当前页面协议)
   normalizeURL("/api/data"); // "http(s)://当前域名/api/data"
   normalizeURL("data.json"); // "http(s)://当前域名/当前路径/data.json"
   ```



## Share
- [mmjs-share](https://www.npmjs.com/package/mmjs-share)