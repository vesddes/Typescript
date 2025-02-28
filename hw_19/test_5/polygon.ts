import {GenericPolygon} from "./figure";

export class Polygon extends GenericPolygon {
    constructor(
        sides: number[],
        color: string
    ) {
        super('Polygon', color, sides);
    }

    calculatePerimeter(): number {
        return this.sides.reduce((acc, side) => acc + side, 0);
    }

    printAreaFormula(): void {
        console.log('Area formula depends on the polygon type.');
    }

    calculateArea(): number {
        throw new Error("Area calculation for arbitrary polygon is not implemented");
    }
}