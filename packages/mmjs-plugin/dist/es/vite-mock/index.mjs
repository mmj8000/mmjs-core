import { useParseQueryParams as E, useParseBody as F } from "./parse.mjs";
import y from "node:path";
import { logger as s, colorize as l } from "./utils.mjs";
import { pathToFileURL as L } from "node:url";
import { readFileSync as O } from "node:fs";
import { useProxyRes as R } from "./proxy.mjs";
import { serverConfig as c, updateLogLevelState as T } from "./options.mjs";
import U from "mime-types";
const C = ["no such file", "Cannot find module"], w = "Mock Not enabled";
function W(P) {
  const { scan: u, apiPrefix: j, forceMock: S, mockDir: v, timeout: _, fileExt: d } = Object.assign(c, P ?? {});
  return T(), {
    name: "vite:mmjs:mock",
    apply: "serve",
    enforce: "post",
    config(n, a) {
      if (u && a.command === "serve")
        return {
          server: {
            watch: {
              ignored: [
                "**/__mock__/**"
                // 可扩展其他规则
              ]
            }
          }
        };
    },
    configureServer(n) {
      const a = n.config.root;
      c.root = a;
      const x = y.join(n.config.root, "package.json"), M = JSON.parse(O(x, "utf-8"));
      if (c._esm = M.type === "module", u)
        return s.info("⏳ Scan Watching..."), R(n);
      n.middlewares.use(j, async (t, m, p) => {
        var h, k;
        let r = "", g = "";
        try {
          let o = function(N, b = U.contentType(r)) {
            m.setHeader("Content-Type", b), s.success(
              `✅ Mock Successify ${l(r, "underline")}`
            ), setTimeout(() => {
              m.end(JSON.stringify(N));
            }, _);
          };
          if (t.headers.referer && (g = new URL((h = t.headers) == null ? void 0 : h.referer).searchParams.get("remote") ?? ""), g !== "mock" && !S)
            return s.info("🔒 Browser URL not found mcok Keyword"), p();
          E(t), F(t);
          const f = ((k = t._parsedUrl) == null ? void 0 : k.pathname) ?? "";
          t.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock", r = y.join(a, v, f + d);
          let e;
          if (c._esm ? e = await import(L(r).href + "?t=" + Date.now()) : (require.cache && delete require.cache[r], e = await require(r)), d === ".json" && e) {
            o(e);
            return;
          }
          if (!(e != null && e.enabled))
            throw new Error(w);
          let i = e.mock(t, m);
          i instanceof Promise && (i = await i), i !== void 0 && o(i, "application/json");
        } catch (o) {
          (o == null ? void 0 : o.message.indexOf(w)) !== -1 ? s.info(
            `🔒 Mock Not Enabled! ${l(r, "underline")}`
          ) : C.some((f) => {
            var e;
            return ((e = o == null ? void 0 : o.message) == null ? void 0 : e.indexOf(f)) !== -1;
          }) ? s.wran(
            `❌ File Not Found! ${l(r, "underline")}`
          ) : console.error(o), p();
        }
      });
    }
  };
}
export {
  W as createMockServer
};
