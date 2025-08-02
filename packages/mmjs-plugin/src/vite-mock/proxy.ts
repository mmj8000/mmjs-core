import type { ViteDevServer } from "vite";
import { type ServerResponse, type IncomingMessage } from "node:http";
import { logger, safeUrlToFilename, writeMockFile } from "./utils";
import { allowCharset, serverConfig } from "./options";
import path from "node:path";
import mime from "mime-types";
import { transformInnerCodeTempate } from "./parse";

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
              const chunks: any[] = [];
              proxyRes.on("data", (chunk) => {
                chunks.push(chunk);
              });

              proxyRes.on("end", () => {
                const body = Buffer.concat(chunks);
                const contentType = res.getHeaders()["content-type"];
                let charset: BufferEncoding =
                  mime.charset(contentType) || allowCharset[0];
                charset = charset.toLocaleLowerCase() as BufferEncoding;
                const mimeType =
                  mime.extension(contentType) || serverConfig.fileExt.slice(1);
                const isInnerTempType = !serverConfig.templateMimeType?.length
                  ? true
                  : serverConfig.templateMimeType.some(
                      (type) => mimeType?.indexOf(type) !== -1
                    );

                let fileExt: string = serverConfig.fileExt;
                let encoding = allowCharset.includes(charset)
                  ? charset
                  : allowCharset[0];
                if (isInnerTempType) {
                  encoding = allowCharset[0];
                } else {
                  fileExt = mimeType ? "." + mimeType : serverConfig.fileExt;
                }

                const bodyStr = body.toString(encoding);
                const newBody = isInnerTempType
                  ? transformInnerCodeTempate(bodyStr, mimeType)
                  : bodyStr;
                const filePath = path.join(
                  server.config.root,
                  serverConfig.mockDir,
                  serverConfig.scanOutput,
                  outputPathName! + fileExt
                );
                writeMockFile(filePath, newBody, { encoding });
              });
            }
          }
        );
      };
    } catch (err) {
      logger.error(err);
    }
  }
}
