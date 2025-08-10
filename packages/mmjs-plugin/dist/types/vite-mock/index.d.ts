import { Plugin } from 'vite';
import { CustomIncomingMessage } from './parse';
import { PluginOptions } from './options';
import { IncomingMessage, ServerResponse } from 'node:http';
type ResEndFnType = {
    (cb?: () => void): CustomServerResponse;
    (chunk: any, cb?: () => void): CustomServerResponse;
    (chunk: any, encoding: BufferEncoding, cb?: () => void): CustomServerResponse;
};
type CustomServerResponse = ServerResponse & {
    send: ResEndFnType;
};
export declare function MockTemplate(req: IncomingMessage & CustomIncomingMessage, res: CustomServerResponse): Promise<any> | any;
export type CreateMockServer = {
    (config?: PluginOptions): Plugin;
    __dyMatchPaths: string[];
};
export declare const createMockServer: CreateMockServer;
export {};
