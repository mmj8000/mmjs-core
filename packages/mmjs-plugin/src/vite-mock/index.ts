import type { ViteDevServer, Plugin } from "vite";
import { useParseBody, useParseQueryParams } from "./parse";
import path from "node:path";
import { colorize, logger } from "./utils";
import { pathToFileURL } from "node:url";
import { readFileSync } from "node:fs";
import { useProxyRes } from "./proxy";
import { serverConfig, PluginOptions, updateLogLevelState } from "./options";
import mime from "mime-types";

const notFileErrMsg = ["no such file", "Cannot find module"];

const mockNoEnabledStr = "Mock Not enabled";

export function createMockServer(config?: PluginOptions): Plugin {
  const { scan, apiPrefix, forceMock, mockDir, timeout, fileExt } =
    Object.assign(serverConfig, config ?? {});
  updateLogLevelState();
  return {
    name: "vite:mmjs:mock",
    apply: "serve",
    enforce: "post",
    configureServer(server: ViteDevServer) {
      // 获取项目根目录
      const root = server.config.root;
      const pkgPath = path.join(server.config.root, "package.json");
      const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
      serverConfig._esm = pkg.type === "module";
      if (scan) {
        logger.info("⏳ Scan Watching...");
        return useProxyRes(server);
      }
      server.middlewares.use(apiPrefix, async (req, res, next) => {
        let readPath = "";
        let remote = "";
        try {
          if (req.headers.referer) {
            remote =
              new URL(req.headers?.referer).searchParams.get("remote") ?? "";
          }
          if (remote !== "mock" && !forceMock) {
            logger.info("🔒 Browser URL not found mcok Keyword");
            return next();
          }
          useParseQueryParams(req);
          await useParseBody(req);
          const pathname = req._parsedUrl?.pathname ?? "";
          req.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock";
          readPath = path.join(root, mockDir, pathname + fileExt);
          let mockState: {
            enabled: boolean;
            mock: (req, res) => any;
          };
          if (serverConfig._esm) {
            mockState = await import(
              pathToFileURL(readPath).href + "?t=" + Date.now()
            );
          } else {
            require.cache && delete require.cache[readPath];
            mockState = await require(readPath);
          }
          function response() {
            res.setHeader("Content-Type", mime.contentType(readPath));
            logger.success(
              `✅ Mock Successify ${colorize(readPath, "underline")}`
            );
            setTimeout(() => {
              res.end(JSON.stringify(resp));
            }, timeout);
          }

          if (fileExt === ".json" && mockState) {
            response();
            return;
          }

          if (!mockState?.enabled) {
            throw new Error(mockNoEnabledStr);
          }

          let resp = mockState.mock(req, res);
          if (resp instanceof Promise) {
            resp = await resp;
          }
          if (resp !== void 0) {
            response();
          }
        } catch (err: any) {
          if (err?.message.indexOf(mockNoEnabledStr) !== -1) {
            logger.info(
              `🔒 Mock Not Enabled! ${colorize(readPath, "underline")}`
            );
          } else if (
            notFileErrMsg.some((text) => err?.message?.indexOf(text) !== -1)
          ) {
            logger.wran(
              `❌ File Not Found! ${colorize(readPath, "underline")}`
            );
          } else {
            console.error(err);
          }
          next();
        }
      });
    },
  };
}
