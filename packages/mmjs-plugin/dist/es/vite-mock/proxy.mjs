import { safeUrlToFilename as E, useContentType as P, existsSyncByMkdir as U, logger as a, colorize as v, writeMockFile as x } from "./utils.mjs";
import { serverConfig as w } from "./options.mjs";
import S from "node:path";
import { transformInnerCodeTempate as F } from "./parse.mjs";
import { createWriteStream as I } from "node:fs";
function A(t) {
  var n;
  const s = ((n = t.config.server) == null ? void 0 : n.proxy) ?? {};
  for (let f in s)
    try {
      const r = s[f];
      if (typeof r != "object") continue;
      const u = r.configure;
      r.configure = (d, m) => {
        d.on(
          "proxyRes",
          (i, p, M) => {
            var l;
            typeof u == "function" && u(d, m);
            const y = S.join(
              E(m.target ?? ""),
              ((l = p._parsedUrl) == null ? void 0 : l.pathname) ?? ""
            );
            if (y) {
              const T = i.headers["content-type"], { encoding: g, isInnerTempType: b, mimeType: k, fileExt: j } = P(T), c = S.join(
                t.config.root,
                w.mockDir,
                w.scanOutput,
                y + j
              );
              if (b) {
                const e = [];
                i.on("data", (o) => {
                  e.push(o);
                }), i.on("end", async () => {
                  var h;
                  const B = Buffer.concat(e).toString(g), C = await F(
                    B,
                    k,
                    {
                      query: ((h = p._parsedUrl) == null ? void 0 : h.query) ?? null,
                      filePath: c
                    }
                  );
                  x(c, C, { encoding: g });
                });
              } else {
                U(c);
                const e = I(c);
                e.on("error", (o) => {
                  a.error(o), e.destroy();
                }), e.on("close", () => {
                  a.success(
                    `✅ writeStream End ${v(c, "underline")}`
                  ), e.destroyed || e.destroy();
                }), i.on("data", (o) => {
                  e.write(o);
                }), i.on("end", () => {
                  e.end();
                });
              }
            }
          }
        );
      };
    } catch (r) {
      a.error(r);
    }
}
function D(t) {
  Reflect.set(t, "send", function(...s) {
    if (!t.writableEnded) {
      const [n, ...f] = s;
      return t.end(
        typeof n != "function" ? JSON.stringify(n) : n,
        ...f
      ), t;
    }
    return t;
  });
}
export {
  A as useProxyRes,
  D as useResponseAppend
};
