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
export function keepDecimals(num: number, count = 2, round = false) {
    let newNum = num;

    if (typeof newNum !== 'number') {
        newNum = Number(newNum);
    }
    if (Number.isNaN(newNum)) {
        return 0;
    }

    if (round) {
        return Number(newNum.toFixed(count));
    }
    let [value, mv] = `${newNum}`.split('.');
    if (typeof count === 'number' && mv) {
        return Number(`${value}.${mv.slice(0, count)}`);
    }
    return Number(value);
}

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
export function normalizeNumUnit(val: number | string, unit = 'px') {
    if (typeof val === 'string') return val;
    return `${val}${unit}`;
}