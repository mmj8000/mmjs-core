import { existsSync as $, mkdirSync as b, writeFile as L, statSync as _ } from "node:fs";
import { logLevelState as x, serverConfig as m, allowCharset as p, customContentTypeToExt as C } from "./options.mjs";
import F from "node:path";
import { appendFile as M } from "node:fs/promises";
import y from "mime-types";
import { pathToFileURL as k } from "node:url";
const w = {
  // 文本颜色
  black: "\x1B[30m",
  red: "\x1B[31m",
  green: "\x1B[32m",
  yellow: "\x1B[33m",
  blue: "\x1B[34m",
  magenta: "\x1B[35m",
  cyan: "\x1B[36m",
  white: "\x1B[37m",
  gray: "\x1B[90m",
  // 背景颜色
  bgBlack: "\x1B[40m",
  bgRed: "\x1B[41m",
  bgGreen: "\x1B[42m",
  bgYellow: "\x1B[43m",
  bgBlue: "\x1B[44m",
  bgMagenta: "\x1B[45m",
  bgCyan: "\x1B[46m",
  bgWhite: "\x1B[47m",
  // 样式
  reset: "\x1B[0m",
  bright: "\x1B[1m",
  dim: "\x1B[2m",
  italic: "\x1B[3m",
  underline: "\x1B[4m",
  blink: "\x1B[5m",
  reverse: "\x1B[7m",
  hidden: "\x1B[8m"
};
function a(e, ...t) {
  return t.map((r) => w[r]).join("") + e + w.reset;
}
function g() {
  return a((/* @__PURE__ */ new Date()).toLocaleTimeString(), "gray") + " " + a("[Mock]", "cyan", "bold");
}
let l = "";
const s = {
  success(e) {
    if (l !== e)
      return l = e, x.isLogSuccess && console.log(`${g()}`, a(e, "green"));
  },
  info(e) {
    if (l !== e)
      return l = e, x.isLogInfo && console.log(`${g()}`, e);
  },
  wran(e) {
    if (l !== e)
      return l = e, x.isLogWarn && console.log(`${g()}`, a(e, "yellow"));
  },
  error(e) {
    if (l !== e)
      return l = e, console.log(`${g()}`, a(e, "red"));
  }
}, W = {
  success(e) {
    s.success(e);
  },
  info(e) {
    s.info(e);
  },
  wran(e) {
    s.wran(e);
  },
  error(e) {
    s.error(e);
  }
};
function S(e) {
  try {
    const t = F.dirname(e);
    $(t) || b(t, { recursive: !0 });
  } catch (t) {
    s.error(t);
  }
}
function j(e, t, r, n = !0) {
  S(e), L(e, t, r, (o) => {
    o ? s.wran(o) : n && s.success(`💧 Write File Successify ${e}`);
  });
}
async function D(e, t, r, n = !0) {
  S(e);
  try {
    await M(e, t, r), n && s.success(`💧 Append File Successify ${e}`);
  } catch (o) {
    s.wran(o);
  }
}
function G(e) {
  const t = e.match(/^(https?):\/\/([^\/:]+)(?::(\d+))?(\/.*)?$/i);
  if (!t) return "invalid_url";
  const r = t[1], n = t[2], o = t[3] || (r === "https" ? "443" : "80"), i = (t[4] || "").replace(/\//g, "_");
  let c = `${n}_${o}`;
  return i && i !== "_" && (c += i), c.replace(/[^a-z0-9_]/gi, "_").replace(/_+/g, "_").toLowerCase();
}
function R(e) {
  var c;
  let t = y.charset(e) || m.encoding || p[0];
  t = t.toLocaleLowerCase();
  let r = y.extension(e) || C[e] || m.fileExt.slice(1), n = !((c = m.templateMimeType) != null && c.length) || m.templateMimeType.includes(r), o = m.fileExt, i = p.includes(t) ? t : p[0];
  return n ? i = p[0] : o = `.${r}`, {
    charset: t,
    encoding: i,
    isInnerTempType: n,
    fileExt: o,
    mimeType: r
  };
}
function A(e) {
  return y.contentType(e);
}
function H(e, t) {
  const n = t.replace(/^[\\/]|[\\/]$/g, "").replace(/\\/g, "/").replace(/\.[^/.]+$/, "").split("/"), o = [...e].sort(
    (i, c) => c.split(/[\\/]/).length - i.split(/[\\/]/).length
  );
  for (const i of o) {
    const f = i.replace(/^[\\/]|[\\/]$/g, "").replace(/\\/g, "/").replace(/\.[^/.]+$/, "").split("/");
    if (f.length !== n.length)
      continue;
    let h = !0;
    for (let u = 0; u < f.length; u++) {
      const B = f[u], T = n[u];
      if (!/^\$[^/]+$/.test(B) && B.toLowerCase() !== T.toLowerCase()) {
        h = !1;
        break;
      }
    }
    if (h)
      return i;
  }
  return null;
}
function K(e) {
  try {
    return _(e), !0;
  } catch {
    return !1;
  }
}
function N(e) {
  return e.method === "GET" ? "accept" : "content-type";
}
let d = async (e) => {
  async function t() {
    return await import(k(e).href + "?t=" + Date.now());
  }
  async function r() {
    return require.cache && delete require.cache[e], await require(e);
  }
  return m._esm ? (d = t, t()) : (d = r, r());
};
export {
  D as appendFileFn,
  a as colorize,
  d as dynamicImport,
  S as existsSyncByMkdir,
  K as fileExists,
  H as findMatchingTemplatePath,
  A as getContentTypeByPath,
  N as getHeaderMimeTypeKey,
  W as logger,
  s as non_write_loggger,
  G as safeUrlToFilename,
  g as uniBeforeStrLog,
  R as useContentType,
  j as writeMockFile
};
