import { existsSync as B, mkdirSync as x, writeFile as p } from "node:fs";
import { logLevelState as m } from "./options.mjs";
import f from "node:path";
import { appendFile as d } from "node:fs/promises";
const g = {
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
function i(e, ...r) {
  return r.map((o) => g[o]).join("") + e + g.reset;
}
function s() {
  return i((/* @__PURE__ */ new Date()).toLocaleTimeString(), "gray") + " " + i("[Mock]", "cyan", "bold");
}
const n = {
  success(e) {
    return m.isLogSuccess && console.log(`${s()}`, i(e, "green"));
  },
  info(e) {
    return m.isLogInfo && console.log(`${s()}`, e);
  },
  wran(e) {
    return m.isLogWarn && console.log(`${s()}`, i(e, "yellow"));
  },
  error(e) {
    return console.log(`${s()}`, i(e, "red"));
  }
}, _ = {
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
function u(e) {
  try {
    const r = f.dirname(e);
    B(r) || x(r, { recursive: !0 });
  } catch (r) {
    n.error(r);
  }
}
function S(e, r, o, c = !0) {
  u(e), p(e, r, o, (t) => {
    t ? n.wran(t) : c && n.success(`💧 Write File Successify ${e}`);
  });
}
async function $(e, r, o, c = !0) {
  u(e);
  try {
    await d(e, r, o), c && n.success(`💧 Append File Successify ${e}`);
  } catch (t) {
    n.wran(t);
  }
}
function F(e) {
  const r = e.match(/^(https?):\/\/([^\/:]+)(?::(\d+))?(\/.*)?$/i);
  if (!r) return "invalid_url";
  const o = r[1], c = r[2], t = r[3] || (o === "https" ? "443" : "80"), a = (r[4] || "").replace(/\//g, "_");
  let l = `${c}_${t}`;
  return a && a !== "_" && (l += a), l.replace(/[^a-z0-9_]/gi, "_").replace(/_+/g, "_").toLowerCase();
}
export {
  $ as appendFileFn,
  i as colorize,
  u as existsSyncByMkdir,
  _ as logger,
  n as non_write_loggger,
  F as safeUrlToFilename,
  S as writeMockFile
};
