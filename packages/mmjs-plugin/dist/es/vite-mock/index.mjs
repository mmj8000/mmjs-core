import { useParseQueryParams as B, useParseBody as A } from "./parse.mjs";
import g from "node:path";
import { logger as r, getContentTypeByPath as C, colorize as k, getHeaderMimeTypeKey as H, useContentType as W, fileExists as z, findMatchingTemplatePath as K, uniBeforeStrLog as I } from "./utils.mjs";
import { pathToFileURL as Q } from "node:url";
import { readFileSync as L, createReadStream as G } from "node:fs";
import { useProxyRes as V } from "./proxy.mjs";
import { serverConfig as m, _initServerConfig as X, updateLogLevelState as Y, allowExt as Z } from "./options.mjs";
import { enhancedFindFiles as q } from "./ndos.mjs";
const ee = ["no such file", "Cannot find module"], v = "Mock Not enabled", x = (D) => (Object.assign(m, X, D ?? {}), Y(), {
  name: "vite:mmjs:mock",
  apply: "serve",
  enforce: "post",
  config(i, w) {
    const { scan: P, mockDir: s } = m;
    if (P && w.command === "serve")
      return {
        server: {
          watch: {
            ignored: [
              `**/${s}/**`
              // 可扩展其他规则
            ]
          }
        }
      };
  },
  configureServer(i) {
    const { scan: w, watchDynamicFile: P, apiPrefix: s, forceMock: R, mockDir: l, timeout: $ } = m, u = i.config.root;
    m.root = u;
    const O = g.join(i.config.root, "package.json"), b = JSON.parse(L(O, "utf-8"));
    if (m._esm = b.type === "module", w)
      return r.info("⏳ Scan Watching..."), V(i);
    const F = g.join(u, l);
    if (P) {
      i.watcher.off(l, d);
      const e = i.watcher.add(F);
      e.on("add", d), e.on("unlink", d), e.on("unlinkDir", d);
    }
    d();
    async function d() {
      try {
        const e = await q(F, {
          recursive: !0,
          exclude: /node_modules|\.git/
        });
        x.__dyMatchPaths = e;
      } catch (e) {
        r.error(e);
      }
    }
    let S = [];
    if (Array.isArray(s))
      S.push(...s);
    else if (s)
      S.push(s);
    else {
      r.error("API Prefix Non-standard");
      return;
    }
    S.forEach((e) => {
      i.middlewares.use(e, J);
    });
    async function J(e, f, h) {
      var j, _;
      let o = "", M = "";
      try {
        let n = function(t, c = C(o)) {
          c && f.setHeader("Content-Type", c), r.success(
            `✅ Mock Successify ${k(o, "underline")}`
          ), setTimeout(() => {
            f.end(JSON.stringify(t));
          }, $);
        };
        if (e.headers.referer && (M = new URL((j = e.headers) == null ? void 0 : j.referer).searchParams.get("remote") ?? ""), M !== "mock" && !R)
          return r.info("🔒 Browser URL not found mcok Keyword"), h();
        const E = e.headers[H(e)], { encoding: p, fileExt: N } = W(E), T = ((_ = e._parsedUrl) == null ? void 0 : _.pathname) ?? "";
        e.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock", o = g.join(u, l, T + N);
        let a;
        if (!Z.includes(N)) {
          const t = G(o), c = C(o);
          c && f.setHeader("Content-Type", c), t.pipe(f), t.on("error", (U) => {
            r.error(U), t.destroy(), h();
          }), t.on("end", () => {
            r.success(
              `✅ ReadStream End ${k(o, "underline")}`
            );
          }), t.on("close", () => {
            t.destroyed || t.destroy();
          });
          return;
        }
        if (!z(o)) {
          const t = g.join(u, l, T);
          o = K(
            x.__dyMatchPaths,
            t
          ) || o;
        }
        if (o.endsWith(".json"))
          try {
            const t = L(o, { encoding: p });
            return n(JSON.parse(t));
          } catch (t) {
            return r.wran(`${t}; ${o}`), h();
          }
        if (m._esm ? a = await import(Q(o).href + "?t=" + Date.now()) : (require.cache && delete require.cache[o], a = await require(o)), !(a != null && a.enabled))
          throw new Error(v);
        B(e), A(e);
        let y = a.mock(e, f);
        y instanceof Promise && (y = await y), n(y, "application/json");
      } catch (n) {
        (n == null ? void 0 : n.message.indexOf(v)) !== -1 ? r.info(
          `🔒 Mock Not Enabled! ${k(o, "underline")}`
        ) : ee.some((E) => {
          var p;
          return ((p = n == null ? void 0 : n.message) == null ? void 0 : p.indexOf(E)) !== -1;
        }) ? r.wran(
          `❌ File Not Found! ${k(o, "underline")}`
        ) : console.error(I(), (n == null ? void 0 : n.message) || n), h();
      }
    }
  }
});
x.__dyMatchPaths = [];
export {
  x as createMockServer
};
