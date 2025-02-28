import { describe, it, expect } from '@jest/globals';
import { Rectangle } from './rectangle';

describe('Rectangle Tests', () => {
    it('should calculate the area of a Rectangle correctly', () => {
        const rectangle = new Rectangle(4, 6, 'green');
        expect(rectangle.calculateArea()).toBe(24);
    });

    it('should calculate the perimeter of a Rectangle correctly', () => {
        const rectangle = new Rectangle(4, 6, 'green');
        expect(rectangle.calculatePerimeter()).toBe(20);
    });

    it('should print the area formula correctly', () => {
        console.log = jest.fn(); // Mock console.log
        const rectangle = new Rectangle(4, 6, 'green');
        rectangle.printAreaFormula();
        expect(console.log).toHaveBeenCalledWith('Area = width * height');
    });
});
