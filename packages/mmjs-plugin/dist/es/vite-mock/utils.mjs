import { existsSync as x, mkdirSync as f, writeFile as p } from "node:fs";
import { logLevelState as u } from "./options.mjs";
import y from "node:path";
import { appendFile as w } from "node:fs/promises";
const a = {
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
function s(e, ...r) {
  return r.map((t) => a[t]).join("") + e + a.reset;
}
function m() {
  return s((/* @__PURE__ */ new Date()).toLocaleTimeString(), "gray") + " " + s("[Mock]", "cyan", "bold");
}
let o = "";
const n = {
  success(e) {
    if (o !== e)
      return o = e, u.isLogSuccess && console.log(`${m()}`, s(e, "green"));
  },
  info(e) {
    if (o !== e)
      return o = e, u.isLogInfo && console.log(`${m()}`, e);
  },
  wran(e) {
    if (o !== e)
      return o = e, u.isLogWarn && console.log(`${m()}`, s(e, "yellow"));
  },
  error(e) {
    if (o !== e)
      return o = e, console.log(`${m()}`, s(e, "red"));
  }
}, S = {
  success(e) {
    n.success(e);
  },
  info(e) {
    n.info(e);
  },
  wran(e) {
    n.wran(e);
  },
  error(e) {
    n.error(e);
  }
};
function B(e) {
  try {
    const r = y.dirname(e);
    x(r) || f(r, { recursive: !0 });
  } catch (r) {
    n.error(r);
  }
}
function $(e, r, t, c = !0) {
  B(e), p(e, r, t, (i) => {
    i ? n.wran(i) : c && n.success(`💧 Write File Successify ${e}`);
  });
}
async function F(e, r, t, c = !0) {
  B(e);
  try {
    await w(e, r, t), c && n.success(`💧 Append File Successify ${e}`);
  } catch (i) {
    n.wran(i);
  }
}
function L(e) {
  const r = e.match(/^(https?):\/\/([^\/:]+)(?::(\d+))?(\/.*)?$/i);
  if (!r) return "invalid_url";
  const t = r[1], c = r[2], i = r[3] || (t === "https" ? "443" : "80"), l = (r[4] || "").replace(/\//g, "_");
  let g = `${c}_${i}`;
  return l && l !== "_" && (g += l), g.replace(/[^a-z0-9_]/gi, "_").replace(/_+/g, "_").toLowerCase();
}
export {
  F as appendFileFn,
  s as colorize,
  B as existsSyncByMkdir,
  S as logger,
  n as non_write_loggger,
  L as safeUrlToFilename,
  $ as writeMockFile
};
