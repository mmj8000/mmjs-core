import { useParseQueryParams as J, useParseBody as U } from "./parse.mjs";
import y from "node:path";
import { logger as r, getContentTypeByPath as C, colorize as g, useContentType as B, fileExists as W, findMatchingTemplatePath as H } from "./utils.mjs";
import { pathToFileURL as z } from "node:url";
import { readFileSync as D, createReadStream as K } from "node:fs";
import { useProxyRes as Q } from "./proxy.mjs";
import { serverConfig as c, _initServerConfig as A, updateLogLevelState as G, allowExt as I } from "./options.mjs";
import { enhancedFindFiles as V } from "./ndos.mjs";
const X = ["no such file", "Cannot find module"], L = "Mock Not enabled", E = (N) => (Object.assign(c, A, N ?? {}), G(), {
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
    const v = y.join(i.config.root, "package.json"), O = JSON.parse(D(v, "utf-8"));
    if (c._esm = O.type === "module", k)
      return r.info("⏳ Scan Watching..."), Q(i);
    const F = y.join(l, f);
    if (w) {
      i.watcher.off(f, m);
      const o = i.watcher.add(F);
      o.on("add", m), o.on("unlink", m), o.on("unlinkDir", m);
    }
    m();
    async function m() {
      try {
        const o = await V(F, {
          recursive: !0,
          exclude: /node_modules|\.git/
        });
        E.__dyMatchPaths = o;
      } catch (o) {
        r.error(o);
      }
    }
    i.middlewares.use(P, async (o, d, u) => {
      var x, _;
      let e = "", j = "";
      try {
        let n = function(t, a = C(e)) {
          a && d.setHeader("Content-Type", a), r.success(
            `✅ Mock Successify ${g(e, "underline")}`
          ), setTimeout(() => {
            d.end(JSON.stringify(t));
          }, $);
        };
        if (o.headers.referer && (j = new URL((x = o.headers) == null ? void 0 : x.referer).searchParams.get("remote") ?? ""), j !== "mock" && !R)
          return r.info("🔒 Browser URL not found mcok Keyword"), u();
        const S = o.headers["content-type"], { encoding: h, fileExt: M } = B(S), T = ((_ = o._parsedUrl) == null ? void 0 : _.pathname) ?? "";
        o.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock", e = y.join(l, f, T + M);
        let s;
        if (!I.includes(M)) {
          const t = K(e), a = C(e);
          a && d.setHeader("Content-Type", a), t.pipe(d), t.on("error", (b) => {
            r.error(b), t.destroy(), u();
          }), t.on("end", () => {
            r.success(
              `✅ ReadStream End ${g(e, "underline")}`
            );
          }), t.on("close", () => {
            t.destroyed || t.destroy();
          });
          return;
        }
        if (!W(e)) {
          const t = y.join(l, f, T);
          e = H(E.__dyMatchPaths, t) || e;
        }
        if (e.endsWith(".json"))
          try {
            const t = D(e, { encoding: h });
            return n(JSON.parse(t));
          } catch (t) {
            return r.wran(`${t}; ${e}`), u();
          }
        if (c._esm ? s = await import(z(e).href + "?t=" + Date.now()) : (require.cache && delete require.cache[e], s = await require(e)), !(s != null && s.enabled))
          throw new Error(L);
        J(o), U(o);
        let p = s.mock(o, d);
        p instanceof Promise && (p = await p), n(p, "application/json");
      } catch (n) {
        (n == null ? void 0 : n.message.indexOf(L)) !== -1 ? r.info(
          `🔒 Mock Not Enabled! ${g(e, "underline")}`
        ) : X.some((S) => {
          var h;
          return ((h = n == null ? void 0 : n.message) == null ? void 0 : h.indexOf(S)) !== -1;
        }) ? r.wran(
          `❌ File Not Found! ${g(e, "underline")}`
        ) : console.error(n), u();
      }
    });
  }
});
E.__dyMatchPaths = [];
export {
  E as createMockServer
};
