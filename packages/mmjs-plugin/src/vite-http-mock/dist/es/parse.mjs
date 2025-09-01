import { serverConfig as m, allowCharset as y, notFileErrMsg as g } from "./options.mjs";
import h from "mime-types";
import d from "raw-body";
import { dynamicImport as O, logger as _ } from "./utils.mjs";
function N(t) {
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
function b(t) {
  const r = t.headers["content-type"];
  return (h.charset(r) || m.encoding || y[0]).toLocaleLowerCase();
}
async function j(t) {
  Object.defineProperty(t, "body", {
    async get() {
      try {
        if (t.__body) return n;
        const r = b(t), e = await d(t, { encoding: r }), n = JSON.parse(e);
        return t.__body = n, n;
      } catch {
      }
      return {};
    }
  });
}
const u = `/**
* @type {import('vite-http-mock').MockTemplate}
*/
`, w = "parameters[JSON.stringify(req._parsedUrl?.query ?? null)]";
function S(t) {
  let r = !1, e = t;
  try {
    e = JSON.parse(t), r = !0;
  } catch {
  }
  return {
    tryResolve: r,
    newData: e
  };
}
async function k(t, r, e) {
  const { fileExt: n, multiParameter: f } = m;
  if (![".js", ".ts"].includes(n)) return t;
  let a = t;
  if (r.includes("json")) {
    const { newData: s, tryResolve: p } = S(t);
    a = p ? s : JSON.stringify(t);
  } else
    a = JSON.stringify(t);
  let o = {}, c = "", i;
  switch (f) {
    case "get":
      try {
        i = await O(e.filePath);
      } catch (s) {
        g.some((p) => {
          var l;
          return ((l = s == null ? void 0 : s.message) == null ? void 0 : l.indexOf(p)) !== -1;
        }) || _.error(`${s} ${e.filePath}`);
      }
      Object.assign(o, (i == null ? void 0 : i.parameters) ?? {}, {
        [JSON.stringify(e.query)]: a
      }), c = w;
      break;
    default:
      c = JSON.stringify(a);
      break;
  }
  return o = JSON.stringify(o, null, 4), m._esm ? `export const enabled = true;
export const parameters = ${o};
${u}export const mock = (req, res) => (${c})
` : `exports.enabled = true;
const parameters = ${o};
exports.parameters = parameters;
${u}exports.mock = (req, res) => (${c})
`;
}
export {
  b as getCharset,
  k as transformInnerCodeTempate,
  j as useParseBody,
  N as useParseQueryParams
};
