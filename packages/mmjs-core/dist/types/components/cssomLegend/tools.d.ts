export declare function calculateViewBox(pathData?: string): string;
/**
 *
 * @param str
 * @example
 * const parsed = parseRichFormatString("{name|Union Ads}\n{test|测试}");
 * @returns
 */
export declare function parseRichFormatString(str: string): {
    type: "text" | "rich";
    content: string;
    name?: string;
}[];
