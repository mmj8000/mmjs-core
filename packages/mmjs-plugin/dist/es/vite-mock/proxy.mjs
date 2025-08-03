import { safeUrlToFilename as P, useContentType as B, logger as i, colorize as E, writeMockFile as F } from "./utils.mjs";
import { serverConfig as l } from "./options.mjs";
import g from "node:path";
import { transformInnerCodeTempate as I } from "./parse.mjs";
import { createWriteStream as U } from "node:fs";
function O(c) {
  var f;
  const s = ((f = c.config.server) == null ? void 0 : f.proxy) ?? {};
  for (let h in s)
    try {
      const t = s[h];
      if (typeof t != "object") continue;
      const a = t.configure;
      t.configure = (m, d) => {
        m.on(
          "proxyRes",
          (n, T, v) => {
            var u;
            typeof a == "function" && a(m, d);
            const p = g.join(
              P(d.target ?? ""),
              ((u = T._parsedUrl) == null ? void 0 : u.pathname) ?? ""
            );
            if (p) {
              const w = n.headers["content-type"], { encoding: y, isInnerTempType: S, mimeType: b, fileExt: k } = B(w), r = g.join(
                c.config.root,
                l.mockDir,
                l.scanOutput,
                p + k
              );
              if (S) {
                const e = [];
                n.on("data", (o) => {
                  e.push(o);
                }), n.on("end", () => {
                  const j = Buffer.concat(e).toString(y), C = I(j, b);
                  F(r, C, { encoding: y });
                });
              } else {
                const e = U(r);
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
