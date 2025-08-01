import { type IncomingMessage } from "node:http";
import querystring from "node:querystring";
import { serverConfig } from "./options";

declare module "http" {
  interface IncomingMessage {
    query: Record<string, any>;
    body: Record<string, any>;
    _parsedUrl?: URL
  }
}
export function useParseQueryParams(req: IncomingMessage) {
  if (!req?.url) {
    return Reflect.set(req, "query", {});
  }
  // 解析URL获取查询参数
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  return Reflect.set(
    req,
    "query",
    Object.fromEntries(url.searchParams.entries()) ?? {}
  );
}

// 解析请求体的工具函数
export async function parseRequestBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        if (!body) resolve({});
        const contentType = req.headers["content-type"];
        if (contentType?.includes("application/json")) {
          resolve(JSON.parse(body));
        } else if (contentType?.includes("application/x-www-form-urlencoded")) {
          resolve(querystring.parse(body));
        } else {
          resolve(body);
        }
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

export async function useParseBody(req: IncomingMessage) {
  try {
    // 解析URL获取查询参数
    Reflect.set(req, "body", await parseRequestBody(req));
  } catch {
    Reflect.set(req, "body", {});
  }
}

export function transformInnerCodeTempate(body: string) {
  const newData = JSON.stringify(body || {}, void 0, 4);
  if (serverConfig._esm) {
    return `export const enabled = true;\nexport const mock = () => (${newData})\n`;
  }
  return `exports.enabled = true;\nexports.mock = () => (${newData})\n`;
}
