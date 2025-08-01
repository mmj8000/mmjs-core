export interface PluginOptions {
  /**
   * @default "/api"
   */
  apiPrefix?: string;

  /**
   * @default false
   */
  forceMock?: boolean;

  /**
   * @default "__mock__"
   */
  mockDir?: string;

  /**
   * @default ".js"
   */
  fileExt?: ".js" | ".ts" | ".json";
  /**
   * @default 500
   */
  timeout?: number;
  /**
   * @default ["info", 'succes', "wran"]
   */
  logLevel?: ("info" | "succes" | "wran")[];
  /**
   * @default false
   */
  scan?: boolean;
  /**
   * @default '_output'
   */
  scanOutput?: string;

  /**
   * 强制esm， 默认动态读取 package.json type 字段
   */
  _esm?: boolean;

  /**
   * scan 启用生效
   * 哪些mimetype 生成 .js or .ts 文件
   * @default []
   * @example
   * ["application/json"]
   */
  _templateMimeType?: [];

  /**
   * @default 'utf-8'
   */
  encoding?: BufferEncoding;
}

export const serverConfig: Required<PluginOptions> & {
  root: string;
} = {
  apiPrefix: "/api",
  forceMock: false,
  mockDir: "__mock__",
  fileExt: ".js",
  timeout: 500,
  logLevel: ["info", "succes", "wran"],
  scan: false,
  scanOutput: "_output",
  _esm: false,
  _templateMimeType: [],
  root: "",
  encoding: 'utf-8',
};

export const logLevelState = {
  isLogWarn: true,
  isLogInfo: true,
  isLogSuccess: true,
};

export function updateLogLevelState() {
  logLevelState.isLogWarn = serverConfig.logLevel.includes("wran");
  logLevelState.isLogInfo = serverConfig.logLevel.includes("info");
  logLevelState.isLogSuccess = serverConfig.logLevel.includes("succes");
}

export const allowCharset: BufferEncoding[] = [
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
  "hex",
] as const;
