# vite-server-cors

  - 配置
  ```ts
  // vite.config.ts
  import { useCors } from "vite-server-cors";
  export default defineConfig({
    plugins: [useCors()], 
  });
  ```