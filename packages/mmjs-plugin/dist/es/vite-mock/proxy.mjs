import { safeUrlToFilename as U, useContentType as v, logger as u, colorize as F, existsSyncByMkdir as M, writeMockFile as N } from "./utils.mjs";
import { serverConfig as T } from "./options.mjs";
import B from "node:path";
import { transformInnerCodeTempate as O } from "./parse.mjs";
import { createWriteStream as W } from "node:fs";
import { createBrotliDecompress as _, createInflate as q, createGunzip as x, brotliDecompress as A, inflate as G, gunzip as J } from "node:zlib";
import { pipeline as z } from "node:stream";
function Z(t) {
  var n;
  const c = ((n = t.config.server) == null ? void 0 : n.proxy) ?? {};
  for (let a in c)
    try {
      const o = c[a];
      if (typeof o != "object") continue;
      const p = o.configure;
      o.configure = (g, y) => {
        g.on(
          "proxyRes",
          (s, b, $) => {
            var k;
            typeof p == "function" && p(g, y);
            const h = B.join(
              U(y.target ?? ""),
              ((k = b._parsedUrl) == null ? void 0 : k.pathname) ?? ""
            ), w = s.headers["content-encoding"];
            if (h) {
              const C = s.headers["content-type"], { encoding: l, isInnerTempType: E, mimeType: P, fileExt: j } = v(C), f = B.join(
                t.config.root,
                T.mockDir,
                T.scanOutput,
                h + j
              );
              if (E) {
                const m = [];
                s.on("data", (i) => {
                  m.push(i);
                }), s.on("end", async () => {
                  var S;
                  let i = "";
                  const e = Buffer.concat(m);
                  let r = e;
                  try {
                    switch (w) {
                      case "gzip":
                        r = await d(J, e);
                        break;
                      case "deflate":
                        r = await d(G, e);
                        break;
                      case "br":
                        r = await d(
                          A,
                          e
                        );
                        break;
                    }
                    i = r.toString(l);
                  } catch (I) {
                    i = e.toString(l), u.error("解压失败" + I);
                  }
                  const D = await O(
                    i,
                    P,
                    {
                      query: ((S = b._parsedUrl) == null ? void 0 : S.query) ?? null,
                      filePath: f
                    }
                  );
                  N(f, D, { encoding: l });
                });
              } else {
                let m = function() {
                  u.success(
                    `✅ writeStream End ${F(f, "underline")}`
                  );
                };
                M(f);
                const i = W(f);
                let e = null;
                switch (w) {
                  case "gzip":
                    e = x();
                    break;
                  case "deflate":
                    e = q();
                    break;
                  case "br":
                    e = _();
                    break;
                }
                e ? z(
                  s,
                  // 原始响应流
                  e,
                  // 解压流
                  i,
                  // 写入文件
                  (r) => {
                    if (r)
                      return u.error("写入文件失败:" + r.message);
                    m();
                  }
                ) : z(
                  s,
                  // 原始响应流
                  i,
                  // 直接写入文件
                  (r) => {
                    if (r)
                      return u.error("写入文件失败:" + r.message);
                    m();
                  }
                );
              }
            }
          }
        );
      };
    } catch (o) {
      u.error(o);
    }
}
function R(t) {
  Reflect.set(t, "send", function(...c) {
    if (!t.writableEnded) {
      const [n, ...a] = c;
      return t.end(
        typeof n != "function" ? JSON.stringify(n) : n,
        ...a
      ), t;
    }
    return t;
  });
}
function d(t, c) {
  return new Promise((n, a) => {
    t(c, (o, p) => {
      o ? a(o) : n(p);
    });
  });
}
export {
  Z as useProxyRes,
  R as useResponseAppend
};
