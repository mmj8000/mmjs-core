import { useParseQueryParams as D, useParseBody as N } from "./parse.mjs";
import g from "node:path";
import { logger as i, getContentTypeByPath as _, colorize as y, getHeaderMimeTypeKey as T, useContentType as $, fileExists as L, findMatchingTemplatePath as H, dynamicImport as O, uniBeforeStrLog as R } from "./utils.mjs";
import { readFileSync as C, createReadStream as b } from "node:fs";
import { useProxyRes as J } from "./proxy.mjs";
import { serverConfig as l, _initServerConfig as B, updateLogLevelState as U, allowExt as A, mockNoEnabledStr as v, notFileErrMsg as W } from "./options.mjs";
import { enhancedFindFiles as z } from "./ndos.mjs";
const F = (r) => (Object.assign(l, B, r ?? {}), U(), {
  name: "vite:mmjs:mock",
  apply: "serve",
  enforce: "post",
  config(t, s) {
    const { scan: m, mockDir: a } = l;
    if (m && s.command === "serve")
      return {
        server: {
          watch: {
            ignored: [
              `**/${a}/**`
              // 可扩展其他规则
            ]
          }
        }
      };
  },
  configureServer(t) {
    const { scan: s, watchDynamicFile: m, apiPrefix: a, mockDir: f } = l, k = t.config.root;
    l.root = k;
    const x = g.join(t.config.root, "package.json"), o = JSON.parse(C(x, "utf-8"));
    if (l._esm = o.type === "module", s)
      return i.info("⏳ Scan Watching..."), J(t);
    const u = g.join(k, f);
    if (m) {
      t.watcher.off(f, c);
      const e = t.watcher.add(u);
      e.on("add", c), e.on("unlink", c), e.on("unlinkDir", c);
    }
    c();
    async function c() {
      try {
        const e = await z(u, {
          recursive: !0,
          exclude: /node_modules|\.git/
        });
        F.__dyMatchPaths = e;
      } catch (e) {
        i.error(e);
      }
    }
    let d = [];
    if (Array.isArray(a))
      d.push(...a);
    else if (a)
      d.push(a);
    else {
      i.error("API Prefix Non-standard");
      return;
    }
    d.forEach((e) => {
      t.middlewares.use(e, I);
    });
  }
});
F.__dyMatchPaths = [];
async function I(r, t, s) {
  var c, d;
  const { root: m, forceMock: a, mockDir: f, timeout: k, downloadExtensions: x } = l;
  let o = "", u = "";
  try {
    let e = function(n, h = _(o)) {
      h && t.setHeader("Content-Type", h), i.success(`✅ Mock Successify ${y(o, "underline")}`), setTimeout(() => {
        t.end(JSON.stringify(n));
      }, k);
    };
    if (r.headers.referer && (u = new URL((c = r.headers) == null ? void 0 : c.referer).searchParams.get("remote") ?? ""), u !== "mock" && !a)
      return i.info("🔒 Browser URL not found mcok Keyword"), s();
    const E = r.headers[T(r)], { encoding: w, fileExt: j } = $(E), M = ((d = r._parsedUrl) == null ? void 0 : d.pathname) ?? "";
    r.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock", t.setHeader("x-custom-response-header", "vite-plugin-mmjs-mock"), o = g.join(m, f, M + j);
    let p;
    if (!A.includes(j)) {
      const n = b(o), h = _(o);
      if (t.setHeader("Content-Type", h || "application/octet-stream"), x.includes(j)) {
        const S = g.basename(o);
        t.setHeader(
          "Content-Disposition",
          `attachment; filename="${S}"`
        ), t.setHeader("download-filename", S);
      }
      n.pipe(t), n.on("error", (S) => {
        i.error(S), n.destroy(), s();
      }), n.on("end", () => {
        i.success(`✅ ReadStream End ${y(o, "underline")}`);
      }), n.on("close", () => {
        n.destroyed || n.destroy();
      });
      return;
    }
    if (!L(o)) {
      const n = g.join(m, f, M);
      o = H(
        F.__dyMatchPaths,
        n
      ) || o;
    }
    if (o.endsWith(".json"))
      try {
        const n = C(o, { encoding: w });
        return e(JSON.parse(n));
      } catch (n) {
        return i.wran(`${n}; ${o}`), s();
      }
    if (p = await O(o), !(p != null && p.enabled))
      throw new Error(v);
    D(r), N(r);
    let P = p.mock(r, t);
    P instanceof Promise && (P = await P), e(P, "application/json");
  } catch (e) {
    (e == null ? void 0 : e.message.indexOf(v)) !== -1 ? i.info(`🔒 Mock Not Enabled! ${y(o, "underline")}`) : W.some((E) => {
      var w;
      return ((w = e == null ? void 0 : e.message) == null ? void 0 : w.indexOf(E)) !== -1;
    }) ? i.wran(`❌ File Not Found! ${y(o, "underline")}`) : console.error(
      R(),
      (e == null ? void 0 : e.message) || e,
      y(o, "underline")
    ), s();
  }
}
export {
  F as createMockServer
};
