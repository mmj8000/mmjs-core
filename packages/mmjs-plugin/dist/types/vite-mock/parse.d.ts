import { IncomingMessage } from 'node:http';
declare module "http" {
    interface IncomingMessage {
        query: Record<string, any>;
        body: Record<string, any>;
        _parsedUrl?: URL;
    }
}
export declare function useParseQueryParams(req: IncomingMessage): boolean;
export declare function parseRequestBody(req: IncomingMessage): Promise<any>;
export declare function useParseBody(req: IncomingMessage): Promise<void>;
export declare function transformInnerCodeTempate(body: string): string;
