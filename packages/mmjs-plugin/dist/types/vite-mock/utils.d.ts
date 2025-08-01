import { WriteFileOptions } from 'node:fs';
export declare function colorize(text: any, ...stylesToApply: any[]): string;
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
