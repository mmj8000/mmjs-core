import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import { createMockServer } from "../packages/mmjs-plugin/src/vite-mock";
import { createMockServer } from "mmjs-plugin/vite-mock";

export default defineConfig({
  plugins: [vue(), createMockServer({
    apiPrefix: ['/api', '/api2'],
    // forceMock: true,
    scan: true,
    // templateMimeType: ['html'],
    multiParameter: 'get',
    // fileExt: '.ts',
    // watchDynamicFile: true,
  }),],
  server: {
    proxy: {
      "^/api": {
        target: "https://www.baidu.com",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api\/test/, ""),
      },
    },
  },
});
