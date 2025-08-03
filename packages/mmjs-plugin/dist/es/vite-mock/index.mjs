import { useParseQueryParams as F, useParseBody as L } from "./parse.mjs";
import j from "node:path";
import { logger as n, getContentTypeByPath as E, colorize as l, useContentType as U } from "./utils.mjs";
import { pathToFileURL as B } from "node:url";
import { readFileSync as N, createReadStream as J } from "node:fs";
import { useProxyRes as _ } from "./proxy.mjs";
import { serverConfig as p, updateLogLevelState as D, allowExt as H } from "./options.mjs";
const z = ["no such file", "Cannot find module"], T = "Mock Not enabled";
function X($) {
  const { scan: y, apiPrefix: v, forceMock: C, mockDir: k, timeout: M } = Object.assign(p, $ ?? {});
  return D(), {
    name: "vite:mmjs:mock",
    apply: "serve",
    enforce: "post",
    config(i, m) {
      if (y && m.command === "serve")
        return {
          server: {
            watch: {
              ignored: [
                `**/${k}/**`
                // 可扩展其他规则
              ]
            }
          }
        };
    },
    configureServer(i) {
      const m = i.config.root;
      p.root = m;
      const O = j.join(i.config.root, "package.json"), R = JSON.parse(N(O, "utf-8"));
      if (p._esm = R.type === "module", y)
        return n.info("⏳ Scan Watching..."), _(i);
      i.middlewares.use(v, async (t, a, f) => {
        var S, P;
        let e = "", w = "";
        try {
          let r = function(o, c = E(e)) {
            c && a.setHeader("Content-Type", c), n.success(
              `✅ Mock Successify ${l(e, "underline")}`
            ), setTimeout(() => {
              a.end(JSON.stringify(o));
            }, M);
          };
          if (t.headers.referer && (w = new URL((S = t.headers) == null ? void 0 : S.referer).searchParams.get("remote") ?? ""), w !== "mock" && !C)
            return n.info("🔒 Browser URL not found mcok Keyword"), f();
          const g = t.headers["content-type"], { encoding: d, fileExt: h } = U(g), b = ((P = t._parsedUrl) == null ? void 0 : P.pathname) ?? "";
          t.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock", e = j.join(m, k, b + h);
          let s;
          if (!H.includes(h)) {
            const o = J(e), c = E(e);
            c && a.setHeader("Content-Type", c), o.pipe(a), o.on("error", (x) => {
              n.error(x), o.destroy(), f();
            }), o.on("end", () => {
              n.success(
                `✅ ReadStream End ${l(e, "underline")}`
              );
            }), o.on("close", () => {
              o.destroyed || o.destroy();
            });
            return;
          }
          if (h === ".json")
            try {
              const o = N(e, { encoding: d });
              return r(JSON.parse(o));
            } catch (o) {
              return n.wran(`${o}; ${e}`), f();
            }
          if (p._esm ? s = await import(B(e).href + "?t=" + Date.now()) : (require.cache && delete require.cache[e], s = await require(e)), !(s != null && s.enabled))
            throw new Error(T);
          F(t), L(t);
          let u = s.mock(t, a);
          u instanceof Promise && (u = await u), r(u, "application/json");
        } catch (r) {
          (r == null ? void 0 : r.message.indexOf(T)) !== -1 ? n.info(
            `🔒 Mock Not Enabled! ${l(e, "underline")}`
          ) : z.some((g) => {
            var d;
            return ((d = r == null ? void 0 : r.message) == null ? void 0 : d.indexOf(g)) !== -1;
          }) ? n.wran(
            `❌ File Not Found! ${l(e, "underline")}`
          ) : console.error(r), f();
        }
      });
    }
  };
}
export {
  X as createMockServer
};
