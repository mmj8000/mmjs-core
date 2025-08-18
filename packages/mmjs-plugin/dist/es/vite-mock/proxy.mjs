import { safeUrlToFilename as P, useContentType as U, existsSyncByMkdir as v, logger as f, colorize as F, writeMockFile as I } from "./utils.mjs";
import { serverConfig as T } from "./options.mjs";
import k from "node:path";
import { transformInnerCodeTempate as M } from "./parse.mjs";
import { createWriteStream as N } from "node:fs";
import { gunzipSync as O } from "node:zlib";
function W(n) {
  var o;
  const s = ((o = n.config.server) == null ? void 0 : o.proxy) ?? {};
  for (let a in s)
    try {
      const i = s[a];
      if (typeof i != "object") continue;
      const p = i.configure;
      i.configure = (u, m) => {
        u.on(
          "proxyRes",
          (r, y, _) => {
            var g;
            typeof p == "function" && p(u, m);
            const l = k.join(
              P(m.target ?? ""),
              ((g = y._parsedUrl) == null ? void 0 : g.pathname) ?? ""
            );
            if (l) {
              const b = r.headers["content-type"], { encoding: d, isInnerTempType: z, mimeType: j, fileExt: B } = U(b), c = k.join(
                n.config.root,
                T.mockDir,
                T.scanOutput,
                l + B
              );
              if (z) {
                const e = [];
                r.on("data", (t) => {
                  e.push(t);
                }), r.on("end", async () => {
                  var S;
                  let t = "";
                  const C = r.headers["content-encoding"] === "gzip", h = Buffer.concat(e);
                  if (C)
                    try {
                      t = O(h).toString(d);
                    } catch (w) {
                      f.error("解压失败" + w);
                    }
                  else
                    t = h.toString(d);
                  const E = await M(
                    t,
                    j,
                    {
                      query: ((S = y._parsedUrl) == null ? void 0 : S.query) ?? null,
                      filePath: c
                    }
                  );
                  I(c, E, { encoding: d });
                });
              } else {
                v(c);
                const e = N(c);
                e.on("error", (t) => {
                  f.error(t), e.destroy();
                }), e.on("close", () => {
                  f.success(
                    `✅ writeStream End ${F(c, "underline")}`
                  ), e.destroyed || e.destroy();
                }), r.on("data", (t) => {
                  e.write(t);
                }), r.on("end", () => {
                  e.end();
                });
              }
            }
          }
        );
      };
    } catch (i) {
      f.error(i);
    }
}
function $(n) {
  Reflect.set(n, "send", function(...s) {
    if (!n.writableEnded) {
      const [o, ...a] = s;
      return n.end(
        typeof o != "function" ? JSON.stringify(o) : o,
        ...a
      ), n;
    }
    return n;
  });
}
export {
  W as useProxyRes,
  $ as useResponseAppend
};
