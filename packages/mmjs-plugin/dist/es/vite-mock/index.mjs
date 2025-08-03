import { useParseQueryParams as U, useParseBody as B } from "./parse.mjs";
import u from "node:path";
import { logger as r, getContentTypeByPath as C, colorize as g, useContentType as J, fileExists as H, findMatchingTemplatePath as W } from "./utils.mjs";
import { pathToFileURL as z } from "node:url";
import { readFileSync as L, createReadStream as K } from "node:fs";
import { useProxyRes as Q } from "./proxy.mjs";
import { serverConfig as c, _initServerConfig as A, updateLogLevelState as G, allowExt as I } from "./options.mjs";
import { enhancedFindFiles as V } from "./ndos.mjs";
const X = ["no such file", "Cannot find module"], N = "Mock Not enabled", _ = (R) => (Object.assign(c, A, R ?? {}), G(), {
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
    const { scan: k, apiPrefix: w, forceMock: P, mockDir: m, timeout: $ } = c, d = i.config.root;
    c.root = d;
    const v = u.join(i.config.root, "package.json"), D = JSON.parse(L(v, "utf-8"));
    if (c._esm = D.type === "module", k)
      return r.info("⏳ Scan Watching..."), Q(i);
    const O = u.join(d, m);
    i.watcher.off(m, f);
    const S = i.watcher.add(O);
    S.on("add", f), S.on("unlink", f), S.on("unlinkDir", f), f();
    async function f() {
      try {
        const t = await V(
          u.join(d, m),
          {
            recursive: !0,
            exclude: /node_modules|\.git/
          }
        );
        _.__dyMatchPaths = t;
      } catch (t) {
        r.error(t);
      }
    }
    i.middlewares.use(w, async (t, l, p) => {
      var M, x;
      let e = "", E = "";
      try {
        let n = function(o, s = C(e)) {
          s && l.setHeader("Content-Type", s), r.success(
            `✅ Mock Successify ${g(e, "underline")}`
          ), setTimeout(() => {
            l.end(JSON.stringify(o));
          }, $);
        };
        if (t.headers.referer && (E = new URL((M = t.headers) == null ? void 0 : M.referer).searchParams.get("remote") ?? ""), E !== "mock" && !P)
          return r.info("🔒 Browser URL not found mcok Keyword"), p();
        const j = t.headers["content-type"], { encoding: h, fileExt: F } = J(j), T = ((x = t._parsedUrl) == null ? void 0 : x.pathname) ?? "";
        t.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock", e = u.join(d, m, T + F);
        let a;
        if (!I.includes(F)) {
          const o = K(e), s = C(e);
          s && l.setHeader("Content-Type", s), o.pipe(l), o.on("error", (b) => {
            r.error(b), o.destroy(), p();
          }), o.on("end", () => {
            r.success(
              `✅ ReadStream End ${g(e, "underline")}`
            );
          }), o.on("close", () => {
            o.destroyed || o.destroy();
          });
          return;
        }
        if (!H(e)) {
          const o = u.join(d, m, T);
          e = W(_.__dyMatchPaths, o) || e;
        }
        if (F === ".json")
          try {
            const o = L(e, { encoding: h });
            return n(JSON.parse(o));
          } catch (o) {
            return r.wran(`${o}; ${e}`), p();
          }
        if (c._esm ? a = await import(z(e).href + "?t=" + Date.now()) : (require.cache && delete require.cache[e], a = await require(e)), !(a != null && a.enabled))
          throw new Error(N);
        U(t), B(t);
        let y = a.mock(t, l);
        y instanceof Promise && (y = await y), n(y, "application/json");
      } catch (n) {
        (n == null ? void 0 : n.message.indexOf(N)) !== -1 ? r.info(
          `🔒 Mock Not Enabled! ${g(e, "underline")}`
        ) : X.some((j) => {
          var h;
          return ((h = n == null ? void 0 : n.message) == null ? void 0 : h.indexOf(j)) !== -1;
        }) ? r.wran(
          `❌ File Not Found! ${g(e, "underline")}`
        ) : console.error(n), p();
      }
    });
  }
});
_.__dyMatchPaths = [];
export {
  _ as createMockServer
};
