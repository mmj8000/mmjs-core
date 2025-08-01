import { useParseQueryParams as v, useParseBody as E } from "./parse.mjs";
import h from "node:path";
import { logger as i, colorize as m } from "./utils.mjs";
import { pathToFileURL as F } from "node:url";
import { readFileSync as L } from "node:fs";
import { useProxyRes as O } from "./proxy.mjs";
import { serverConfig as f, updateLogLevelState as R } from "./options.mjs";
import T from "mime-types";
const U = ["no such file", "Cannot find module"], k = "Mock Not enabled";
function K(y) {
  const { scan: w, apiPrefix: P, forceMock: S, mockDir: j, timeout: x, fileExt: l } = Object.assign(f, y ?? {});
  return R(), {
    name: "vite:mmjs:mock",
    apply: "serve",
    enforce: "post",
    configureServer(a) {
      const M = a.config.root, N = h.join(a.config.root, "package.json"), b = JSON.parse(L(N, "utf-8"));
      if (f._esm = b.type === "module", w)
        return i.info("⏳ Scan Watching..."), O(a);
      a.middlewares.use(P, async (t, s, u) => {
        var p, g;
        let r = "", d = "";
        try {
          let e = function() {
            s.setHeader("Content-Type", T.contentType(r)), i.success(
              `✅ Mock Successify ${m(r, "underline")}`
            ), setTimeout(() => {
              s.end(JSON.stringify(n));
            }, x);
          };
          if (t.headers.referer && (d = new URL((p = t.headers) == null ? void 0 : p.referer).searchParams.get("remote") ?? ""), d !== "mock" && !S)
            return i.info("🔒 Browser URL not found mcok Keyword"), u();
          v(t), await E(t);
          const c = ((g = t._parsedUrl) == null ? void 0 : g.pathname) ?? "";
          t.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock", r = h.join(M, j, c + l);
          let o;
          if (f._esm ? o = await import(F(r).href + "?t=" + Date.now()) : (require.cache && delete require.cache[r], o = await require(r)), l === ".json" && o) {
            e();
            return;
          }
          if (!(o != null && o.enabled))
            throw new Error(k);
          let n = o.mock(t, s);
          n instanceof Promise && (n = await n), n !== void 0 && e();
        } catch (e) {
          (e == null ? void 0 : e.message.indexOf(k)) !== -1 ? i.info(
            `🔒 Mock Not Enabled! ${m(r, "underline")}`
          ) : U.some((c) => {
            var o;
            return ((o = e == null ? void 0 : e.message) == null ? void 0 : o.indexOf(c)) !== -1;
          }) ? i.wran(
            `❌ File Not Found! ${m(r, "underline")}`
          ) : console.error(e), u();
        }
      });
    }
  };
}
export {
  K as createMockServer
};
