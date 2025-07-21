
import { describe, expect, it, test } from 'vitest';
import {
    keepDecimals,
} from 'mmjs-core';

describe('小数点格式函数', () => {
    it('测试保留小数两位', () => {
        expect(keepDecimals(100.3222, 2)).toBe(100.32)
        expect(keepDecimals(-100.3222, 2)).toBe(-100.32)
    });
    it('测试保留小数两位+四舍五入', () => {
        expect(keepDecimals(100.6666666662, 2, true)).toBe(100.67)
        expect(keepDecimals(-100.666666666, 2, true)).toBe(-100.67)
    });
});
