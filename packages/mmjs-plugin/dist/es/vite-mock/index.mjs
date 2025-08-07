import { useParseQueryParams as T, useParseBody as C } from "./parse.mjs";
import S from "node:path";
import { logger as s, getContentTypeByPath as M, colorize as P, getHeaderMimeTypeKey as D, useContentType as L, fileExists as v, findMatchingTemplatePath as R, uniBeforeStrLog as $ } from "./utils.mjs";
import { pathToFileURL as O } from "node:url";
import { readFileSync as j, createReadStream as b } from "node:fs";
import { useProxyRes as J } from "./proxy.mjs";
import { serverConfig as d, _initServerConfig as U, updateLogLevelState as B, allowExt as A } from "./options.mjs";
import { enhancedFindFiles as H } from "./ndos.mjs";
const W = ["no such file", "Cannot find module"], _ = "Mock Not enabled", E = (i) => (Object.assign(d, U, i ?? {}), B(), {
  name: "vite:mmjs:mock",
  apply: "serve",
  enforce: "post",
  config(n, a) {
    const { scan: f, mockDir: c } = d;
    if (f && a.command === "serve")
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
    const { scan: a, watchDynamicFile: f, apiPrefix: c, mockDir: h } = d, y = n.config.root;
    d.root = y;
    const e = S.join(n.config.root, "package.json"), g = JSON.parse(j(e, "utf-8"));
    if (d._esm = g.type === "module", a)
      return s.info("⏳ Scan Watching..."), J(n);
    const p = S.join(y, h);
    if (f) {
      n.watcher.off(h, m);
      const r = n.watcher.add(p);
      r.on("add", m), r.on("unlink", m), r.on("unlinkDir", m);
    }
    m();
    async function m() {
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
  var p, m;
  const { root: f, forceMock: c, mockDir: h, timeout: y } = d;
  let e = "", g = "";
  try {
    let o = function(t, u = M(e)) {
      u && n.setHeader("Content-Type", u), s.success(`✅ Mock Successify ${P(e, "underline")}`), setTimeout(() => {
        n.end(JSON.stringify(t));
      }, y);
    };
    if (i.headers.referer && (g = new URL((p = i.headers) == null ? void 0 : p.referer).searchParams.get("remote") ?? ""), g !== "mock" && !c)
      return s.info("🔒 Browser URL not found mcok Keyword"), a();
    const r = i.headers[D(i)], { encoding: k, fileExt: x } = L(r), F = ((m = i._parsedUrl) == null ? void 0 : m.pathname) ?? "";
    i.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock", e = S.join(f, h, F + x);
    let l;
    if (!A.includes(x)) {
      const t = b(e), u = M(e);
      u && n.setHeader("Content-Type", u), t.pipe(n), t.on("error", (N) => {
        s.error(N), t.destroy(), a();
      }), t.on("end", () => {
        s.success(`✅ ReadStream End ${P(e, "underline")}`);
      }), t.on("close", () => {
        t.destroyed || t.destroy();
      });
      return;
    }
    if (!v(e)) {
      const t = S.join(f, h, F);
      e = R(
        E.__dyMatchPaths,
        t
      ) || e;
    }
    if (e.endsWith(".json"))
      try {
        const t = j(e, { encoding: k });
        return o(JSON.parse(t));
      } catch (t) {
        return s.wran(`${t}; ${e}`), a();
      }
    if (d._esm ? l = await import(O(e).href + "?t=" + Date.now()) : (require.cache && delete require.cache[e], l = await require(e)), !(l != null && l.enabled))
      throw new Error(_);
    T(i), C(i);
    let w = l.mock(i, n);
    w instanceof Promise && (w = await w), o(w, "application/json");
  } catch (o) {
    (o == null ? void 0 : o.message.indexOf(_)) !== -1 ? s.info(`🔒 Mock Not Enabled! ${P(e, "underline")}`) : W.some((r) => {
      var k;
      return ((k = o == null ? void 0 : o.message) == null ? void 0 : k.indexOf(r)) !== -1;
    }) ? s.wran(`❌ File Not Found! ${P(e, "underline")}`) : console.error($(), (o == null ? void 0 : o.message) || o), a();
  }
}
export {
  E as createMockServer
};
