import { existsSync as $, mkdirSync as T, writeFile as b, statSync as L } from "node:fs";
import { logLevelState as x, allowCharset as u, customContentTypeToExt as C, serverConfig as g } from "./options.mjs";
import _ from "node:path";
import { appendFile as M } from "node:fs/promises";
import h from "mime-types";
const d = {
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
function m(e, ...t) {
  return t.map((r) => d[r]).join("") + e + d.reset;
}
function p() {
  return m((/* @__PURE__ */ new Date()).toLocaleTimeString(), "gray") + " " + m("[Mock]", "cyan", "bold");
}
let l = "";
const s = {
  success(e) {
    if (l !== e)
      return l = e, x.isLogSuccess && console.log(`${p()}`, m(e, "green"));
  },
  info(e) {
    if (l !== e)
      return l = e, x.isLogInfo && console.log(`${p()}`, e);
  },
  wran(e) {
    if (l !== e)
      return l = e, x.isLogWarn && console.log(`${p()}`, m(e, "yellow"));
  },
  error(e) {
    if (l !== e)
      return l = e, console.log(`${p()}`, m(e, "red"));
  }
}, U = {
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
function w(e) {
  try {
    const t = _.dirname(e);
    $(t) || T(t, { recursive: !0 });
  } catch (t) {
    s.error(t);
  }
}
function W(e, t, r, n = !0) {
  w(e), b(e, t, r, (o) => {
    o ? s.wran(o) : n && s.success(`💧 Write File Successify ${e}`);
  });
}
async function G(e, t, r, n = !0) {
  w(e);
  try {
    await M(e, t, r), n && s.success(`💧 Append File Successify ${e}`);
  } catch (o) {
    s.wran(o);
  }
}
function I(e) {
  const t = e.match(/^(https?):\/\/([^\/:]+)(?::(\d+))?(\/.*)?$/i);
  if (!t) return "invalid_url";
  const r = t[1], n = t[2], o = t[3] || (r === "https" ? "443" : "80"), i = (t[4] || "").replace(/\//g, "_");
  let c = `${n}_${o}`;
  return i && i !== "_" && (c += i), c.replace(/[^a-z0-9_]/gi, "_").replace(/_+/g, "_").toLowerCase();
}
function j(e) {
  var c;
  let t = h.charset(e) || u[0];
  t = t.toLocaleLowerCase();
  let r = h.extension(e) || C[e] || g.fileExt.slice(1), n = !((c = g.templateMimeType) != null && c.length) || g.templateMimeType.includes(r), o = g.fileExt, i = u.includes(t) ? t : u[0];
  return n ? i = u[0] : o = `.${r}`, {
    charset: t,
    encoding: i,
    isInnerTempType: n,
    fileExt: o,
    mimeType: r
  };
}
function A(e) {
  return h.contentType(e);
}
function D(e, t) {
  const n = t.replace(/^[\\/]|[\\/]$/g, "").replace(/\\/g, "/").replace(/\.[^/.]+$/, "").split("/"), o = [...e].sort(
    (i, c) => c.split(/[\\/]/).length - i.split(/[\\/]/).length
  );
  for (const i of o) {
    const f = i.replace(/^[\\/]|[\\/]$/g, "").replace(/\\/g, "/").replace(/\.[^/.]+$/, "").split("/");
    if (f.length !== n.length)
      continue;
    let B = !0;
    for (let a = 0; a < f.length; a++) {
      const y = f[a], S = n[a];
      if (!/^\$[^/]+$/.test(y) && y.toLowerCase() !== S.toLowerCase()) {
        B = !1;
        break;
      }
    }
    if (B)
      return i;
  }
  return null;
}
function H(e) {
  try {
    return L(e), !0;
  } catch {
    return !1;
  }
}
function K(e) {
  return e.method === "GET" ? "accept" : "content-type";
}
export {
  G as appendFileFn,
  m as colorize,
  w as existsSyncByMkdir,
  H as fileExists,
  D as findMatchingTemplatePath,
  A as getContentTypeByPath,
  K as getHeaderMimeTypeKey,
  U as logger,
  s as non_write_loggger,
  I as safeUrlToFilename,
  p as uniBeforeStrLog,
  j as useContentType,
  W as writeMockFile
};
