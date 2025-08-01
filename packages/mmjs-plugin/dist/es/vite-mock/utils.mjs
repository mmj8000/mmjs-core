import { logLevelState as n } from "./options.mjs";
const m = {
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
function o(e, ...l) {
  return l.map((B) => m[B]).join("") + e + m.reset;
}
function r() {
  return o((/* @__PURE__ */ new Date()).toLocaleTimeString(), "gray") + " " + o("[Mock]", "cyan", "bold");
}
const t = {
  success(e) {
    return n.isLogSuccess && console.log(`${r()} `, o(e, "green"));
  },
  info(e) {
    return n.isLogInfo && console.log(`${r()} `, e);
  },
  wran(e) {
    return n.isLogWarn && console.log(`${r()}`, o(e, "yellow"));
  },
  error(e) {
    return console.log(`${r()}`, o(e, "red"));
  }
};
export {
  o as colorize,
  t as logger
};
