import { existsSync as y, mkdirSync as h, writeFile as w } from "node:fs";
import { logLevelState as p, allowCharset as u, serverConfig as a } from "./options.mjs";
import b from "node:path";
import { appendFile as d } from "node:fs/promises";
import x from "mime-types";
const f = {
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
function m(e, ...r) {
  return r.map((n) => f[n]).join("") + e + f.reset;
}
function g() {
  return m((/* @__PURE__ */ new Date()).toLocaleTimeString(), "gray") + " " + m("[Mock]", "cyan", "bold");
}
let c = "";
const o = {
  success(e) {
    if (c !== e)
      return c = e, p.isLogSuccess && console.log(`${g()}`, m(e, "green"));
  },
  info(e) {
    if (c !== e)
      return c = e, p.isLogInfo && console.log(`${g()}`, e);
  },
  wran(e) {
    if (c !== e)
      return c = e, p.isLogWarn && console.log(`${g()}`, m(e, "yellow"));
  },
  error(e) {
    if (c !== e)
      return c = e, console.log(`${g()}`, m(e, "red"));
  }
}, F = {
  success(e) {
    o.success(e);
  },
  info(e) {
    o.info(e);
  },
  wran(e) {
    o.wran(e);
  },
  error(e) {
    o.error(e);
  }
};
function B(e) {
  try {
    const r = b.dirname(e);
    y(r) || h(r, { recursive: !0 });
  } catch (r) {
    o.error(r);
  }
}
function k(e, r, n, i = !0) {
  B(e), w(e, r, n, (t) => {
    t ? o.wran(t) : i && o.success(`💧 Write File Successify ${e}`);
  });
}
async function C(e, r, n, i = !0) {
  B(e);
  try {
    await d(e, r, n), i && o.success(`💧 Append File Successify ${e}`);
  } catch (t) {
    o.wran(t);
  }
}
function M(e) {
  const r = e.match(/^(https?):\/\/([^\/:]+)(?::(\d+))?(\/.*)?$/i);
  if (!r) return "invalid_url";
  const n = r[1], i = r[2], t = r[3] || (n === "https" ? "443" : "80"), s = (r[4] || "").replace(/\//g, "_");
  let l = `${i}_${t}`;
  return s && s !== "_" && (l += s), l.replace(/[^a-z0-9_]/gi, "_").replace(/_+/g, "_").toLowerCase();
}
function v(e) {
  var l;
  let r = x.charset(e) || u[0];
  r = r.toLocaleLowerCase();
  let n = x.extension(e) || a.fileExt.slice(1), i = !((l = a.templateMimeType) != null && l.length) || a.templateMimeType.includes(n), t = a.fileExt, s = u.includes(r) ? r : u[0];
  return i ? s = u[0] : t = `.${n}`, {
    charset: r,
    encoding: s,
    isInnerTempType: i,
    fileExt: t,
    mimeType: n
  };
}
function E(e) {
  return x.contentType(e);
}
export {
  C as appendFileFn,
  m as colorize,
  B as existsSyncByMkdir,
  E as getContentTypeByPath,
  F as logger,
  o as non_write_loggger,
  M as safeUrlToFilename,
  v as useContentType,
  k as writeMockFile
};
