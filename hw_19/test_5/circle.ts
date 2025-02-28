import { EllipticalFigure } from "./figure";

export class Circle extends EllipticalFigure {
    constructor(
        public readonly radius: number,
        color: string
    ) {
        super('Circle', color);
    }

    calculateArea(): number {
        return Math.PI * Math.pow(this.radius, 2);
    }

    calculatePerimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    printDiameter(): void {
        console.log(`Diameter: ${2 * this.radius}`);
    }
}