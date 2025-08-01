import type { ViteDevServer } from "vite";
import { type ServerResponse, type IncomingMessage } from "node:http";
import { logger } from "./utils";
import { allowCharset, serverConfig } from "./options";
import {
  existsSync,
  mkdirSync,
  writeFile,
  type WriteFileOptions,
} from "node:fs";
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
            const outputPathName = req._parsedUrl?.pathname;
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

                const isInnerTempType = !serverConfig._templateMimeType?.length
                  ? true
                  : serverConfig._templateMimeType.some(
                      (type) => mimeType?.indexOf(type) !== -1
                    );

                let fileExt: string = serverConfig.fileExt;
                if (!isInnerTempType) {
                  fileExt = mimeType ? "." + mimeType : serverConfig.fileExt;
                }
                const encoding = allowCharset.includes(charset)
                  ? charset
                  : allowCharset[0];

                const bodyStr = body.toString(encoding);
                const newBody = isInnerTempType
                  ? transformInnerCodeTempate(bodyStr)
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

function getMimeType(contentType: string | undefined) {
  return contentType?.match(/^[^;]+/)?.[0]?.trim();
}
function getCharset(contentType: string | undefined) {
  // 解析 charset
  let charset = "utf-8"; // 默认值
  if (contentType) {
    const match = contentType.match(/charset=([^;]+)/i);
    if (match) {
      charset = match[1].trim().toLowerCase();
    }
  }
  return charset;
}

function existsSyncByMkdir(file: string) {
  try {
    const dirName = path.dirname(file);
    if (!existsSync(dirName)) {
      mkdirSync(dirName, { recursive: true });
    }
  } catch (err) {
    logger.error(err);
  }
}

function writeMockFile(
  file: string,
  data: string | NodeJS.ArrayBufferView,
  options: WriteFileOptions
) {
  existsSyncByMkdir(file);
  writeFile(file, data, options, (err: NodeJS.ErrnoException | null) => {
    if (!err) {
      logger.success(`💧 Save File Successify ${file}`);
    } else {
      logger.wran(err);
    }
  });
}
