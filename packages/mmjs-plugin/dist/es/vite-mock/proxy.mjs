import { safeUrlToFilename as P, useContentType as U, existsSyncByMkdir as x, logger as i, colorize as E, writeMockFile as F } from "./utils.mjs";
import { serverConfig as h } from "./options.mjs";
import T from "node:path";
import { transformInnerCodeTempate as I } from "./parse.mjs";
import { createWriteStream as M } from "node:fs";
function O(c) {
  var a;
  const s = ((a = c.config.server) == null ? void 0 : a.proxy) ?? {};
  for (let w in s)
    try {
      const t = s[w];
      if (typeof t != "object") continue;
      const f = t.configure;
      t.configure = (m, d) => {
        m.on(
          "proxyRes",
          (n, u, _) => {
            var p;
            typeof f == "function" && f(m, d);
            const y = T.join(
              P(d.target ?? ""),
              ((p = u._parsedUrl) == null ? void 0 : p.pathname) ?? ""
            );
            if (y) {
              const S = n.headers["content-type"], { encoding: l, isInnerTempType: k, mimeType: b, fileExt: j } = U(S), r = T.join(
                c.config.root,
                h.mockDir,
                h.scanOutput,
                y + j
              );
              if (k) {
                const e = [];
                n.on("data", (o) => {
                  e.push(o);
                }), n.on("end", async () => {
                  var g;
                  const B = Buffer.concat(e).toString(l), C = await I(
                    B,
                    b,
                    {
                      query: ((g = u._parsedUrl) == null ? void 0 : g.query) ?? null,
                      filePath: r
                    }
                  );
                  F(r, C, { encoding: l });
                });
              } else {
                x(r);
                const e = M(r);
                e.on("error", (o) => {
                  i.error(o), e.destroy();
                }), e.on("close", () => {
                  i.success(
                    `✅ writeStream End ${E(r, "underline")}`
                  ), e.destroyed || e.destroy();
                }), n.on("data", (o) => {
                  e.write(o);
                }), n.on("end", () => {
                  e.end();
                });
              }
            }
          }
        );
      };
    } catch (t) {
      i.error(t);
    }
}
export {
  O as useProxyRes
};
