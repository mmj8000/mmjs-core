import { ViteDevServer } from 'vite';
import { ServerResponse } from 'node:http';
export declare function useProxyRes(server: ViteDevServer): void;
export declare function useResponseAppend(res: ServerResponse): void;
