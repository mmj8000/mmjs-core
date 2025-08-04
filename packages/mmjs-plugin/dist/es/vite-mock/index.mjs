import { useParseQueryParams as J, useParseBody as U } from "./parse.mjs";
import y from "node:path";
import { logger as r, getContentTypeByPath as L, colorize as g, getHeaderMimeTypeKey as B, useContentType as H, fileExists as W, findMatchingTemplatePath as K, uniBeforeStrLog as z } from "./utils.mjs";
import { pathToFileURL as Q } from "node:url";
import { readFileSync as C, createReadStream as A } from "node:fs";
import { useProxyRes as G } from "./proxy.mjs";
import { serverConfig as c, _initServerConfig as I, updateLogLevelState as V, allowExt as X } from "./options.mjs";
import { enhancedFindFiles as Y } from "./ndos.mjs";
const Z = ["no such file", "Cannot find module"], D = "Mock Not enabled", E = (N) => (Object.assign(c, I, N ?? {}), V(), {
  name: "vite:mmjs:mock",
  apply: "serve",
  enforce: "post",
  config(i, k) {
    const { scan: w, mockDir: P } = c;
    if (w && k.command === "serve")
      return {
        server: {
          watch: {
            ignored: [
              `**/${P}/**`
              // 可扩展其他规则
            ]
          }
        }
      };
  },
  configureServer(i) {
    const { scan: k, watchDynamicFile: w, apiPrefix: P, forceMock: R, mockDir: f, timeout: $ } = c, l = i.config.root;
    c.root = l;
    const v = y.join(i.config.root, "package.json"), O = JSON.parse(C(v, "utf-8"));
    if (c._esm = O.type === "module", k)
      return r.info("⏳ Scan Watching..."), G(i);
    const F = y.join(l, f);
    if (w) {
      i.watcher.off(f, m);
      const e = i.watcher.add(F);
      e.on("add", m), e.on("unlink", m), e.on("unlinkDir", m);
    }
    m();
    async function m() {
      try {
        const e = await Y(F, {
          recursive: !0,
          exclude: /node_modules|\.git/
        });
        E.__dyMatchPaths = e;
      } catch (e) {
        r.error(e);
      }
    }
    i.middlewares.use(P, async (e, d, u) => {
      var x, M;
      let o = "", j = "";
      try {
        let n = function(t, a = L(o)) {
          a && d.setHeader("Content-Type", a), r.success(
            `✅ Mock Successify ${g(o, "underline")}`
          ), setTimeout(() => {
            d.end(JSON.stringify(t));
          }, $);
        };
        if (e.headers.referer && (j = new URL((x = e.headers) == null ? void 0 : x.referer).searchParams.get("remote") ?? ""), j !== "mock" && !R)
          return r.info("🔒 Browser URL not found mcok Keyword"), u();
        const S = e.headers[B(e)], { encoding: h, fileExt: _ } = H(S), T = ((M = e._parsedUrl) == null ? void 0 : M.pathname) ?? "";
        e.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock", o = y.join(l, f, T + _);
        let s;
        if (!X.includes(_)) {
          const t = A(o), a = L(o);
          a && d.setHeader("Content-Type", a), t.pipe(d), t.on("error", (b) => {
            r.error(b), t.destroy(), u();
          }), t.on("end", () => {
            r.success(
              `✅ ReadStream End ${g(o, "underline")}`
            );
          }), t.on("close", () => {
            t.destroyed || t.destroy();
          });
          return;
        }
        if (!W(o)) {
          const t = y.join(l, f, T);
          o = K(E.__dyMatchPaths, t) || o;
        }
        if (o.endsWith(".json"))
          try {
            const t = C(o, { encoding: h });
            return n(JSON.parse(t));
          } catch (t) {
            return r.wran(`${t}; ${o}`), u();
          }
        if (c._esm ? s = await import(Q(o).href + "?t=" + Date.now()) : (require.cache && delete require.cache[o], s = await require(o)), !(s != null && s.enabled))
          throw new Error(D);
        J(e), U(e);
        let p = s.mock(e, d);
        p instanceof Promise && (p = await p), n(p, "application/json");
      } catch (n) {
        (n == null ? void 0 : n.message.indexOf(D)) !== -1 ? r.info(
          `🔒 Mock Not Enabled! ${g(o, "underline")}`
        ) : Z.some((S) => {
          var h;
          return ((h = n == null ? void 0 : n.message) == null ? void 0 : h.indexOf(S)) !== -1;
        }) ? r.wran(
          `❌ File Not Found! ${g(o, "underline")}`
        ) : console.error(z(), (n == null ? void 0 : n.message) || n), u();
      }
    });
  }
});
E.__dyMatchPaths = [];
export {
  E as createMockServer
};
