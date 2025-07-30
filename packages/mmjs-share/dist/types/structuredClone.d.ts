type StructuredCloneable = null | undefined | boolean | number | string | Date | RegExp | ArrayBuffer | Blob | File | ImageBitmap | Map<unknown, unknown> | Set<unknown> | Array<StructuredCloneable> | {
    [key: string]: StructuredCloneable;
} | object;
interface StructuredCloneOptions {
    transfer?: Transferable[];
}
export declare const structuredClonePolyfill: <T extends StructuredCloneable>(value: T, options?: StructuredCloneOptions) => T;
export {};
