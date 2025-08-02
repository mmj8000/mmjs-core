import { IncomingMessage } from 'node:http';
declare module "http" {
    interface IncomingMessage {
        query: Record<string, any>;
        /**
         * 注意：默认情况下只能被消费一次。读取了数据，后续中间件将无法再次获取 body，因为流已经被消耗。
         */
        body: Promise<any>;
        _parsedUrl?: URL;
    }
}
export declare function useParseQueryParams(req: IncomingMessage): void;
export declare function getCharset(req: IncomingMessage): BufferEncoding;
export declare function useParseBody(req: IncomingMessage): Promise<void>;
export declare function transformInnerCodeTempate(body: string, mimeType: string): string;
