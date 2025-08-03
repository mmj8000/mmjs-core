import { existsSync as $, mkdirSync as b, writeFile as L, statSync as T } from "node:fs";
import { logLevelState as x, allowCharset as g, serverConfig as u } from "./options.mjs";
import _ from "node:path";
import { appendFile as C } from "node:fs/promises";
import B from "mime-types";
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
function m(e, ...t) {
  return t.map((r) => w[r]).join("") + e + w.reset;
}
function p() {
  return m((/* @__PURE__ */ new Date()).toLocaleTimeString(), "gray") + " " + m("[Mock]", "cyan", "bold");
}
let c = "";
const s = {
  success(e) {
    if (c !== e)
      return c = e, x.isLogSuccess && console.log(`${p()}`, m(e, "green"));
  },
  info(e) {
    if (c !== e)
      return c = e, x.isLogInfo && console.log(`${p()}`, e);
  },
  wran(e) {
    if (c !== e)
      return c = e, x.isLogWarn && console.log(`${p()}`, m(e, "yellow"));
  },
  error(e) {
    if (c !== e)
      return c = e, console.log(`${p()}`, m(e, "red"));
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
function d(e) {
  try {
    const t = _.dirname(e);
    $(t) || b(t, { recursive: !0 });
  } catch (t) {
    s.error(t);
  }
}
function E(e, t, r, n = !0) {
  d(e), L(e, t, r, (o) => {
    o ? s.wran(o) : n && s.success(`💧 Write File Successify ${e}`);
  });
}
async function W(e, t, r, n = !0) {
  d(e);
  try {
    await C(e, t, r), n && s.success(`💧 Append File Successify ${e}`);
  } catch (o) {
    s.wran(o);
  }
}
function I(e) {
  const t = e.match(/^(https?):\/\/([^\/:]+)(?::(\d+))?(\/.*)?$/i);
  if (!t) return "invalid_url";
  const r = t[1], n = t[2], o = t[3] || (r === "https" ? "443" : "80"), i = (t[4] || "").replace(/\//g, "_");
  let l = `${n}_${o}`;
  return i && i !== "_" && (l += i), l.replace(/[^a-z0-9_]/gi, "_").replace(/_+/g, "_").toLowerCase();
}
function j(e) {
  var l;
  let t = B.charset(e) || g[0];
  t = t.toLocaleLowerCase();
  let r = B.extension(e) || u.fileExt.slice(1), n = !((l = u.templateMimeType) != null && l.length) || u.templateMimeType.includes(r), o = u.fileExt, i = g.includes(t) ? t : g[0];
  return n ? i = g[0] : o = `.${r}`, {
    charset: t,
    encoding: i,
    isInnerTempType: n,
    fileExt: o,
    mimeType: r
  };
}
function A(e) {
  return B.contentType(e);
}
function D(e, t) {
  const n = t.replace(/^[\\/]|[\\/]$/g, "").replace(/\\/g, "/").replace(/\.[^/.]+$/, "").split("/"), o = [...e].sort(
    (i, l) => l.split(/[\\/]/).length - i.split(/[\\/]/).length
  );
  for (const i of o) {
    const f = i.replace(/^[\\/]|[\\/]$/g, "").replace(/\\/g, "/").replace(/\.[^/.]+$/, "").split("/");
    if (f.length !== n.length)
      continue;
    let h = !0;
    for (let a = 0; a < f.length; a++) {
      const y = f[a], S = n[a];
      if (!/^\$[^/]+$/.test(y) && y.toLowerCase() !== S.toLowerCase()) {
        h = !1;
        break;
      }
    }
    if (h)
      return i;
  }
  return null;
}
function G(e) {
  try {
    return T(e), !0;
  } catch {
    return !1;
  }
}
export {
  W as appendFileFn,
  m as colorize,
  d as existsSyncByMkdir,
  G as fileExists,
  D as findMatchingTemplatePath,
  A as getContentTypeByPath,
  U as logger,
  s as non_write_loggger,
  I as safeUrlToFilename,
  j as useContentType,
  E as writeMockFile
};
