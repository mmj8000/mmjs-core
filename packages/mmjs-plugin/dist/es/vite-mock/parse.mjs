import { serverConfig as o, allowCharset as c } from "./options.mjs";
import a from "mime-types";
import i from "raw-body";
function l(t) {
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
function u(t) {
  const r = t.headers["content-type"];
  return (a.charset(r) || o.encoding || c[0]).toLocaleLowerCase();
}
async function y(t) {
  Object.defineProperty(t, "body", {
    async get() {
      try {
        if (t.__body) return n;
        const r = u(t), e = await i(t, { encoding: r }), n = JSON.parse(e);
        return t.__body = n, n;
      } catch {
      }
      return {};
    }
  });
}
const s = `/**
* @type {import('mmjs-plugin/vite-mock').MockTemplate}
*/
`;
function d(t, r) {
  if (![".js", ".ts"].includes(o.fileExt)) return t;
  let e = t;
  try {
    r.includes("json") ? e = t : e = JSON.stringify(t);
  } catch {
    e = t;
  }
  return o._esm ? `export const enabled = true;
${s}export const mock = (req, res) => (${e})
` : `exports.enabled = true;
${s}exports.mock = (req, res) => (${e})
`;
}
export {
  u as getCharset,
  d as transformInnerCodeTempate,
  y as useParseBody,
  l as useParseQueryParams
};
