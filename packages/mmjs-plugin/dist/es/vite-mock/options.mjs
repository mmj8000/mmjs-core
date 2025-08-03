const s = {
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
  watchDynamicFile: !1
}, e = Object.assign({}, s), t = {
  isLogWarn: !0,
  isLogInfo: !0,
  isLogSuccess: !0
};
function o() {
  t.isLogWarn = e.logLevel.includes("wran"), t.isLogInfo = e.logLevel.includes("info"), t.isLogSuccess = e.logLevel.includes("succes");
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
], c = [
  ".js",
  ".ts",
  ".json"
], i = {
  "text/event-stream": "text"
};
export {
  s as _initServerConfig,
  n as allowCharset,
  c as allowExt,
  i as customContentTypeToExt,
  t as logLevelState,
  e as serverConfig,
  o as updateLogLevelState
};
