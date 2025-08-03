import { useParseQueryParams as R, useParseBody as b } from "./parse.mjs";
import p from "node:path";
import { logger as n, getContentTypeByPath as M, colorize as h, useContentType as U, fileExists as B, findMatchingTemplatePath as J } from "./utils.mjs";
import { pathToFileURL as D } from "node:url";
import { readFileSync as _, createReadStream as H } from "node:fs";
import { useProxyRes as z } from "./proxy.mjs";
import { serverConfig as y, updateLogLevelState as K, allowExt as Q } from "./options.mjs";
import { enhancedFindFiles as W } from "./ndos.mjs";
const A = ["no such file", "Cannot find module"], x = "Mock Not enabled", P = (T) => {
  const { scan: k, apiPrefix: v, forceMock: N, mockDir: d, timeout: $ } = Object.assign(y, T ?? {});
  return K(), {
    name: "vite:mmjs:mock",
    apply: "serve",
    enforce: "post",
    config(c, s) {
      if (k && s.command === "serve")
        return {
          server: {
            watch: {
              ignored: [
                `**/${d}/**`
                // 可扩展其他规则
              ]
            }
          }
        };
    },
    configureServer(c) {
      const s = c.config.root;
      y.root = s;
      const C = p.join(c.config.root, "package.json"), L = JSON.parse(_(C, "utf-8"));
      if (y._esm = L.type === "module", k)
        return n.info("⏳ Scan Watching..."), z(c);
      (async () => {
        try {
          const t = await W(
            p.join(s, d),
            {
              recursive: !0,
              exclude: /node_modules|\.git/
            }
          );
          P.__dyMatchPaths = t;
        } catch (t) {
          n.error(t);
        }
      })(), c.middlewares.use(v, async (t, m, f) => {
        var j, E;
        let e = "", S = "";
        try {
          let r = function(o, a = M(e)) {
            a && m.setHeader("Content-Type", a), n.success(
              `✅ Mock Successify ${h(e, "underline")}`
            ), setTimeout(() => {
              m.end(JSON.stringify(o));
            }, $);
          };
          if (t.headers.referer && (S = new URL((j = t.headers) == null ? void 0 : j.referer).searchParams.get("remote") ?? ""), S !== "mock" && !N)
            return n.info("🔒 Browser URL not found mcok Keyword"), f();
          const g = t.headers["content-type"], { encoding: l, fileExt: w } = U(g), F = ((E = t._parsedUrl) == null ? void 0 : E.pathname) ?? "";
          t.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock", e = p.join(s, d, F + w);
          let i;
          if (!Q.includes(w)) {
            const o = H(e), a = M(e);
            a && m.setHeader("Content-Type", a), o.pipe(m), o.on("error", (O) => {
              n.error(O), o.destroy(), f();
            }), o.on("end", () => {
              n.success(
                `✅ ReadStream End ${h(e, "underline")}`
              );
            }), o.on("close", () => {
              o.destroyed || o.destroy();
            });
            return;
          }
          if (!B(e)) {
            const o = p.join(s, d, F);
            e = J(P.__dyMatchPaths, o) || e;
          }
          if (w === ".json")
            try {
              const o = _(e, { encoding: l });
              return r(JSON.parse(o));
            } catch (o) {
              return n.wran(`${o}; ${e}`), f();
            }
          if (y._esm ? i = await import(D(e).href + "?t=" + Date.now()) : (require.cache && delete require.cache[e], i = await require(e)), !(i != null && i.enabled))
            throw new Error(x);
          R(t), b(t);
          let u = i.mock(t, m);
          u instanceof Promise && (u = await u), r(u, "application/json");
        } catch (r) {
          (r == null ? void 0 : r.message.indexOf(x)) !== -1 ? n.info(
            `🔒 Mock Not Enabled! ${h(e, "underline")}`
          ) : A.some((g) => {
            var l;
            return ((l = r == null ? void 0 : r.message) == null ? void 0 : l.indexOf(g)) !== -1;
          }) ? n.wran(
            `❌ File Not Found! ${h(e, "underline")}`
          ) : console.error(r), f();
        }
      });
    }
  };
};
P.__dyMatchPaths = [];
export {
  P as createMockServer
};
