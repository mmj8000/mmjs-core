/**
 * @deprecated 已经迁移到 mmjs-share package
 */
declare const useparseUrlParams: (url?: string, options?: {
    includeHashParams?: boolean;
}) => Record<string, string | boolean | string[]>;
export { useparseUrlParams as parseUrlParams, };
