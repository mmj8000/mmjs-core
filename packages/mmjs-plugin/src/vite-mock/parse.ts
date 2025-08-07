import { type IncomingMessage } from "node:http";
import { allowCharset, serverConfig } from "./options";
import mime from "mime-types";
import getRawBody from "raw-body";
import { dynamicImport, logger } from "./utils";

declare module "http" {
  interface IncomingMessage {
    query: Record<string, any>;
    /**
     * 注意：默认情况下只能被消费一次。读取了数据，后续中间件将无法再次获取 body，因为流已经被消耗。
     */
    body: Promise<any>;
    _parsedUrl?: URL & { query: string | null };
  }
}
export function useParseQueryParams(req: IncomingMessage) {
  Object.defineProperty(req, "query", {
    get() {
      try {
        // @ts-ignore
        if (req.__params) return req.__params;
        if (!req?.url) {
          return {};
        }
        // 解析URL获取查询参数
        const url = new URL(
          req.url,
          `http://${req.headers.host || "localhost"}`
        );
        const params = Object.fromEntries(url.searchParams.entries()) ?? {};
        // @ts-ignore
        req.__params = params;
        return params;
      } catch {
        return {};
      }
    },
  });
}
export function getCharset(req: IncomingMessage) {
  const contentType = req.headers["content-type"];
  let charset: BufferEncoding =
    mime.charset(contentType) || serverConfig.encoding || allowCharset[0];
  return charset.toLocaleLowerCase() as BufferEncoding;
}
export async function useParseBody(req: IncomingMessage) {
  Object.defineProperty(req, "body", {
    async get() {
      try {
        // @ts-ignore
        if (req.__body) return bodyObj;
        const encoding = getCharset(req);
        // 1. 读取并缓存 body
        const body = await getRawBody(req, { encoding });
        // 2. 挂载到 req.body（后续中间件直接访问）
        const bodyObj = JSON.parse(body);
        // @ts-ignore
        req.__body = bodyObj;
        return bodyObj;
      } catch {}
      return {};
    },
  });
}

const typeJsDocsStr = `/**\n* @type {import('mmjs-plugin/vite-mock').MockTemplate}\n*\/\n`;
const switchRespStr = `parameters[JSON.stringify(req._parsedUrl?.query ?? null)]`;
export async function transformInnerCodeTempate(
  body: string,
  mimeType: string,
  meta: {
    query: string | null;
    filePath: string;
  }
) {
  const { fileExt, multiParameter } = serverConfig;
  if (![".js", ".ts"].includes(fileExt)) return body;
  let _body = body;
  try {
    if (mimeType.includes("json")) {
      _body = body;
    } else {
      _body = JSON.stringify(body);
    }
  } catch {
    _body = body;
  }
  let parameters = {};
  let writeBody = _body;
  try {
    switch (multiParameter) {
      case "get":
        const readResult = await dynamicImport(meta.filePath);
        Object.assign(parameters, readResult.parameters ?? {}, {
          [JSON.stringify(meta.query)]: _body,
        });
        writeBody = switchRespStr;
        break;
    }
    parameters = JSON.stringify(parameters, null, 4);
  } catch (err) {
    logger.error(`${err} ${meta.filePath}`);
  }
  if (serverConfig._esm) {
    return `export const enabled = true;\nexport const parameters = ${parameters};\n${typeJsDocsStr}export const mock = (req, res) => (${writeBody})\n`;
  }
  return `exports.enabled = true;\nexports.parameters = ${parameters};\n${typeJsDocsStr}exports.mock = (req, res) => (exports.${writeBody})\n`;
}
