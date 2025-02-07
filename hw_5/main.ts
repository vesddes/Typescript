abstract class Figure {
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

abstract class EllipticalFigure extends Figure {
    abstract printDiameter(): void;
}

abstract class GenericPolygon extends Figure {
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


class Circle extends EllipticalFigure {
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

class Ellipse extends EllipticalFigure {
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

class Rectangle extends GenericPolygon {
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

class Square extends Rectangle {
    constructor(
        sideLength: number,
        color: string
    ) {
        super(sideLength, sideLength, color);
        this.name = 'Square';
    }

    printAreaFormula(): void {
        console.log('Area = sideLength^2');
    }
}

class Triangle extends GenericPolygon {
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

class Polygon extends GenericPolygon {
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



const circle = new Circle(5, 'red');
circle.printInfo();
circle.printDiameter();

const ellipse = new Ellipse(6, 4, 'blue');
ellipse.printInfo();
ellipse.printDiameter();

const rectangle = new Rectangle(4, 6, 'green');
rectangle.printInfo();
rectangle.printAreaFormula();

const square = new Square(4, 'yellow');
square.printInfo();
square.printAreaFormula();


