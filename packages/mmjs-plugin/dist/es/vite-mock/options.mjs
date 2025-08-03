const e = {
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
}, s = {
  isLogWarn: !0,
  isLogInfo: !0,
  isLogSuccess: !0
};
function o() {
  s.isLogWarn = e.logLevel.includes("wran"), s.isLogInfo = e.logLevel.includes("info"), s.isLogSuccess = e.logLevel.includes("succes");
}
const t = [
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
], l = [
  ".js",
  ".ts",
  ".json"
];
export {
  t as allowCharset,
  l as allowExt,
  s as logLevelState,
  e as serverConfig,
  o as updateLogLevelState
};
