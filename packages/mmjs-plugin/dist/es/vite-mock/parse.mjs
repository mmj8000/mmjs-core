import { serverConfig as m, allowCharset as f, notFileErrMsg as y } from "./options.mjs";
import g from "mime-types";
import h from "raw-body";
import { dynamicImport as d, logger as O } from "./utils.mjs";
function $(t) {
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
function _(t) {
  const r = t.headers["content-type"];
  return (g.charset(r) || m.encoding || f[0]).toLocaleLowerCase();
}
async function j(t) {
  Object.defineProperty(t, "body", {
    async get() {
      try {
        if (t.__body) return n;
        const r = _(t), e = await h(t, { encoding: r }), n = JSON.parse(e);
        return t.__body = n, n;
      } catch {
      }
      return {};
    }
  });
}
const l = `/**
* @type {import('mmjs-plugin/vite-mock').MockTemplate}
*/
`, b = "parameters[JSON.stringify(req._parsedUrl?.query ?? null)]";
function w(t) {
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
async function N(t, r, e) {
  const { fileExt: n, multiParameter: u } = m;
  if (![".js", ".ts"].includes(n)) return t;
  let a = t;
  if (r.includes("json")) {
    const { newData: s, tryResolve: i } = w(t);
    a = i ? s : JSON.stringify(t);
  } else
    a = JSON.stringify(t);
  let o = {}, c = "";
  switch (u) {
    case "get":
      try {
        const s = await d(e.filePath);
        Object.assign(o, (s == null ? void 0 : s.parameters) ?? {}, {
          [JSON.stringify(e.query)]: a
        });
      } catch (s) {
        y.some((i) => {
          var p;
          return ((p = s == null ? void 0 : s.message) == null ? void 0 : p.indexOf(i)) !== -1;
        }) || O.error(`${s} ${e.filePath}`);
      }
      c = b;
      break;
    default:
      c = JSON.stringify(a);
      break;
  }
  return o = JSON.stringify(o, null, 4), m._esm ? `export const enabled = true;
export const parameters = ${o};
${l}export const mock = (req, res) => (${c})
` : `exports.enabled = true;
const parameters = ${o};
exports.parameters = parameters;
${l}exports.mock = (req, res) => (${c})
`;
}
export {
  _ as getCharset,
  N as transformInnerCodeTempate,
  j as useParseBody,
  $ as useParseQueryParams
};
