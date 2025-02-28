export abstract class Figure {
    constructor(
        public readonly name: string,
        public readonly color: string
    ) {}

    abstract calculateArea(): number;
    abstract calculatePerimeter(): number;

    printInfo(): void {
        console.log(`Figure: ${this.name}`);
        console.log(`Color: ${this.color}`);
        console.log(`Area: ${this.calculateArea()}`);
        console.log(`Perimeter: ${this.calculatePerimeter()}`);
    }
}

export abstract class EllipticalFigure extends Figure {
    abstract printDiameter(): void;
}

export abstract class GenericPolygon extends Figure {
    constructor(
        name: string,
        color: string,
        public readonly sides: number[]
    ) {
        super(name, color);
    }

    getNumberOfSides(): number {
        return this.sides.length;
    }

    abstract calculatePerimeter(): number;
    abstract printAreaFormula(): void;
}