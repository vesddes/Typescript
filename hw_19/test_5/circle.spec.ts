import { describe, it, expect } from '@jest/globals';
import { Circle } from './circle';

describe('Circle Tests', () => {
    it('should calculate the area of a Circle correctly', () => {
        const circle = new Circle(5, 'red');
        expect(circle.calculateArea()).toBeCloseTo(Math.PI * 5 * 5, 5);
    });

    it('should calculate the perimeter of a Circle correctly', () => {
        const circle = new Circle(5, 'red');
        expect(circle.calculatePerimeter()).toBeCloseTo(2 * Math.PI * 5, 5);
    });
});
