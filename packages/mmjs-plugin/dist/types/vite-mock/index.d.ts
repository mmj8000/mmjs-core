import { Plugin } from 'vite';
export interface PluginOptions {
    /**
     * @default "/mock"
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
    fileSuffix?: ".js" | ".ts";
    /**
     * @default 500
     */
    timeout?: number;
    /**
     * @default ["info", "succes", "wran"]
     */
    logLevel?: ("info" | "succes" | "wran")[];
}
export declare function createMockServer(options?: PluginOptions): Plugin;
