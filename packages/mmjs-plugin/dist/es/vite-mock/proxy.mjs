import { safeUrlToFilename as F, writeMockFile as I, logger as L } from "./utils.mjs";
import { allowCharset as i, serverConfig as e } from "./options.mjs";
import C from "node:path";
import E from "mime-types";
import { transformInnerCodeTempate as O } from "./parse.mjs";
function N(c) {
  var f;
  const s = ((f = c.config.server) == null ? void 0 : f.proxy) ?? {};
  for (let b in s)
    try {
      const t = s[b];
      if (typeof t != "object") continue;
      const a = t.configure;
      t.configure = (m, p) => {
        m.on(
          "proxyRes",
          (l, j, M) => {
            var g;
            typeof a == "function" && a(m, p);
            const u = C.join(
              F(p.target ?? ""),
              ((g = j._parsedUrl) == null ? void 0 : g.pathname) ?? ""
            );
            if (u) {
              const y = [];
              l.on("data", (r) => {
                y.push(r);
              }), l.on("end", () => {
                var w;
                const r = Buffer.concat(y), d = M.getHeaders()["content-type"];
                let n = E.charset(d) || i[0];
                n = n.toLocaleLowerCase();
                const o = E.extension(d) || e.fileExt.slice(1), h = (w = e._templateMimeType) != null && w.length ? e._templateMimeType.some(
                  (B) => (o == null ? void 0 : o.indexOf(B)) !== -1
                ) : !0;
                let x = e.fileExt;
                h || (x = o ? "." + o : e.fileExt);
                const T = i.includes(n) ? n : i[0], k = r.toString(T), P = h ? O(k) : k, _ = C.join(
                  c.config.root,
                  e.mockDir,
                  e.scanOutput,
                  u + x
                );
                I(_, P, { encoding: T });
              });
            }
          }
        );
      };
    } catch (t) {
      L.error(t);
    }
}
export {
  N as useProxyRes
};
