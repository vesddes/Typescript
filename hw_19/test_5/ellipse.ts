import { EllipticalFigure } from "./figure";


export class Ellipse extends EllipticalFigure {
    constructor(
        public readonly majorAxis: number,
        public readonly minorAxis: number,
        color: string
    ) {
        super('Ellipse', color);
    }

    calculateArea(): number {
        return Math.PI * this.majorAxis * this.minorAxis;
    }

    calculatePerimeter(): number {
        return Math.PI * (3 * (this.majorAxis + this.minorAxis) - Math.sqrt((3 * this.majorAxis + this.minorAxis) * (this.majorAxis + 3 * this.minorAxis)));
    }

    printDiameter(): void {
        console.log(`Major Axis Diameter: ${2 * this.majorAxis}`);
        console.log(`Minor Axis Diameter: ${2 * this.minorAxis}`);
    }
}