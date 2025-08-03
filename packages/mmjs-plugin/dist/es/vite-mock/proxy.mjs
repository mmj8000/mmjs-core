import { safeUrlToFilename as C, useContentType as P, existsSyncByMkdir as x, logger as i, colorize as E, writeMockFile as F } from "./utils.mjs";
import { serverConfig as l } from "./options.mjs";
import g from "node:path";
import { transformInnerCodeTempate as I } from "./parse.mjs";
import { createWriteStream as M } from "node:fs";
function W(c) {
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
          (n, T, U) => {
            var u;
            typeof a == "function" && a(m, d);
            const p = g.join(
              C(d.target ?? ""),
              ((u = T._parsedUrl) == null ? void 0 : u.pathname) ?? ""
            );
            if (p) {
              const S = n.headers["content-type"], { encoding: y, isInnerTempType: k, mimeType: w, fileExt: b } = P(S), r = g.join(
                c.config.root,
                l.mockDir,
                l.scanOutput,
                p + b
              );
              if (k) {
                const e = [];
                n.on("data", (o) => {
                  e.push(o);
                }), n.on("end", () => {
                  const j = Buffer.concat(e).toString(y), B = I(j, w);
                  F(r, B, { encoding: y });
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
  W as useProxyRes
};
