import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import { createMockServer } from "../packages/mmjs-plugin/src/vite-mock";
// import { useCors } from "../packages/mmjs-plugin/src/vite-server-cors";

import { createMockServer } from "mmjs-plugin/vite-mock";
import { useCors } from "mmjs-plugin/vite-server-cors";

export default defineConfig({
  plugins: [
    vue(),
    createMockServer({
      apiPrefix: ["/api-test", "/api2"],
      forceMock: true,
      // scan: true,
      // templateMimeType: ['html'],
      // multiParameter: "get",
      // fileExt: '.ts',
      // watchDynamicFile: true,
    }),
    // useCors(),
  ],
  server: {
    port: 10086,
    proxy: {
      "^/api": {
        target: "https://www.baidu.com",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api\/test/, ""),
      },
    },
  },
});
