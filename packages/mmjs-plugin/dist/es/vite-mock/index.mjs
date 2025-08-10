import { useParseQueryParams as C, useParseBody as D } from "./parse.mjs";
import k from "node:path";
import { logger as r, getContentTypeByPath as _, colorize as f, getHeaderMimeTypeKey as N, useContentType as T, fileExists as L, findMatchingTemplatePath as b, dynamicImport as H, uniBeforeStrLog as O } from "./utils.mjs";
import { readFileSync as v, createReadStream as R } from "node:fs";
import { useProxyRes as J } from "./proxy.mjs";
import { serverConfig as u, _initServerConfig as B, updateLogLevelState as U, allowExt as A, mockNoEnabledStr as $, notFileErrMsg as W } from "./options.mjs";
import { enhancedFindFiles as z } from "./ndos.mjs";
const M = (i) => (Object.assign(u, B, i ?? {}), U(), {
  name: "vite:mmjs:mock",
  apply: "serve",
  enforce: "post",
  config(o, s) {
    const { scan: d, mockDir: a } = u;
    if (d && s.command === "serve")
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
  configureServer(o) {
    const { scan: s, watchDynamicFile: d, apiPrefix: a, mockDir: p } = u, w = o.config.root;
    u.root = w;
    const E = k.join(o.config.root, "package.json"), t = JSON.parse(v(E, "utf-8"));
    if (u._esm = t.type === "module", s)
      return r.info("⏳ Scan Watching..."), J(o);
    const h = k.join(w, p);
    if (d) {
      o.watcher.off(p, c);
      const e = o.watcher.add(h);
      e.on("add", c), e.on("unlink", c), e.on("unlinkDir", c);
    }
    c();
    async function c() {
      try {
        const e = await z(h, {
          recursive: !0,
          exclude: /node_modules|\.git/
        });
        M.__dyMatchPaths = e;
      } catch (e) {
        r.error(e);
      }
    }
    let m = [];
    if (Array.isArray(a))
      m.push(...a);
    else if (a)
      m.push(a);
    else {
      r.error("API Prefix Non-standard");
      return;
    }
    m.forEach((e) => {
      o.middlewares.use(e, I);
    });
  }
});
M.__dyMatchPaths = [];
async function I(i, o, s) {
  var c, m;
  const { root: d, forceMock: a, mockDir: p, timeout: w, downloadExtensions: E } = u;
  let t = "", h = "";
  try {
    let e = function(n, g = _(t)) {
      if (o.writableEnded)
        return r.success(
          `✅ Mock Successify ${f(t, "underline")}`
        );
      try {
        g && o.setHeader("Content-Type", g), setTimeout(() => {
          o.end(JSON.stringify(n)), r.success(
            `✅ Mock Successify ${f(t, "underline")}`
          );
        }, w);
      } catch (l) {
        r.error(l);
      }
    };
    if (i.headers.referer && (h = new URL((c = i.headers) == null ? void 0 : c.referer).searchParams.get("remote") ?? ""), h !== "mock" && !a)
      return r.info("🔒 Browser URL not found mcok Keyword"), s();
    const x = i.headers[N(i)], { encoding: P, fileExt: j } = T(x), F = ((m = i._parsedUrl) == null ? void 0 : m.pathname) ?? "";
    i.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock", o.setHeader("x-custom-response-header", "vite-plugin-mmjs-mock"), t = k.join(d, p, F + j);
    let y;
    if (!A.includes(j)) {
      const n = R(t), g = _(t);
      if (o.setHeader("Content-Type", g || "application/octet-stream"), E.includes(j)) {
        const l = k.basename(t);
        o.setHeader(
          "Content-Disposition",
          `attachment; filename="${l}"`
        ), o.setHeader("download-filename", l);
      }
      n.pipe(o), n.on("error", (l) => {
        r.error(l), n.destroy(), s();
      }), n.on("end", () => {
        r.success(`✅ ReadStream End ${f(t, "underline")}`);
      }), n.on("close", () => {
        n.destroyed || n.destroy();
      });
      return;
    }
    if (!L(t)) {
      const n = k.join(d, p, F);
      t = b(
        M.__dyMatchPaths,
        n
      ) || t;
    }
    if (t.endsWith(".json"))
      try {
        const n = v(t, { encoding: P });
        return e(JSON.parse(n));
      } catch (n) {
        return r.wran(`${n}; ${t}`), s();
      }
    if (y = await H(t), !(y != null && y.enabled))
      throw new Error($);
    C(i), D(i);
    let S = y.mock(i, o);
    S instanceof Promise && (S = await S), e(S, "application/json");
  } catch (e) {
    (e == null ? void 0 : e.message.indexOf($)) !== -1 ? r.info(`🔒 Mock Not Enabled! ${f(t, "underline")}`) : W.some((x) => {
      var P;
      return ((P = e == null ? void 0 : e.message) == null ? void 0 : P.indexOf(x)) !== -1;
    }) ? r.wran(`❌ File Not Found! ${f(t, "underline")}`) : console.error(
      O(),
      (e == null ? void 0 : e.message) || e,
      f(t, "underline")
    ), s();
  }
}
export {
  M as createMockServer
};
