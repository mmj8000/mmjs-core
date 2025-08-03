import { Plugin } from 'vite';
import { PluginOptions } from './options';
import { IncomingMessage, ServerResponse } from 'node:http';
export declare function MockTemplate(req: IncomingMessage, res: ServerResponse<IncomingMessage>): Promise<any> | any;
export type CreateMockServer = {
    (config?: PluginOptions): Plugin;
    __dyMatchPaths: string[];
};
export declare const createMockServer: CreateMockServer;
