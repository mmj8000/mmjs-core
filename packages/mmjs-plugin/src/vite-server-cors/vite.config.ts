import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const fileExt = {
  es: 'mjs',
  cjs: 'cjs',
}
export default defineConfig({
  plugins: [
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
      entry: ["./src/index.ts"],
      formats: ["es", "cjs"],
      fileName(format, entry) {
        return `${format}/${entry.replace(".vue", "")}.${fileExt[format]}`;
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
        'vite'
      ],
    },
  },
});
