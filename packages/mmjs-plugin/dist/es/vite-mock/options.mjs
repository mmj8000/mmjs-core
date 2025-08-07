const t = {
  apiPrefix: "/api",
  forceMock: !1,
  mockDir: "__mock__",
  fileExt: ".js",
  timeout: 500,
  logLevel: ["info", "succes", "wran"],
  scan: !1,
  scanOutput: "_output",
  _esm: !1,
  templateMimeType: ["json"],
  root: "",
  encoding: "utf-8",
  watchDynamicFile: !1,
  multiParameter: "none",
  downloadExtensions: [".xlsx", ".docx", ".pdf", ".zip", ".doc", ".csv"]
}, e = Object.assign(
  {},
  t
), o = {
  isLogWarn: !0,
  isLogInfo: !0,
  isLogSuccess: !0
};
function s() {
  o.isLogWarn = e.logLevel.includes("wran"), o.isLogInfo = e.logLevel.includes("info"), o.isLogSuccess = e.logLevel.includes("succes");
}
const n = [
  "utf-8",
  "ascii",
  "utf8",
  "utf16le",
  "utf-16le",
  "ucs2",
  "ucs-2",
  "base64",
  "base64url",
  "latin1",
  "binary",
  "hex"
], c = [".js", ".ts", ".json"], i = {
  "text/event-stream": "text"
}, l = ["no such file", "Cannot find module"], a = "Mock Not enabled";
export {
  t as _initServerConfig,
  n as allowCharset,
  c as allowExt,
  i as customContentTypeToExt,
  o as logLevelState,
  a as mockNoEnabledStr,
  l as notFileErrMsg,
  e as serverConfig,
  s as updateLogLevelState
};
