const styles = {
  // 文本颜色
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  gray: "\x1b[90m",

  // 背景颜色
  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",

  // 样式
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",
  underline: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
};

export function colorize(text, ...stylesToApply) {
  return stylesToApply.map((s) => styles[s]).join("") + text + styles.reset;
}

function uniBeforeStrLog() {
  return (
    colorize(new Date().toLocaleTimeString(), "gray") +
    " " +
    colorize("[Mock]", "cyan", "bold")
  );
}
export const logger = {
  success(data) {
    return console.log(`${uniBeforeStrLog()} `, colorize(data, "green"));
  },
  info(data) {
    return console.log(`${uniBeforeStrLog()} `, data);
  },
  wran(data) {
    return console.log(`${uniBeforeStrLog()}`, colorize(data, "yellow"));
  },
  error(data) {
    return console.log(`${uniBeforeStrLog()}`, colorize(data, "red"));
  },
};
