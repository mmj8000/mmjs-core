import { serverConfig as i, allowCharset as u } from "./options.mjs";
import l from "mime-types";
import y from "raw-body";
import { dynamicImport as f, logger as d } from "./utils.mjs";
function x(t) {
  Object.defineProperty(t, "query", {
    get() {
      try {
        if (t.__params) return t.__params;
        if (!(t != null && t.url))
          return {};
        const r = new URL(
          t.url,
          `http://${t.headers.host || "localhost"}`
        ), e = Object.fromEntries(r.searchParams.entries()) ?? {};
        return t.__params = e, e;
      } catch {
        return {};
      }
    }
  });
}
function h(t) {
  const r = t.headers["content-type"];
  return (l.charset(r) || i.encoding || u[0]).toLocaleLowerCase();
}
async function P(t) {
  Object.defineProperty(t, "body", {
    async get() {
      try {
        if (t.__body) return s;
        const r = h(t), e = await y(t, { encoding: r }), s = JSON.parse(e);
        return t.__body = s, s;
      } catch {
      }
      return {};
    }
  });
}
const p = `/**
* @type {import('mmjs-plugin/vite-mock').MockTemplate}
*/
`, g = "parameters[JSON.stringify(req._parsedUrl?.query ?? null)]";
async function $(t, r, e) {
  const { fileExt: s, multiParameter: m } = i;
  if (![".js", ".ts"].includes(s)) return t;
  let n = t;
  try {
    r.includes("json") ? n = t : n = JSON.stringify(t);
  } catch {
    n = t;
  }
  let o = {}, a = n;
  try {
    switch (m) {
      case "get":
        const c = await f(e.filePath);
        Object.assign(o, c.parameters ?? {}, {
          [JSON.stringify(e.query)]: n
        }), a = g;
        break;
    }
    o = JSON.stringify(o, null, 4);
  } catch (c) {
    d.error(`${c} ${e.filePath}`);
  }
  return i._esm ? `export const enabled = true;
export const parameters = ${o};
${p}export const mock = (req, res) => (${a})
` : `exports.enabled = true;
exports.parameters = ${o};
${p}exports.mock = (req, res) => (exports.${a})
`;
}
export {
  h as getCharset,
  $ as transformInnerCodeTempate,
  P as useParseBody,
  x as useParseQueryParams
};
