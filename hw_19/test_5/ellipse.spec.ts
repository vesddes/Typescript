import { describe, it, expect } from '@jest/globals';
import { Ellipse } from './ellipse';

describe('Ellipse Tests', () => {
    it('should calculate the area of an Ellipse correctly', () => {
        const ellipse = new Ellipse(6, 4, 'blue');
        expect(ellipse.calculateArea()).toBeCloseTo(Math.PI * 6 * 4, 5);
    });

    it('should calculate the perimeter of an Ellipse correctly', () => {
        const ellipse = new Ellipse(6, 4, 'blue');
        expect(ellipse.calculatePerimeter()).toBeCloseTo(Math.PI * (3 * (6 + 4) - Math.sqrt((3 * 6 + 4) * (6 + 3 * 4))), 5);
    });

    it('should print diameters for major and minor axes', () => {
        console.log = jest.fn(); // Mock console.log
        const ellipse = new Ellipse(6, 4, 'blue');
        ellipse.printDiameter();
        expect(console.log).toHaveBeenCalledWith('Major Axis Diameter: 12');
        expect(console.log).toHaveBeenCalledWith('Minor Axis Diameter: 8');
    });
});
