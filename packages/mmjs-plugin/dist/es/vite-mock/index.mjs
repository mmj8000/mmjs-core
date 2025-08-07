import { useParseQueryParams as C, useParseBody as T } from "./parse.mjs";
import S from "node:path";
import { logger as s, getContentTypeByPath as j, colorize as y, getHeaderMimeTypeKey as v, useContentType as D, fileExists as L, findMatchingTemplatePath as $, dynamicImport as O, uniBeforeStrLog as R } from "./utils.mjs";
import { readFileSync as _, createReadStream as b } from "node:fs";
import { useProxyRes as J } from "./proxy.mjs";
import { serverConfig as l, _initServerConfig as B, updateLogLevelState as U, allowExt as A } from "./options.mjs";
import { enhancedFindFiles as H } from "./ndos.mjs";
const W = ["no such file", "Cannot find module"], F = "Mock Not enabled", E = (i) => (Object.assign(l, B, i ?? {}), U(), {
  name: "vite:mmjs:mock",
  apply: "serve",
  enforce: "post",
  config(n, a) {
    const { scan: m, mockDir: c } = l;
    if (m && a.command === "serve")
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
    const { scan: a, watchDynamicFile: m, apiPrefix: c, mockDir: u } = l, g = n.config.root;
    l.root = g;
    const e = S.join(n.config.root, "package.json"), k = JSON.parse(_(e, "utf-8"));
    if (l._esm = k.type === "module", a)
      return s.info("⏳ Scan Watching..."), J(n);
    const p = S.join(g, u);
    if (m) {
      n.watcher.off(u, d);
      const r = n.watcher.add(p);
      r.on("add", d), r.on("unlink", d), r.on("unlinkDir", d);
    }
    d();
    async function d() {
      try {
        const r = await H(p, {
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
  var p, d;
  const { root: m, forceMock: c, mockDir: u, timeout: g } = l;
  let e = "", k = "";
  try {
    let o = function(t, f = j(e)) {
      f && n.setHeader("Content-Type", f), s.success(`✅ Mock Successify ${y(e, "underline")}`), setTimeout(() => {
        n.end(JSON.stringify(t));
      }, g);
    };
    if (i.headers.referer && (k = new URL((p = i.headers) == null ? void 0 : p.referer).searchParams.get("remote") ?? ""), k !== "mock" && !c)
      return s.info("🔒 Browser URL not found mcok Keyword"), a();
    const r = i.headers[v(i)], { encoding: w, fileExt: x } = D(r), M = ((d = i._parsedUrl) == null ? void 0 : d.pathname) ?? "";
    i.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock", e = S.join(m, u, M + x);
    let h;
    if (!A.includes(x)) {
      const t = b(e), f = j(e);
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
      const t = S.join(m, u, M);
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
      throw new Error(F);
    C(i), T(i);
    let P = h.mock(i, n);
    P instanceof Promise && (P = await P), o(P, "application/json");
  } catch (o) {
    (o == null ? void 0 : o.message.indexOf(F)) !== -1 ? s.info(`🔒 Mock Not Enabled! ${y(e, "underline")}`) : W.some((r) => {
      var w;
      return ((w = o == null ? void 0 : o.message) == null ? void 0 : w.indexOf(r)) !== -1;
    }) ? s.wran(`❌ File Not Found! ${y(e, "underline")}`) : console.error(R(), (o == null ? void 0 : o.message) || o, y(e, "underline")), a();
  }
}
export {
  E as createMockServer
};
