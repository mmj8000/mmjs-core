import { ViteDevServer } from 'vite';
export declare function useCors(allowOrigin?: string[]): {
    name: string;
    configureServer(server: ViteDevServer): void;
};
