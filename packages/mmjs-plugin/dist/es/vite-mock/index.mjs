import { getCharset as E, useParseQueryParams as F, useParseBody as L } from "./parse.mjs";
import j from "node:path";
import { logger as n, colorize as p } from "./utils.mjs";
import { pathToFileURL as C } from "node:url";
import { readFileSync as P } from "node:fs";
import { useProxyRes as R } from "./proxy.mjs";
import { serverConfig as m, updateLogLevelState as T } from "./options.mjs";
import U from "mime-types";
const J = ["no such file", "Cannot find module"], S = "Mock Not enabled";
function A(N) {
  const { scan: d, apiPrefix: v, forceMock: M, mockDir: g, timeout: O, fileExt: h } = Object.assign(m, N ?? {});
  return T(), {
    name: "vite:mmjs:mock",
    apply: "serve",
    enforce: "post",
    config(i, a) {
      if (d && a.command === "serve")
        return {
          server: {
            watch: {
              ignored: [
                `**/${g}/**`
                // 可扩展其他规则
              ]
            }
          }
        };
    },
    configureServer(i) {
      const a = i.config.root;
      m.root = a;
      const $ = j.join(i.config.root, "package.json"), b = JSON.parse(P($, "utf-8"));
      if (m._esm = b.type === "module", d)
        return n.info("⏳ Scan Watching..."), R(i);
      i.middlewares.use(v, async (t, f, u) => {
        var y, w;
        let e = "", k = "";
        try {
          let o = function(s, x = U.contentType(e)) {
            f.setHeader("Content-Type", x), n.success(
              `✅ Mock Successify ${p(e, "underline")}`
            ), setTimeout(() => {
              f.end(JSON.stringify(s));
            }, O);
          };
          if (t.headers.referer && (k = new URL((y = t.headers) == null ? void 0 : y.referer).searchParams.get("remote") ?? ""), k !== "mock" && !M)
            return n.info("🔒 Browser URL not found mcok Keyword"), u();
          const l = ((w = t._parsedUrl) == null ? void 0 : w.pathname) ?? "";
          t.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock", e = j.join(a, g, l + h);
          let r;
          if (h === ".json")
            try {
              const s = P(e, { encoding: E(t) });
              return o(JSON.parse(s));
            } catch (s) {
              return n.wran(`${s}; ${e}`), u();
            }
          if (m._esm ? r = await import(C(e).href + "?t=" + Date.now()) : (require.cache && delete require.cache[e], r = await require(e)), !(r != null && r.enabled))
            throw new Error(S);
          F(t), L(t);
          let c = r.mock(t, f);
          c instanceof Promise && (c = await c), o(c, "application/json");
        } catch (o) {
          (o == null ? void 0 : o.message.indexOf(S)) !== -1 ? n.info(
            `🔒 Mock Not Enabled! ${p(e, "underline")}`
          ) : J.some((l) => {
            var r;
            return ((r = o == null ? void 0 : o.message) == null ? void 0 : r.indexOf(l)) !== -1;
          }) ? n.wran(
            `❌ File Not Found! ${p(e, "underline")}`
          ) : console.error(o), u();
        }
      });
    }
  };
}
export {
  A as createMockServer
};
