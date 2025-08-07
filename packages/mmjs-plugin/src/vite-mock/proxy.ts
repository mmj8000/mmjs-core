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
                  const body = Buffer.concat(chunks);
                  const bodyStr = body.toString(encoding);
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
