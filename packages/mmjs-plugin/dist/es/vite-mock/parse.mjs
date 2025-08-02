import { allowCharset as a, serverConfig as s } from "./options.mjs";
import c from "mime-types";
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
  return (c.charset(r) || a[0]).toLocaleLowerCase();
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
const o = `/**
* @type {import('mmjs-plugin/vite-mock').MockTemplate}
*/
`;
function d(t, r) {
  if (![".js", ".ts"].includes(s.fileExt)) return t;
  let e = t;
  try {
    r.includes("json") ? e = t : e = JSON.stringify(t);
  } catch {
    e = t;
  }
  return s._esm ? `export const enabled = true;
${o}export const mock = (req, res) => (${e})
` : `exports.enabled = true;
${o}exports.mock = (req, res) => (${e})
`;
}
export {
  u as getCharset,
  d as transformInnerCodeTempate,
  y as useParseBody,
  l as useParseQueryParams
};
