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
     * 哪些mimetype 生成 .js or .ts 文件, 如： json、html
     * @default ["json"]
     */
    templateMimeType?: string[];
    /**
     * @default 'utf-8'
     */
    encoding?: BufferEncoding;
}
export declare const serverConfig: Required<PluginOptions> & {
    root: string;
};
export declare const logLevelState: {
    isLogWarn: boolean;
    isLogInfo: boolean;
    isLogSuccess: boolean;
};
export declare function updateLogLevelState(): void;
export declare const allowCharset: BufferEncoding[];
export declare const allowExt: readonly [".js", ".ts", ".json"];
