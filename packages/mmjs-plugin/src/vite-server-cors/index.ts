import { ViteDevServer } from "vite";

export function useCors(allowOrigin: string[] = ["*"]) {
  return {
    name: "vite:server:cors",
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", allowOrigin);
        res.setHeader("Access-Control-Allow-Headers", allowOrigin);
        next();
      });
    },
  };
}
