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
import {
  type BrotliDecompress,
  type Gunzip,
  type Inflate,
  type InputType,
  type CompressCallback,
  createBrotliDecompress,
  createGunzip,
  createInflate,
  gunzip,
  inflate,
  brotliDecompress,
} from "node:zlib";
import { pipeline } from "node:stream";

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
            const resContentEncoding = proxyRes.headers["content-encoding"];
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
                // 1. 创建解压流（如果需要）
                let decompressStream:
                  | Gunzip
                  | Inflate
                  | BrotliDecompress
                  | null = null;
                switch (resContentEncoding) {
                  case "gzip":
                    decompressStream = createGunzip();
                    break;
                  case "deflate":
                    decompressStream = createInflate();
                    break;
                  case "br":
                    decompressStream = createBrotliDecompress();
                    break;
                }

                function printWriteStreamSuccess() {
                  logger.success(
                    `✅ writeStream End ${colorize(filePath, "underline")}`
                  );
                }
                if (decompressStream) {
                  pipeline(
                    proxyRes, // 原始响应流
                    decompressStream, // 解压流
                    writeStream, // 写入文件
                    (err) => {
                      if (err) {
                        return logger.error("写入文件失败:" + err.message);
                      }
                      printWriteStreamSuccess();
                    }
                  );
                } else {
                  pipeline(
                    proxyRes, // 原始响应流
                    writeStream, // 直接写入文件
                    (err) => {
                      if (err) {
                        return logger.error("写入文件失败:" + err.message);
                      }

                      printWriteStreamSuccess();
                    }
                  );
                }
              } else {
                const chunks: any[] = [];
                proxyRes.on("data", (chunk) => {
                  chunks.push(chunk);
                });
                proxyRes.on("end", async () => {
                  let bodyStr = "";
                  const body = Buffer.concat(chunks);
                  let decompressBuf: Buffer<ArrayBufferLike> = body;
                  // 检查是否是 gzip 压缩
                  try {
                    switch (resContentEncoding) {
                      case "gzip":
                        decompressBuf = await decompressBy(gunzip, body);
                        break;
                      case "deflate":
                        decompressBuf = await decompressBy(inflate, body);
                        break;
                      case "br":
                        decompressBuf = await decompressBy(
                          brotliDecompress,
                          body
                        );
                        break;
                    }
                    bodyStr = decompressBuf.toString(encoding);
                  } catch (err) {
                    bodyStr = body.toString(encoding);
                    logger.error("解压失败" + err);
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

function decompressBy(
  api: (buf: InputType, callback: CompressCallback) => void,
  buf: Buffer
) {
  return new Promise<Buffer<ArrayBufferLike>>((resolve, reject) => {
    api(buf, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
