/**
 *
 * @param num 数值
 * @param count 小数
 * @param round 4舍5入
 * @example
 * keepDecimals(100.322, 2) // 100.32
 * keepDecimals(100.388888888, 2, true) // 100.39
 * @returns
 */
export declare function keepDecimals(num: number, count?: number, round?: boolean): number;
