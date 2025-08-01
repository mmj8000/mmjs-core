import a from "node:querystring";
import { serverConfig as o } from "./options.mjs";
function f(t) {
  if (!(t != null && t.url))
    return Reflect.set(t, "query", {});
  const n = new URL(t.url, `http://${t.headers.host || "localhost"}`);
  return Reflect.set(
    t,
    "query",
    Object.fromEntries(n.searchParams.entries()) ?? {}
  );
}
async function i(t) {
  return new Promise((n, s) => {
    let r = "";
    t.on("data", (e) => r += e), t.on("end", () => {
      try {
        r || n({});
        const e = t.headers["content-type"];
        e != null && e.includes("application/json") ? n(JSON.parse(r)) : e != null && e.includes("application/x-www-form-urlencoded") ? n(a.parse(r)) : n(r);
      } catch (e) {
        s(e);
      }
    }), t.on("error", s);
  });
}
async function l(t) {
  try {
    Reflect.set(t, "body", await i(t));
  } catch {
    Reflect.set(t, "body", {});
  }
}
function d(t) {
  if (![".js", ".ts"].includes(o.fileExt)) return t;
  const n = JSON.stringify(t || {}, void 0, 4);
  return o._esm ? `export const enabled = true;
export const mock = () => (${n})
` : `exports.enabled = true;
exports.mock = () => (${n})
`;
}
export {
  i as parseRequestBody,
  d as transformInnerCodeTempate,
  l as useParseBody,
  f as useParseQueryParams
};
