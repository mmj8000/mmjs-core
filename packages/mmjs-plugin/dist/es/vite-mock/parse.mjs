import o from "node:querystring";
function i(t) {
  if (!(t != null && t.url))
    return Reflect.set(t, "query", {});
  const e = new URL(t.url, `http://${t.headers.host || "localhost"}`);
  return Reflect.set(t, "query", Object.fromEntries(e.searchParams.entries()) ?? {});
}
async function r(t) {
  return new Promise((e, n) => {
    let a = "";
    t.on("data", (s) => a += s), t.on("end", () => {
      try {
        a || e({});
        const s = t.headers["content-type"];
        s != null && s.includes("application/json") ? e(JSON.parse(a)) : s != null && s.includes("application/x-www-form-urlencoded") ? e(o.parse(a)) : e(a);
      } catch (s) {
        n(s);
      }
    }), t.on("error", n);
  });
}
async function u(t) {
  try {
    Reflect.set(t, "body", await r(t));
  } catch {
    Reflect.set(t, "body", {});
  }
}
export {
  r as parseRequestBody,
  u as useParseBody,
  i as useParseQueryParams
};
