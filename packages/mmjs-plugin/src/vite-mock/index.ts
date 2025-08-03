import type { ViteDevServer, Plugin } from "vite";
import { useParseBody, useParseQueryParams } from "./parse";
import path from "node:path";
import { colorize, getContentTypeByPath, logger, useContentType } from "./utils";
import { pathToFileURL } from "node:url";
import { createReadStream, readFileSync } from "node:fs";
import { useProxyRes } from "./proxy";
import { serverConfig, PluginOptions, updateLogLevelState, allowExt } from "./options";
import mime from "mime-types";
import type { IncomingMessage, ServerResponse } from "node:http";

const notFileErrMsg = ["no such file", "Cannot find module"];
const mockNoEnabledStr = "Mock Not enabled";

export declare function MockTemplate(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
): Promise<any> | any;

export function createMockServer(config?: PluginOptions): Plugin {
  const { scan, apiPrefix, forceMock, mockDir, timeout } =
    Object.assign(serverConfig, config ?? {});
  updateLogLevelState();
  return {
    name: "vite:mmjs:mock",
    apply: "serve",
    enforce: "post",
    config(config, env) {
      if (scan && env.command === "serve") {
        return {
          server: {
            watch: {
              ignored: [
                `**/${mockDir}/**`,
                // 可扩展其他规则
              ],
            },
          },
        };
      }
    },
    configureServer(server: ViteDevServer) {
      // 获取项目根目录
      const root = server.config.root;
      serverConfig.root = root;
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
          const contentType = req.headers["content-type"];
          const { encoding, fileExt } = useContentType(contentType);
          const pathname = req._parsedUrl?.pathname ?? "";
          req.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock";
          readPath = path.join(root, mockDir, pathname + fileExt);
          let mockState: {
            enabled: boolean;
            mock: (req, res) => any;
          };
          function response(data, contentType = getContentTypeByPath(readPath)) {
            contentType && res.setHeader("Content-Type", contentType);
            logger.success(
              `✅ Mock Successify ${colorize(readPath, "underline")}`
            );
            setTimeout(() => {
              res.end(JSON.stringify(data));
            }, timeout);
          }
          if (!allowExt.includes(fileExt as any)) {
            const readStream = createReadStream(readPath);
            const contentType = getContentTypeByPath(readPath);
            contentType && res.setHeader("Content-Type", contentType);
            readStream.pipe(res);
            readStream.on('error', (err) => {
              logger.error(err);
              readStream.destroy();
              next();
            });
            readStream.on('end', () => {
              logger.success(
                `✅ ReadStream End ${colorize(readPath, "underline")}`
              );
            });
            readStream.on('close', () => {
              if (!readStream.destroyed) {
                readStream.destroy();
              }
            });
            return;
          }
          if (fileExt === '.json') {
            try {
              const json = readFileSync(readPath, { encoding, });
              return response(JSON.parse(json));
            } catch (err) {
              logger.wran(`${err}; ${readPath}`);
              return next();
            }
          }
          if (serverConfig._esm) {
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
          useParseQueryParams(req);
          useParseBody(req);
          let resp = mockState.mock(req, res);
          if (resp instanceof Promise) {
            resp = await resp;
          }
          response(resp, "application/json");
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
