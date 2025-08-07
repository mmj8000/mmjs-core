import { useParseQueryParams as T, useParseBody as v } from "./parse.mjs";
import S from "node:path";
import { logger as s, getContentTypeByPath as F, colorize as y, getHeaderMimeTypeKey as C, useContentType as D, fileExists as L, findMatchingTemplatePath as $, dynamicImport as O, uniBeforeStrLog as R } from "./utils.mjs";
import { readFileSync as _, createReadStream as J } from "node:fs";
import { useProxyRes as b } from "./proxy.mjs";
import { serverConfig as l, _initServerConfig as B, updateLogLevelState as U, allowExt as A, mockNoEnabledStr as M, notFileErrMsg as H } from "./options.mjs";
import { enhancedFindFiles as W } from "./ndos.mjs";
const E = (i) => (Object.assign(l, B, i ?? {}), U(), {
  name: "vite:mmjs:mock",
  apply: "serve",
  enforce: "post",
  config(n, a) {
    const { scan: d, mockDir: c } = l;
    if (d && a.command === "serve")
      return {
        server: {
          watch: {
            ignored: [
              `**/${c}/**`
              // 可扩展其他规则
            ]
          }
        }
      };
  },
  configureServer(n) {
    const { scan: a, watchDynamicFile: d, apiPrefix: c, mockDir: u } = l, g = n.config.root;
    l.root = g;
    const e = S.join(n.config.root, "package.json"), k = JSON.parse(_(e, "utf-8"));
    if (l._esm = k.type === "module", a)
      return s.info("⏳ Scan Watching..."), b(n);
    const p = S.join(g, u);
    if (d) {
      n.watcher.off(u, m);
      const r = n.watcher.add(p);
      r.on("add", m), r.on("unlink", m), r.on("unlinkDir", m);
    }
    m();
    async function m() {
      try {
        const r = await W(p, {
          recursive: !0,
          exclude: /node_modules|\.git/
        });
        E.__dyMatchPaths = r;
      } catch (r) {
        s.error(r);
      }
    }
    let o = [];
    if (Array.isArray(c))
      o.push(...c);
    else if (c)
      o.push(c);
    else {
      s.error("API Prefix Non-standard");
      return;
    }
    o.forEach((r) => {
      n.middlewares.use(r, z);
    });
  }
});
E.__dyMatchPaths = [];
async function z(i, n, a) {
  var p, m;
  const { root: d, forceMock: c, mockDir: u, timeout: g } = l;
  let e = "", k = "";
  try {
    let o = function(t, f = F(e)) {
      f && n.setHeader("Content-Type", f), s.success(`✅ Mock Successify ${y(e, "underline")}`), setTimeout(() => {
        n.end(JSON.stringify(t));
      }, g);
    };
    if (i.headers.referer && (k = new URL((p = i.headers) == null ? void 0 : p.referer).searchParams.get("remote") ?? ""), k !== "mock" && !c)
      return s.info("🔒 Browser URL not found mcok Keyword"), a();
    const r = i.headers[C(i)], { encoding: w, fileExt: x } = D(r), j = ((m = i._parsedUrl) == null ? void 0 : m.pathname) ?? "";
    i.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock", e = S.join(d, u, j + x);
    let h;
    if (!A.includes(x)) {
      const t = J(e), f = F(e);
      f && n.setHeader("Content-Type", f), t.pipe(n), t.on("error", (N) => {
        s.error(N), t.destroy(), a();
      }), t.on("end", () => {
        s.success(`✅ ReadStream End ${y(e, "underline")}`);
      }), t.on("close", () => {
        t.destroyed || t.destroy();
      });
      return;
    }
    if (!L(e)) {
      const t = S.join(d, u, j);
      e = $(
        E.__dyMatchPaths,
        t
      ) || e;
    }
    if (e.endsWith(".json"))
      try {
        const t = _(e, { encoding: w });
        return o(JSON.parse(t));
      } catch (t) {
        return s.wran(`${t}; ${e}`), a();
      }
    if (h = await O(e), !(h != null && h.enabled))
      throw new Error(M);
    T(i), v(i);
    let P = h.mock(i, n);
    P instanceof Promise && (P = await P), o(P, "application/json");
  } catch (o) {
    (o == null ? void 0 : o.message.indexOf(M)) !== -1 ? s.info(`🔒 Mock Not Enabled! ${y(e, "underline")}`) : H.some((r) => {
      var w;
      return ((w = o == null ? void 0 : o.message) == null ? void 0 : w.indexOf(r)) !== -1;
    }) ? s.wran(`❌ File Not Found! ${y(e, "underline")}`) : console.error(R(), (o == null ? void 0 : o.message) || o, y(e, "underline")), a();
  }
}
export {
  E as createMockServer
};
