import s from "node:querystring";
import { serverConfig as a } from "./options.mjs";
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
async function c(t) {
  return new Promise((n, o) => {
    let r = "";
    t.on("data", (e) => r += e), t.on("end", () => {
      try {
        r || n({});
        const e = t.headers["content-type"];
        e != null && e.includes("application/json") ? n(JSON.parse(r)) : e != null && e.includes("application/x-www-form-urlencoded") ? n(s.parse(r)) : n(r);
      } catch (e) {
        o(e);
      }
    }), t.on("error", o);
  });
}
async function d(t) {
  try {
    Reflect.set(t, "body", await c(t));
  } catch {
    Reflect.set(t, "body", {});
  }
}
function l(t) {
  const n = JSON.stringify(t || {}, void 0, 4);
  return a._esm ? `export const enabled = true;
export const mock = () => (${n})
` : `exports.enabled = true;
exports.mock = () => (${n})
`;
}
export {
  c as parseRequestBody,
  l as transformInnerCodeTempate,
  d as useParseBody,
  f as useParseQueryParams
};
