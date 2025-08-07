export interface PluginOptions {
  /**
   * @default "/api"
   */
  apiPrefix?: string | string[];

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
   * 哪些mimetype 生成 .js or .ts 文件, 如： json、html
   * @default ["json"]
   */
  templateMimeType?: string[];

  /**
   * @default 'utf-8'
   */
  encoding?: BufferEncoding;

  /**
   * （动态参数的mock文件相关、只有普通类型接口文件设置false 即可）
   * @desc 动态文件$id相关，需要监测动态参数文件变化就开启，否则新增删除mock服务无法实时知道
   * 但动态参数接口不常用，建议关闭， 关闭后每次新增、删除动态参数文件（xxx/$id.js）,需要重新启动vite server 
   * @default false
   */
  watchDynamicFile?: boolean;
}
export type InitServerConfig = Required<PluginOptions> & {
  root: string;
}
export const _initServerConfig: InitServerConfig = {
  apiPrefix: "/api",
  forceMock: false,
  mockDir: "__mock__",
  fileExt: ".js",
  timeout: 500,
  logLevel: ["info", "succes", "wran"],
  scan: false,
  scanOutput: "_output",
  _esm: false,
  templateMimeType: ["json"],
  root: "",
  encoding: 'utf-8',
  watchDynamicFile: false,
};

export const serverConfig: InitServerConfig = Object.assign({}, _initServerConfig);

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

export const allowExt = [
  '.js',
  '.ts',
  '.json'
] as const;

export const customContentTypeToExt = {
  'text/event-stream': 'text'
}