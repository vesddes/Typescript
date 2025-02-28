import { describe, it, expect, beforeEach } from '@jest/globals';
import { Calculator } from './calculator';

describe('Calculator', () => {
    let calculator: Calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    it('should add two numbers correctly', () => {
        expect(calculator.add(2, 3)).toBe(5);
    });

    it('should subtract two numbers correctly', () => {
        expect(calculator.subtract(5, 3)).toBe(2);
    });

    it('should multiply two numbers correctly', () => {
        expect(calculator.multiply(3, 4)).toBe(12);
    });

    it('should divide two numbers correctly', () => {
        expect(calculator.divide(10, 2)).toBe(5);
    });

    it('should throw an error when dividing by zero', () => {
        expect(() => calculator.divide(10, 0)).toThrow('Division by zero is not allowed');
    });

    it('should calculate percentage correctly', () => {
        expect(calculator.percent(200, 15)).toBe(30);
    });

    it('should calculate addition using calculate method', () => {
        expect(calculator.calculate('add', 10, 5)).toBe(15);
    });

    it('should calculate subtraction using calculate method', () => {
        expect(calculator.calculate('subtract', 10, 5)).toBe(5);
    });

    it('should calculate multiplication using calculate method', () => {
        expect(calculator.calculate('multiply', 10, 5)).toBe(50);
    });

    it('should calculate division using calculate method', () => {
        expect(calculator.calculate('divide', 10, 5)).toBe(2);
    });

    it('should calculate percentage using calculate method', () => {
        expect(calculator.calculate('percent', 200, 10)).toBe(20);
    });

    it('should throw an error for unknown operations in calculate method', () => {
        expect(() => calculator.calculate('unknown' as any, 10, 5)).toThrow('Unknown operation');
    });
});
