import type { ViteDevServer } from "vite";
import { type ServerResponse, type IncomingMessage } from "node:http";
import {
  colorize,
  existsSyncByMkdir,
  logger,
  safeUrlToFilename,
  useContentType,
  writeMockFile,
} from "./utils";
import { serverConfig } from "./options";
import path from "node:path";
import { transformInnerCodeTempate } from "./parse";
import { createWriteStream } from "node:fs";
import { gunzipSync } from "node:zlib";

export function useProxyRes(server: ViteDevServer) {
  const proxys = server.config.server?.proxy ?? {};
  for (let key in proxys) {
    try {
      const item = proxys[key];
      if (typeof item !== "object") continue;
      const configure = item.configure;
      item.configure = (proxy, options) => {
        proxy.on(
          "proxyRes",
          (
            proxyRes: IncomingMessage,
            req: IncomingMessage,
            res: ServerResponse
          ) => {
            if (typeof configure === "function") configure(proxy, options);
            const outputPathName = path.join(
              safeUrlToFilename(options.target ?? ""),
              req._parsedUrl?.pathname ?? ""
            );
            if (outputPathName) {
              const contentType = proxyRes.headers["content-type"];
              const { encoding, isInnerTempType, mimeType, fileExt } =
                useContentType(contentType);
              const filePath = path.join(
                server.config.root,
                serverConfig.mockDir,
                serverConfig.scanOutput,
                outputPathName! + fileExt
              );
              if (!isInnerTempType) {
                existsSyncByMkdir(filePath);
                const writeStream = createWriteStream(filePath);
                writeStream.on("error", (err) => {
                  logger.error(err);
                  writeStream.destroy();
                });
                writeStream.on("close", () => {
                  logger.success(
                    `✅ writeStream End ${colorize(filePath, "underline")}`
                  );
                  if (!writeStream.destroyed) {
                    writeStream.destroy();
                  }
                });
                proxyRes.on("data", (chunk) => {
                  writeStream.write(chunk);
                });

                proxyRes.on("end", () => {
                  writeStream.end();
                });
              } else {
                const chunks: any[] = [];
                proxyRes.on("data", (chunk) => {
                  chunks.push(chunk);
                });

                proxyRes.on("end", async () => {
                  let bodyStr = "";
                  // 检查是否是 gzip 压缩
                  const isGzipped =
                    proxyRes.headers["content-encoding"] === "gzip";
                  const body = Buffer.concat(chunks);
                  if (isGzipped) {
                    // 解压 gzip 数据
                    try {
                      const decompressed = gunzipSync(body);
                      bodyStr = decompressed.toString(encoding);
                    } catch (err) {
                      logger.error("解压失败" + err);
                    }
                  } else {
                    bodyStr = body.toString(encoding);
                  }
                  const newBody = await transformInnerCodeTempate(
                    bodyStr,
                    mimeType,
                    {
                      query: req._parsedUrl?.query ?? null,
                      filePath,
                    }
                  );
                  writeMockFile(filePath, newBody, { encoding });
                });
              }
            }
          }
        );
      };
    } catch (err) {
      logger.error(err);
    }
  }
}

export function useResponseAppend(res: ServerResponse) {
  Reflect.set(res, "send", function (...args: any[]) {
    if (!res.writableEnded) {
      const [value, ...agrslist] = args;
      res.end(
        typeof value !== "function" ? JSON.stringify(value) : value,
        ...agrslist
      );
      return res;
    }
    return res;
  });
}
