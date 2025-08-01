import type { ViteDevServer, Plugin } from "vite";
import { useParseBody, useParseQueryParams } from "./parse";
import path from "node:path";
import { colorize, logger } from "./utils";
import { pathToFileURL } from "node:url";
import { readFileSync } from "node:fs";

const notFileErrMsg = ["no such file", "Cannot find module"];

const mockNoEnabledStr = "Mock Not enabled";

export interface PluginOptions {
  /**
   * @default "/mock"
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
  fileSuffix?: ".js" | ".ts";
  /**
   * @default 500
   */
  timeout?: number;
  /**
   * @default ["info", "wran"]
   */
  logLevel?: ("info" | "succes" | "wran")[];
}
export function createMockServer(options?: PluginOptions): Plugin {
  const {
    apiPrefix = "/mock",
    forceMock = false,
    mockDir = "__mock__",
    fileSuffix = ".js",
    timeout = 500,
    logLevel = ["info", "wran"],
  } = options ?? {};
  return {
    name: "vite:mmjs:mock",
    apply: "serve",
    enforce: "post",
    configureServer(server: ViteDevServer) {
      const isLogWarn = logLevel.includes("wran");
      const isLogInfo = logLevel.includes("info");
      const isLogSuccess = logLevel.includes("succes");
      // 获取项目根目录
      const root = server.config.root;
      const pkgPath = path.join(server.config.root, "package.json");
      const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
      server.middlewares.use(apiPrefix, async (req, res, next) => {
        let readPath = "";
        let remote = "";
        try {
          if (req.headers.referer) {
            remote =
              new URL(req.headers?.referer).searchParams.get("remote") ?? "";
          }
          if (remote !== "mock" && !forceMock) return next();

          useParseQueryParams(req);
          await useParseBody(req);
          // @ts-ignore
          const pathname = req._parsedUrl.pathname ?? "";
          req.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock";
          readPath = path.join(root, mockDir, pathname + fileSuffix);
          let mockState: {
            enabled: boolean;
            mock: (req, res) => any;
          };
          if (pkg.type === "module") {
            mockState = await import(
              pathToFileURL(readPath).href + "?t=" + Date.now()
            );
          } else {
            require.cache && delete require.cache[readPath];
            mockState = await require(readPath);
          }

          if (!mockState?.enabled) {
            throw new Error(mockNoEnabledStr);
          }
          res.setHeader("Content-Type", "application/json");
          let resp = mockState.mock(req, res);
          if (resp instanceof Promise) {
            resp = await resp;
          }
          if (resp !== void 0) {
            isLogSuccess &&
              logger.success(
                `🚀 Mock Successify ${colorize(readPath, "underline")}`
              );
            setTimeout(() => {
              res.end(JSON.stringify(resp));
            }, timeout);
          }
        } catch (err: any) {
          if (err?.message.indexOf(mockNoEnabledStr) !== -1) {
            isLogInfo &&
              logger.info(
                `❓ Mock Not Enabled! ${colorize(readPath, "underline")}`
              );
          } else if (
            notFileErrMsg.some((text) => err?.message?.indexOf(text) !== -1)
          ) {
            isLogWarn &&
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
