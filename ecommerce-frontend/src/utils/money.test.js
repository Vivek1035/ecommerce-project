import { it, expect, describe } from 'vitest';
import { formatCurrency } from './money';

describe('formatCurrency', () => {
    it('formats 1999 cents into $19.99', () => {
        expect(formatCurrency(1999)).toBe('$19.99');
    });

    it('display 2 decimals', () => {
        expect(formatCurrency(1090)).toBe('$10.90');
        expect(formatCurrency(100)).toBe('$1.00');
    });

    it('works with the number 0', () => {
        expect(formatCurrency(0)).toBe('$0.00');
    });

    it('works with the negative number', () => {
        expect(formatCurrency(-999)).toBe('-$9.99');
        expect(formatCurrency(-100)).toBe('-$1.00');
    });
});
