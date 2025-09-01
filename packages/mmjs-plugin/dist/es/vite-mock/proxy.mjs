import { safeUrlToFilename as I, useContentType as U, logger as m, colorize as v, existsSyncByMkdir as F, writeMockFile as M } from "./utils.mjs";
import { serverConfig as d } from "./options.mjs";
import C from "node:path";
import { transformInnerCodeTempate as N } from "./parse.mjs";
import { createWriteStream as W } from "node:fs";
import { createBrotliDecompress as _, createInflate as q, createGunzip as G, brotliDecompress as H, inflate as J, gunzip as $ } from "node:zlib";
import { pipeline as j } from "node:stream";
function R(t) {
  var a;
  const s = ((a = t.config.server) == null ? void 0 : a.proxy) ?? {}, { allowOrigin: r } = d;
  for (let u in s)
    try {
      const c = s[u];
      if (typeof c != "object") continue;
      const y = c.configure;
      c.configure = (w, h) => {
        w.on(
          "proxyRes",
          (o, b, K) => {
            var T;
            typeof y == "function" && y(w, h);
            const k = C.join(
              I(h.target ?? ""),
              ((T = b._parsedUrl) == null ? void 0 : T.pathname) ?? ""
            );
            o.headers["Access-Control-Allow-Origin"] = r.join(","), o.headers["Access-Control-Allow-Headers"] = r.join(",");
            const S = o.headers["content-encoding"];
            if (k) {
              const z = o.headers["content-type"], { encoding: p, isInnerTempType: A, mimeType: E, fileExt: O } = U(z), f = C.join(
                t.config.root,
                d.mockDir,
                d.scanOutput,
                k + O
              );
              if (A) {
                const l = [];
                o.on("data", (i) => {
                  l.push(i);
                }), o.on("end", async () => {
                  var B;
                  let i = "";
                  const e = Buffer.concat(l);
                  let n = e;
                  try {
                    switch (S) {
                      case "gzip":
                        n = await g($, e);
                        break;
                      case "deflate":
                        n = await g(J, e);
                        break;
                      case "br":
                        n = await g(
                          H,
                          e
                        );
                        break;
                    }
                    i = n.toString(p);
                  } catch (D) {
                    i = e.toString(p), m.error("解压失败" + D);
                  }
                  const P = await N(
                    i,
                    E,
                    {
                      query: ((B = b._parsedUrl) == null ? void 0 : B.query) ?? null,
                      filePath: f
                    }
                  );
                  M(f, P, { encoding: p });
                });
              } else {
                let l = function() {
                  m.success(
                    `✅ writeStream End ${v(f, "underline")}`
                  );
                };
                F(f);
                const i = W(f);
                let e = null;
                switch (S) {
                  case "gzip":
                    e = G();
                    break;
                  case "deflate":
                    e = q();
                    break;
                  case "br":
                    e = _();
                    break;
                }
                e ? j(
                  o,
                  // 原始响应流
                  e,
                  // 解压流
                  i,
                  // 写入文件
                  (n) => {
                    if (n)
                      return m.error("写入文件失败:" + n.message);
                    l();
                  }
                ) : j(
                  o,
                  // 原始响应流
                  i,
                  // 直接写入文件
                  (n) => {
                    if (n)
                      return m.error("写入文件失败:" + n.message);
                    l();
                  }
                );
              }
            }
          }
        );
      };
    } catch (c) {
      m.error(c);
    }
}
function ee(t) {
  Reflect.set(t, "send", function(...s) {
    if (!t.writableEnded) {
      const [r, ...a] = s;
      return t.end(
        typeof r != "function" ? JSON.stringify(r) : r,
        ...a
      ), t;
    }
    return t;
  });
}
function g(t, s) {
  return new Promise((r, a) => {
    t(s, (u, c) => {
      u ? a(u) : r(c);
    });
  });
}
export {
  R as useProxyRes,
  ee as useResponseAppend
};
