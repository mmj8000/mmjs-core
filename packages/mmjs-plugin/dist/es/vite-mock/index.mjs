import { useParseQueryParams as x, useParseBody as F } from "./parse.mjs";
import d from "node:path";
import { logger as c, colorize as f } from "./utils.mjs";
import { pathToFileURL as _ } from "node:url";
import { readFileSync as b } from "node:fs";
const E = ["no such file", "Cannot find module"], p = "Mock Not enabled";
function D(g) {
  const {
    apiPrefix: h = "/mock",
    forceMock: k = !1,
    mockDir: w = "__mock__",
    fileSuffix: y = ".js",
    timeout: P = 500,
    logLevel: t = ["info", "succes", "wran"]
  } = g ?? {};
  return {
    name: "vite:mmjs:mock",
    apply: "serve",
    enforce: "post",
    configureServer(s) {
      const S = t.includes("wran"), j = t.includes("info"), L = t.includes("succes"), M = s.config.root, N = d.join(s.config.root, "package.json"), v = JSON.parse(b(N, "utf-8"));
      s.middlewares.use(h, async (i, a, m) => {
        var u;
        let n = "", l = "";
        try {
          if (i.headers.referer && (l = new URL((u = i.headers) == null ? void 0 : u.referer).searchParams.get("remote") ?? ""), l !== "mock" && !k) return m();
          x(i), await F(i);
          const e = i._parsedUrl.pathname ?? "";
          i.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock", n = d.join(M, w, e + y);
          let o;
          if (v.type === "module" ? o = await import(_(n).href + "?t=" + Date.now()) : (require.cache && delete require.cache[n], o = await require(n)), !(o != null && o.enabled))
            throw new Error(p);
          a.setHeader("Content-Type", "application/json");
          let r = o.mock(i, a);
          r instanceof Promise && (r = await r), r !== void 0 && (L && c.success(
            `🚀 Mock Successify ${f(n, "underline")}`
          ), setTimeout(() => {
            a.end(JSON.stringify(r));
          }, P));
        } catch (e) {
          (e == null ? void 0 : e.message.indexOf(p)) !== -1 ? j && c.info(
            `❓ Mock Not Enabled! ${f(n, "underline")}`
          ) : E.some((o) => {
            var r;
            return ((r = e == null ? void 0 : e.message) == null ? void 0 : r.indexOf(o)) !== -1;
          }) ? S && c.wran(
            `❌ File Not Found! ${f(n, "underline")}`
          ) : console.error(e), m();
        }
      });
    }
  };
}
export {
  D as createMockServer
};
