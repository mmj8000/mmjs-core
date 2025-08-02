import { useParseQueryParams as E, useParseBody as F, getCharset as L } from "./parse.mjs";
import j from "node:path";
import { logger as n, colorize as d } from "./utils.mjs";
import { pathToFileURL as C } from "node:url";
import { readFileSync as P } from "node:fs";
import { useProxyRes as R } from "./proxy.mjs";
import { serverConfig as m, updateLogLevelState as T } from "./options.mjs";
import U from "mime-types";
const J = ["no such file", "Cannot find module"], S = "Mock Not enabled";
function A(v) {
  const { scan: p, apiPrefix: N, forceMock: M, mockDir: g, timeout: O, fileExt: h } = Object.assign(m, v ?? {});
  return T(), {
    name: "vite:mmjs:mock",
    apply: "serve",
    enforce: "post",
    config(i, c) {
      if (p && c.command === "serve")
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
      const c = i.config.root;
      m.root = c;
      const $ = j.join(i.config.root, "package.json"), b = JSON.parse(P($, "utf-8"));
      if (m._esm = b.type === "module", p)
        return n.info("⏳ Scan Watching..."), R(i);
      i.middlewares.use(N, async (t, f, l) => {
        var y, w;
        let e = "", k = "";
        try {
          let o = function(a, x = U.contentType(e)) {
            f.setHeader("Content-Type", x), n.success(
              `✅ Mock Successify ${d(e, "underline")}`
            ), setTimeout(() => {
              f.end(JSON.stringify(a));
            }, O);
          };
          if (t.headers.referer && (k = new URL((y = t.headers) == null ? void 0 : y.referer).searchParams.get("remote") ?? ""), k !== "mock" && !M)
            return n.info("🔒 Browser URL not found mcok Keyword"), l();
          E(t), F(t);
          const u = ((w = t._parsedUrl) == null ? void 0 : w.pathname) ?? "";
          t.headers["x-custom-request-header"] = "vite-plugin-mmjs-mock", e = j.join(c, g, u + h);
          let r;
          if (h === ".json")
            try {
              const a = P(e, { encoding: L(t) });
              return o(JSON.parse(a));
            } catch (a) {
              return n.wran(`${a}; ${e}`), l();
            }
          else m._esm ? r = await import(C(e).href + "?t=" + Date.now()) : (require.cache && delete require.cache[e], r = await require(e));
          if (!(r != null && r.enabled))
            throw new Error(S);
          let s = r.mock(t, f);
          s instanceof Promise && (s = await s), s !== void 0 && o(s, "application/json");
        } catch (o) {
          (o == null ? void 0 : o.message.indexOf(S)) !== -1 ? n.info(
            `🔒 Mock Not Enabled! ${d(e, "underline")}`
          ) : J.some((u) => {
            var r;
            return ((r = o == null ? void 0 : o.message) == null ? void 0 : r.indexOf(u)) !== -1;
          }) ? n.wran(
            `❌ File Not Found! ${d(e, "underline")}`
          ) : console.error(o), l();
        }
      });
    }
  };
}
export {
  A as createMockServer
};
