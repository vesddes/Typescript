import { describe, it, expect } from '@jest/globals';
import { Polygon } from './polygon';

describe('Polygon Tests', () => {
    it('should calculate the perimeter of a Polygon correctly', () => {
        const polygon = new Polygon([4, 6, 8], 'purple');
        expect(polygon.calculatePerimeter()).toBe(18);
    });

    it('should throw an error when trying to calculate the area of a Polygon', () => {
        const polygon = new Polygon([4, 6, 8], 'purple');
        expect(() => polygon.calculateArea()).toThrowError('Area calculation for arbitrary polygon is not implemented');
    });

    it('should print the area formula correctly', () => {
        console.log = jest.fn(); // Mock console.log
        const polygon = new Polygon([4, 6, 8], 'purple');
        polygon.printAreaFormula();
        expect(console.log).toHaveBeenCalledWith('Area formula depends on the polygon type.');
    });
});
