# mmjs-core hooks component vue

- Install
  ```shell
  pnpm add mmjs-core
  ```

## 近期更新
- Components
  1. CssomLegend (`ECharts Option 转 Html 结构的Legend 很有用`)
      - Add Function `transformFn` 用来转换Option To Css Var 的结果
   2. parseUrlParams （supported parse `main`、 `hash` ）


- 推荐按需导入
   - import Example
  ```ts
  import {} from "mmjs-core/components/*";
  import {} from "mmjs-core/client/*";
  import {} from "mmjs-core/hooks/*";
  import {} from "mmjs-core/utils/*";
  import type {} from "mmjs-core/types/*"; 
  ```
  
- tsconfig.json
  - （如果用 Vite/Webpack 等打包工具）
  - moduleResolution set "node" 先 // @ts-ignore 将就一下， 不想改了
  - 考虑更新到 "node16"、"nodenext" 或 "bundler"
  ```json
  {
   "compilerOptions": {
       "moduleResolution": "Bundler"
   }
  }
  ```

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
     <!-- 注意这里我用relative 定位 -->
     <div class="chart_wrap relative">
        <div class="chart" ref="chartDomKey"></div>
        <!-- 可以使用provide cssomLegendInjectKey 或者 props 传递给CssomLegend -->
        <CssomLegend :ec-instance="chartInstance" :transfrom-fn="transformFn" />
    </div>
   </template>
    <script lang="ts" setup>
        // 这里可以转换你要的 css var properties
        function transformFn(val, options) {
          return val;
        }
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
4. parseUrlParams (`^0.14.0-alpha.1`)
   - 增强版URL参数解析，支持解析所有位置的查询参数
   - Example
   ```ts
   const url = 'https://example.com/?test=has#/path?without=value';
   parseUrlParams(url)  // {test: 'has', without: 'value'}
   parseUrlParams(url, { includeHashParams: false }) // {test: 'has'}
   ```


## Share
- [mmjs-share](https://www.npmjs.com/package/mmjs-share)