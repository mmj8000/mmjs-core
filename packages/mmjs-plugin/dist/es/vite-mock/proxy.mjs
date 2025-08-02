import { safeUrlToFilename as I, writeMockFile as L, logger as O } from "./utils.mjs";
import { allowCharset as r, serverConfig as e } from "./options.mjs";
import C from "node:path";
import E from "mime-types";
import { transformInnerCodeTempate as S } from "./parse.mjs";
function R(s) {
  var a;
  const f = ((a = s.config.server) == null ? void 0 : a.proxy) ?? {};
  for (let b in f)
    try {
      const o = f[b];
      if (typeof o != "object") continue;
      const l = o.configure;
      o.configure = (m, p) => {
        m.on(
          "proxyRes",
          (u, j, M) => {
            var y;
            typeof l == "function" && l(m, p);
            const g = C.join(
              I(p.target ?? ""),
              ((y = j._parsedUrl) == null ? void 0 : y.pathname) ?? ""
            );
            if (g) {
              const d = [];
              u.on("data", (i) => {
                d.push(i);
              }), u.on("end", () => {
                var w;
                const i = Buffer.concat(d), h = M.getHeaders()["content-type"];
                let n = E.charset(h) || r[0];
                n = n.toLocaleLowerCase();
                const t = E.extension(h) || e.fileExt.slice(1), x = (w = e.templateMimeType) != null && w.length ? e.templateMimeType.some(
                  (F) => (t == null ? void 0 : t.indexOf(F)) !== -1
                ) : !0;
                let T = e.fileExt, c = r.includes(n) ? n : r[0];
                x ? c = r[0] : T = t ? "." + t : e.fileExt;
                const k = i.toString(c), P = x ? S(k, t) : k, B = C.join(
                  s.config.root,
                  e.mockDir,
                  e.scanOutput,
                  g + T
                );
                L(B, P, { encoding: c });
              });
            }
          }
        );
      };
    } catch (o) {
      O.error(o);
    }
}
export {
  R as useProxyRes
};
