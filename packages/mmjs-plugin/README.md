# mmjs-plugin utils

- Install
  ```shell
  pnpm add mmjs-plugin
  ```

## vite-mock
  ### 默认用法
  - exmaple
  - 启用
    1. 检测浏览器location.search 是否存在 remote=mock; ` http://localhost:5173/?remote=mock#/`
    2. 传入参数强制mock `createMockServer({ forceMock: true })`
  - mock 工作流
    - 默认会读取 {项目root}/__mock__/{接口url}，读取失败则走vite server.proxy， 如果希望读取本地mock失败后继续转发请求线上api， 那server.proxy 至少要有一个和 apiPrefix 设置一样的前缀才会继续流转，否则读取失败即结束本次读取
  - 配置
  ```ts
  // vite.config.ts
  import { defineConfig } from "vite";
  import { createMockServer } from "mmjs-plugin/vite-mock";
  export default defineConfig({
    plugins: [createMockServer({
      // 接口 /api 开头才会走mock，一般和server.proxy 其中一个开头一样即可
      apiPrefix: '/api' 
    })], 
    server: {
      proxy: {
        "^/api": {
          target: "https://www.baidu.com",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
    },
  });
  ```
### 生成接口文件
  - 工作流
    - 开启scan后，自动通过Vite server.proxy 配置，把经过对应proxy 的接口数据全部写入到_output 目录，可通过传入scanOutput修改写入目录；生成的文件结构`{root}/{proxy 配置的target}/__mock__/_output/{接口url}.{文件后缀}`；文件后缀默认为.js，可通过传入fileExt 修改。
  - 配置
  ```ts
  // vite.config.ts
  export default defineConfig({
    plugins: [createMockServer({
      scan: true,
    })], 
    server: {
      proxy: {
        "^/api": {
          target: "https://www.baidu.com",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
    },
  });
  ```

### mock 文件
  - Coomonjs 、ESM 取决 package.json 中的type
  1. Commonjs
      - 如：`/api/login` 转换文件路径为 `__mock__/api/login.js`
  ```js
  exports.enabled = true;
  /**
   * @param {import('http').IncomingMessage} req
   * @param {import('http').ServerResponse<import('http').IncomingMessage>} res
   */
  exports.mock = (req, res) => {
    return { 
      code: 0, 
      data: null
     }
  }
  ```
  2. ESM
      - 如：`/api/userList` 转换为 `__mock__/api/userList.js`
  ```js
  export const enabled = true;
  /**
   * @param {import('http').IncomingMessage} req
   * @param {import('http').ServerResponse<import('http').IncomingMessage>} res
   */
  export const mock = (req, res) => {
    return {
      code: 0,
      data: [].filter(item => item.id === req.query.id)
    }
  }
  ```

### 默认Config

```ts
interface PluginOptions {
    /**
     * @default "/api"
     */
    apiPrefix?: string;
    /**
     * @default false
     */
    forceMock?: boolean;
    /**
     * @default "__mock__"
     */
    mockDir?: string;
    /**
     * @default ".js"
     */
    fileExt?: ".js" | ".ts" | ".json";
    /**
     * @default 500
     */
    timeout?: number;
    /**
     * @default ["info", 'succes', "wran"]
     */
    logLevel?: ("info" | "succes" | "wran")[];
    /**
     * @default false
     */
    scan?: boolean;
    /**
     * @default '_output'
     */
    scanOutput?: string;
    /**
     * 强制esm， 默认动态读取 package.json type 字段
     */
    _esm?: boolean;
    /**
     * scan 启用生效
     * 哪些mimetype 生成 .js or .ts 文件
     * @default []
     * @example
     * ["application/json"]
     */
    _templateMimeType?: [];
}
```

