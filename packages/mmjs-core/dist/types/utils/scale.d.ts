declare let _scaleOptions: {
    w: number;
    h: number;
    clientWidth: number;
    clientHeight: number;
};
export declare function setScaleOption(options: Partial<typeof _scaleOptions>): void;
export declare function getScaleOption(): {
    w: number;
    h: number;
    clientWidth: number;
    clientHeight: number;
};
/**
 *
 * @param value
* @example
 * scale(16) // 16 * ratio
 * @param dir
 */
export declare function scale(value: number, dir?: "x" | "y"): number;
/**
 *
 * @param value
 * @example
 * scale('16px') // 16px * ratio
 * @param dir
 */
export declare function scale(value: string, dir?: "x" | "y"): string;
export {};
