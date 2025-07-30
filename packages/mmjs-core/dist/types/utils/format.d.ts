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
/**
 *
 * @param val
 * @param unit
 * @example
 * normalizeNumUnit(12) // 12px
 * normalizeNumUnit('12px') // 12px
 * normalizeNumUnit(12, 'rem') // 12rem
 * @returns
 */
export declare function normalizeNumUnit(val: number | string, unit?: string): string | number;
