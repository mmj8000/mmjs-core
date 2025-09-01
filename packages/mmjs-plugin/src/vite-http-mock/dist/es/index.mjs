import { useParseQueryParams as v, useParseBody as A } from "./parse.mjs";
import w from "node:path";
import { logger as i, getContentTypeByPath as C, colorize as u, getHeaderMimeTypeKey as D, useContentType as N, fileExists as O, findMatchingTemplatePath as T, dynamicImport as L, uniBeforeStrLog as R } from "./utils.mjs";
import { readFileSync as $, createReadStream as b } from "node:fs";
import { useProxyRes as J, useResponseAppend as B } from "./proxy.mjs";
import { serverConfig as p, _initServerConfig as U, updateLogLevelState as W, allowExt as z, mockNoEnabledStr as H, notFileErrMsg as I } from "./options.mjs";
import { enhancedFindFiles as K } from "./ndos.mjs";
const F = (s) => (Object.assign(p, U, s ?? {}), W(), {
  name: "vite:http:mock",
  apply: "serve",
  enforce: "post",
  config(o, a) {
    const { scan: l, mockDir: c } = p;
    if (l && a.command === "serve")
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
  configureServer(o) {
    const { scan: a, watchDynamicFile: l, apiPrefix: c, mockDir: h } = p, k = o.config.root;
    p.root = k;
    const x = w.join(o.config.root, "package.json"), P = JSON.parse($(x, "utf-8"));
    if (p._esm = P.type === "module", a)
      return i.info("⏳ Scan Watching..."), J(o);
    const e = w.join(k, h);
    if (l) {
      o.watcher.off(h, d);
      const r = o.watcher.add(e);
      r.on("add", d), r.on("unlink", d), r.on("unlinkDir", d);
    }
    d();
    async function d() {
      try {
        const r = await K(e, {
          recursive: !0,
          exclude: /node_modules|\.git/
        });
        F.__dyMatchPaths = r;
      } catch (r) {
        i.error(r);
      }
    }
    let m = [];
    if (Array.isArray(c))
      m.push(...c);
    else if (c)
      m.push(c);
    else {
      i.error("API Prefix Non-standard");
      return;
    }
    m.forEach((r) => {
      o.middlewares.use(r, Q);
    });
  }
});
F.__dyMatchPaths = [];
async function Q(s, o, a) {
  var m, r;
  const { root: l, forceMock: c, mockDir: h, timeout: k, downloadExtensions: x, allowOrigin: P } = p;
  let e = "", d = "";
  try {
    let n = function(t, g = C(e)) {
      if (o.writableEnded)
        return i.success(
          `✅ Mock Successify ${u(e, "underline")}`
        );
      try {
        g && o.setHeader("Content-Type", g), setTimeout(() => {
          o.end(JSON.stringify(t)), i.success(
            `✅ Mock Successify ${u(e, "underline")}`
          );
        }, k);
      } catch (f) {
        i.error(f);
      }
    };
    if (s.headers.referer && (d = new URL((m = s.headers) == null ? void 0 : m.referer).searchParams.get("remote") ?? ""), d !== "mock" && !c)
      return i.info("🔒 Browser URL not found mcok Keyword"), a();
    const M = s.headers[D(s)], { encoding: S, fileExt: j } = N(M), _ = ((r = s._parsedUrl) == null ? void 0 : r.pathname) ?? "";
    s.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock", o.setHeader("x-custom-response-header", "vite-plugin-mmjs-mock"), o.setHeader("Access-Control-Allow-Origin", P), o.setHeader("Access-Control-Allow-Headers", P), e = w.join(l, h, _ + j);
    let y;
    if (!z.includes(j)) {
      const t = b(e), g = C(e);
      if (o.setHeader("Content-Type", g || "application/octet-stream"), x.includes(j)) {
        const f = w.basename(e);
        o.setHeader(
          "Content-Disposition",
          `attachment; filename="${f}"`
        ), o.setHeader("download-filename", f);
      }
      t.pipe(o), t.on("error", (f) => {
        i.error(f), t.destroy(), a();
      }), t.on("end", () => {
        i.success(`✅ ReadStream End ${u(e, "underline")}`);
      }), t.on("close", () => {
        t.destroyed || t.destroy();
      });
      return;
    }
    if (!O(e)) {
      const t = w.join(l, h, _);
      e = T(
        F.__dyMatchPaths,
        t
      ) || e;
    }
    if (e.endsWith(".json"))
      try {
        const t = $(e, { encoding: S });
        return n(JSON.parse(t));
      } catch (t) {
        return i.wran(`${t}; ${e}`), a();
      }
    if (y = await L(e), !(y != null && y.enabled))
      throw new Error(H);
    v(s), A(s), B(o);
    let E = y.mock(s, o);
    E instanceof Promise && (E = await E), n(E, "application/json");
  } catch (n) {
    (n == null ? void 0 : n.message.indexOf(H)) !== -1 ? i.info(`🔒 Mock Not Enabled! ${u(e, "underline")}`) : I.some((M) => {
      var S;
      return ((S = n == null ? void 0 : n.message) == null ? void 0 : S.indexOf(M)) !== -1;
    }) ? i.wran(`❌ File Not Found! ${u(e, "underline")}`) : console.error(
      R(),
      (n == null ? void 0 : n.message) || n,
      u(e, "underline")
    ), a();
  }
}
export {
  F as default
};
