import { useParseQueryParams as C, useParseBody as D } from "./parse.mjs";
import k from "node:path";
import { logger as r, getContentTypeByPath as _, colorize as f, getHeaderMimeTypeKey as N, useContentType as T, fileExists as L, findMatchingTemplatePath as R, dynamicImport as b, uniBeforeStrLog as H } from "./utils.mjs";
import { readFileSync as v, createReadStream as O } from "node:fs";
import { useProxyRes as J, useResponseAppend as A } from "./proxy.mjs";
import { serverConfig as u, _initServerConfig as B, updateLogLevelState as U, allowExt as W, mockNoEnabledStr as $, notFileErrMsg as z } from "./options.mjs";
import { enhancedFindFiles as I } from "./ndos.mjs";
const M = (i) => (Object.assign(u, B, i ?? {}), U(), {
  name: "vite:mmjs:mock",
  apply: "serve",
  enforce: "post",
  config(t, s) {
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
  configureServer(t) {
    const { scan: s, watchDynamicFile: d, apiPrefix: a, mockDir: p } = u, w = t.config.root;
    u.root = w;
    const E = k.join(t.config.root, "package.json"), o = JSON.parse(v(E, "utf-8"));
    if (u._esm = o.type === "module", s)
      return r.info("⏳ Scan Watching..."), J(t);
    const h = k.join(w, p);
    if (d) {
      t.watcher.off(p, c);
      const e = t.watcher.add(h);
      e.on("add", c), e.on("unlink", c), e.on("unlinkDir", c);
    }
    c();
    async function c() {
      try {
        const e = await I(h, {
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
      t.middlewares.use(e, K);
    });
  }
});
M.__dyMatchPaths = [];
async function K(i, t, s) {
  var c, m;
  const { root: d, forceMock: a, mockDir: p, timeout: w, downloadExtensions: E } = u;
  let o = "", h = "";
  try {
    let e = function(n, g = _(o)) {
      if (t.writableEnded)
        return r.success(
          `✅ Mock Successify ${f(o, "underline")}`
        );
      try {
        g && t.setHeader("Content-Type", g), setTimeout(() => {
          t.end(JSON.stringify(n)), r.success(
            `✅ Mock Successify ${f(o, "underline")}`
          );
        }, w);
      } catch (l) {
        r.error(l);
      }
    };
    if (i.headers.referer && (h = new URL((c = i.headers) == null ? void 0 : c.referer).searchParams.get("remote") ?? ""), h !== "mock" && !a)
      return r.info("🔒 Browser URL not found mcok Keyword"), s();
    const x = i.headers[N(i)], { encoding: P, fileExt: j } = T(x), F = ((m = i._parsedUrl) == null ? void 0 : m.pathname) ?? "";
    i.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock", t.setHeader("x-custom-response-header", "vite-plugin-mmjs-mock"), o = k.join(d, p, F + j);
    let y;
    if (!W.includes(j)) {
      const n = O(o), g = _(o);
      if (t.setHeader("Content-Type", g || "application/octet-stream"), E.includes(j)) {
        const l = k.basename(o);
        t.setHeader(
          "Content-Disposition",
          `attachment; filename="${l}"`
        ), t.setHeader("download-filename", l);
      }
      n.pipe(t), n.on("error", (l) => {
        r.error(l), n.destroy(), s();
      }), n.on("end", () => {
        r.success(`✅ ReadStream End ${f(o, "underline")}`);
      }), n.on("close", () => {
        n.destroyed || n.destroy();
      });
      return;
    }
    if (!L(o)) {
      const n = k.join(d, p, F);
      o = R(
        M.__dyMatchPaths,
        n
      ) || o;
    }
    if (o.endsWith(".json"))
      try {
        const n = v(o, { encoding: P });
        return e(JSON.parse(n));
      } catch (n) {
        return r.wran(`${n}; ${o}`), s();
      }
    if (y = await b(o), !(y != null && y.enabled))
      throw new Error($);
    C(i), D(i), A(t);
    let S = y.mock(i, t);
    S instanceof Promise && (S = await S), e(S, "application/json");
  } catch (e) {
    (e == null ? void 0 : e.message.indexOf($)) !== -1 ? r.info(`🔒 Mock Not Enabled! ${f(o, "underline")}`) : z.some((x) => {
      var P;
      return ((P = e == null ? void 0 : e.message) == null ? void 0 : P.indexOf(x)) !== -1;
    }) ? r.wran(`❌ File Not Found! ${f(o, "underline")}`) : console.error(
      H(),
      (e == null ? void 0 : e.message) || e,
      f(o, "underline")
    ), s();
  }
}
export {
  M as createMockServer
};
