import { WriteFileOptions } from 'node:fs';
import { IncomingMessage, ServerResponse } from 'node:http';
export declare function colorize(text: any, ...stylesToApply: any[]): string;
export declare function uniBeforeStrLog(): string;
export declare const non_write_loggger: {
    success(data: any): false | void;
    info(data: any): false | void;
    wran(data: any): false | void;
    error(data: any): void;
};
export declare const logger: {
    success(data: any): void;
    info(data: any): void;
    wran(data: any): void;
    error(data: any): void;
};
export declare function existsSyncByMkdir(file: string): void;
export declare function writeMockFile(file: string, data: string | NodeJS.ArrayBufferView, options: WriteFileOptions, print?: boolean): void;
export declare function appendFileFn(file: string, data: string, options: WriteFileOptions, print?: boolean): Promise<void>;
export declare function safeUrlToFilename(url: any): string;
export declare function useContentType(contentType: string | undefined): {
    charset: BufferEncoding;
    encoding: BufferEncoding;
    isInnerTempType: boolean;
    fileExt: string;
    mimeType: any;
};
export declare function getContentTypeByPath(readPath: string): any;
export declare function findMatchingTemplatePath(paths: string[], userUrl: string): string | null;
export declare function fileExists(filePath: string): boolean;
export declare function getHeaderMimeTypeKey(req: IncomingMessage): "accept" | "content-type";
export declare function esmImport(readPath: string): Promise<any>;
export declare function cjsImport(readPath: string): Promise<any>;
export declare let dynamicImport: (readPath: string) => Promise<{
    enabled: boolean;
    mock: (req: IncomingMessage, res: ServerResponse) => any;
} | any>;
