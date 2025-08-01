import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import { createMockServer } from "../packages/mmjs-plugin/src";
import { createMockServer } from "mmjs-plugin/vite-mock";

export default defineConfig({
  plugins: [vue(), createMockServer({})],
  server: {
    proxy: {
      "^/mock": {
        target: "https://www.baidu.com",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/mock/, ""),
      },
    },
  },
});
