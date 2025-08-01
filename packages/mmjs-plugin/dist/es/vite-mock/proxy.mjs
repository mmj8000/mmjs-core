import { logger as f } from "./utils.mjs";
import { allowCharset as m, serverConfig as o } from "./options.mjs";
import { existsSync as _, mkdirSync as j, writeFile as I } from "node:fs";
import E from "node:path";
import M from "mime-types";
import { transformInnerCodeTempate as N } from "./parse.mjs";
function z(e) {
  var n;
  const t = ((n = e.config.server) == null ? void 0 : n.proxy) ?? {};
  for (let c in t)
    try {
      const r = t[c];
      if (typeof r != "object") continue;
      const u = r.configure;
      r.configure = (l, b) => {
        l.on(
          "proxyRes",
          (p, v, B) => {
            var d;
            typeof u == "function" && u(l, b);
            const h = (d = v._parsedUrl) == null ? void 0 : d.pathname;
            if (h) {
              const y = [];
              p.on("data", (a) => {
                y.push(a);
              }), p.on("end", () => {
                var C;
                const a = Buffer.concat(y), g = B.getHeaders()["content-type"];
                let s = M.charset(g) || m[0];
                s = s.toLocaleLowerCase();
                const i = M.extension(g) || o.fileExt.slice(1), x = (C = o._templateMimeType) != null && C.length ? o._templateMimeType.some(
                  (P) => (i == null ? void 0 : i.indexOf(P)) !== -1
                ) : !0;
                let w = o.fileExt;
                x || (w = i ? "." + i : o.fileExt);
                const S = m.includes(s) ? s : m[0], k = a.toString(S), F = x ? N(k) : k, L = E.join(
                  e.config.root,
                  o.mockDir,
                  o.scanOutput,
                  h + w
                );
                D(L, F, { encoding: S });
              });
            }
          }
        );
      };
    } catch (r) {
      f.error(r);
    }
}
function O(e) {
  try {
    const t = E.dirname(e);
    _(t) || j(t, { recursive: !0 });
  } catch (t) {
    f.error(t);
  }
}
function D(e, t, n) {
  O(e), I(e, t, n, (c) => {
    c ? f.wran(c) : f.success(`💧 Save File Successify ${e}`);
  });
}
export {
  z as useProxyRes
};
