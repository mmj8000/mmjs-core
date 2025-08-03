const o = {
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
  encoding: "utf-8"
}, e = Object.assign({}, o), s = {
  isLogWarn: !0,
  isLogInfo: !0,
  isLogSuccess: !0
};
function t() {
  s.isLogWarn = e.logLevel.includes("wran"), s.isLogInfo = e.logLevel.includes("info"), s.isLogSuccess = e.logLevel.includes("succes");
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
], i = [
  ".js",
  ".ts",
  ".json"
];
export {
  o as _initServerConfig,
  n as allowCharset,
  i as allowExt,
  s as logLevelState,
  e as serverConfig,
  t as updateLogLevelState
};
