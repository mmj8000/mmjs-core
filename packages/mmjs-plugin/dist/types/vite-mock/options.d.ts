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
};
export declare const _initServerConfig: InitServerConfig;
export declare const serverConfig: InitServerConfig;
export declare const logLevelState: {
    isLogWarn: boolean;
    isLogInfo: boolean;
    isLogSuccess: boolean;
};
export declare function updateLogLevelState(): void;
export declare const allowCharset: BufferEncoding[];
export declare const allowExt: readonly [".js", ".ts", ".json"];
export declare const customContentTypeToExt: {
    'text/event-stream': string;
};
