import {GenericPolygon} from "./figure";

export class Triangle extends GenericPolygon {
    constructor(
        public readonly sideA: number,
        public readonly sideB: number,
        public readonly sideC: number,
        color: string
    ) {
        super('Triangle', color, [sideA, sideB, sideC]);
    }

    calculateArea(): number {
        const s = this.calculatePerimeter() / 2;
        return Math.sqrt(s * (s - this.sideA) * (s - this.sideB) * (s - this.sideC));
    }

    calculatePerimeter(): number {
        return this.sideA + this.sideB + this.sideC;
    }

    printAreaFormula(): void {
        console.log('Area = sqrt(s * (s - a) * (s - b) * (s - c))');
    }

    printTriangleType(): void {
        if (this.sideA === this.sideB && this.sideB === this.sideC) {
            console.log('Equilateral triangle');
        } else if (this.sideA === this.sideB || this.sideB === this.sideC || this.sideA === this.sideC) {
            console.log('Isosceles triangle');
        } else {
            console.log('Scalene triangle');
        }
    }

    calcHeight(): number {
        const s = this.calculatePerimeter() / 2;
        const area = this.calculateArea();
        return (2 * area) / this.sideA;
    }
}