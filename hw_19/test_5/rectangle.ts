import {GenericPolygon} from "./figure";

export class Rectangle extends GenericPolygon {
    constructor(
        public readonly width: number,
        public readonly height: number,
        color: string
    ) {
        super('Rectangle', color, [width, height, width, height]);
    }

    calculateArea(): number {
        return this.width * this.height;
    }

    calculatePerimeter(): number {
        return 2 * (this.width + this.height);
    }

    printAreaFormula(): void {
        console.log('Area = width * height');
    }
}