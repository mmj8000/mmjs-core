import { useParseQueryParams as v, useParseBody as E } from "./parse.mjs";
import k from "node:path";
import { logger as i, colorize as f } from "./utils.mjs";
import { pathToFileURL as F } from "node:url";
import { readFileSync as L } from "node:fs";
import { useProxyRes as O } from "./proxy.mjs";
import { serverConfig as s, updateLogLevelState as R } from "./options.mjs";
import T from "mime-types";
const U = ["no such file", "Cannot find module"], y = "Mock Not enabled";
function K(w) {
  const { scan: P, apiPrefix: S, forceMock: j, mockDir: x, timeout: M, fileExt: l } = Object.assign(s, w ?? {});
  return R(), {
    name: "vite:mmjs:mock",
    apply: "serve",
    enforce: "post",
    configureServer(a) {
      const u = a.config.root;
      s.root = u;
      const N = k.join(a.config.root, "package.json"), b = JSON.parse(L(N, "utf-8"));
      if (s._esm = b.type === "module", P)
        return i.info("⏳ Scan Watching..."), O(a);
      a.middlewares.use(S, async (t, c, d) => {
        var g, h;
        let r = "", p = "";
        try {
          let e = function() {
            c.setHeader("Content-Type", T.contentType(r)), i.success(
              `✅ Mock Successify ${f(r, "underline")}`
            ), setTimeout(() => {
              c.end(JSON.stringify(n));
            }, M);
          };
          if (t.headers.referer && (p = new URL((g = t.headers) == null ? void 0 : g.referer).searchParams.get("remote") ?? ""), p !== "mock" && !j)
            return i.info("🔒 Browser URL not found mcok Keyword"), d();
          v(t), await E(t);
          const m = ((h = t._parsedUrl) == null ? void 0 : h.pathname) ?? "";
          t.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock", r = k.join(u, x, m + l);
          let o;
          if (s._esm ? o = await import(F(r).href + "?t=" + Date.now()) : (require.cache && delete require.cache[r], o = await require(r)), l === ".json" && o) {
            e();
            return;
          }
          if (!(o != null && o.enabled))
            throw new Error(y);
          let n = o.mock(t, c);
          n instanceof Promise && (n = await n), n !== void 0 && e();
        } catch (e) {
          (e == null ? void 0 : e.message.indexOf(y)) !== -1 ? i.info(
            `🔒 Mock Not Enabled! ${f(r, "underline")}`
          ) : U.some((m) => {
            var o;
            return ((o = e == null ? void 0 : e.message) == null ? void 0 : o.indexOf(m)) !== -1;
          }) ? i.wran(
            `❌ File Not Found! ${f(r, "underline")}`
          ) : console.error(e), d();
        }
      });
    }
  };
}
export {
  K as createMockServer
};
