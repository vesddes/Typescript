import { describe, it, expect } from '@jest/globals';
import { Triangle } from './triangle';

describe('Triangle Tests', () => {
    it('should calculate the area of a Triangle correctly', () => {
        const triangle = new Triangle(3, 4, 5, 'orange');
        expect(triangle.calculateArea()).toBe(6);
    });

    it('should calculate the perimeter of a Triangle correctly', () => {
        const triangle = new Triangle(3, 4, 5, 'orange');
        expect(triangle.calculatePerimeter()).toBe(12);
    });

    it('should print the area formula correctly', () => {
        console.log = jest.fn(); // Mock console.log
        const triangle = new Triangle(3, 4, 5, 'orange');
        triangle.printAreaFormula();
        expect(console.log).toHaveBeenCalledWith('Area = sqrt(s * (s - a) * (s - b) * (s - c))');
    });

    it('should print the correct triangle type', () => {
        console.log = jest.fn(); // Mock console.log
        const equilateral = new Triangle(5, 5, 5, 'purple');
        equilateral.printTriangleType();
        expect(console.log).toHaveBeenCalledWith('Equilateral triangle');

        const isosceles = new Triangle(5, 5, 7, 'blue');
        isosceles.printTriangleType();
        expect(console.log).toHaveBeenCalledWith('Isosceles triangle');

        const scalene = new Triangle(3, 4, 5, 'green');
        scalene.printTriangleType();
        expect(console.log).toHaveBeenCalledWith('Scalene triangle');
    });
});
