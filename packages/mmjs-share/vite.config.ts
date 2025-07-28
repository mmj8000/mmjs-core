import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  plugins: [
    vue(),
    libInjectCss(),
    dts({
      entryRoot: "./src",
      root: "./",
      outDir: "./dist/types",
      declarationOnly: false,
      cleanVueFileName: true,
      compilerOptions: {
        incremental: true,
      },
      include: [`src/**/*.ts`, `src/**/*d.ts`, `src/**/*.vue`],
    }),
  ],
  build: {
    outDir: "./dist",
    cssCodeSplit: false,
    lib: {
      name: "MmjsShare",
      entry: ["./src/index.ts"],
      formats: ["es", "cjs"],
      fileName(fromat, entry) {
        return `${fromat}/${entry.replace(".vue", "")}.js`;
      },
    },
    rollupOptions: {
      treeshake: false,
      output: {
        inlineDynamicImports: false,
        preserveModules: true,
        preserveModulesRoot: "src",
        assetFileNames: "[ext]/[name].[ext]",
      },
      external: [
      ],
    },
  },
});
