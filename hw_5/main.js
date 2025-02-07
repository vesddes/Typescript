var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Figure = /** @class */ (function () {
    function Figure(name, color) {
        this.name = name;
        this.color = color;
    }
    Figure.prototype.printInfo = function () {
        console.log("Figure: ".concat(this.name));
        console.log("Color: ".concat(this.color));
        console.log("Area: ".concat(this.calculateArea()));
        console.log("Perimeter: ".concat(this.calculatePerimeter()));
    };
    return Figure;
}());
var EllipticalFigure = /** @class */ (function (_super) {
    __extends(EllipticalFigure, _super);
    function EllipticalFigure() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EllipticalFigure;
}(Figure));
var GenericPolygon = /** @class */ (function (_super) {
    __extends(GenericPolygon, _super);
    function GenericPolygon(name, color, sides) {
        var _this = _super.call(this, name, color) || this;
        _this.sides = sides;
        return _this;
    }
    GenericPolygon.prototype.getNumberOfSides = function () {
        return this.sides.length;
    };
    return GenericPolygon;
}(Figure));
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(radius, color) {
        var _this = _super.call(this, 'Circle', color) || this;
        _this.radius = radius;
        return _this;
    }
    Circle.prototype.calculateArea = function () {
        return Math.PI * Math.pow(this.radius, 2);
    };
    Circle.prototype.calculatePerimeter = function () {
        return 2 * Math.PI * this.radius;
    };
    Circle.prototype.printDiameter = function () {
        console.log("Diameter: ".concat(2 * this.radius));
    };
    return Circle;
}(EllipticalFigure));
var Ellipse = /** @class */ (function (_super) {
    __extends(Ellipse, _super);
    function Ellipse(majorAxis, minorAxis, color) {
        var _this = _super.call(this, 'Ellipse', color) || this;
        _this.majorAxis = majorAxis;
        _this.minorAxis = minorAxis;
        return _this;
    }
    Ellipse.prototype.calculateArea = function () {
        return Math.PI * this.majorAxis * this.minorAxis;
    };
    Ellipse.prototype.calculatePerimeter = function () {
        return Math.PI * (3 * (this.majorAxis + this.minorAxis) - Math.sqrt((3 * this.majorAxis + this.minorAxis) * (this.majorAxis + 3 * this.minorAxis)));
    };
    Ellipse.prototype.printDiameter = function () {
        console.log("Major Axis Diameter: ".concat(2 * this.majorAxis));
        console.log("Minor Axis Diameter: ".concat(2 * this.minorAxis));
    };
    return Ellipse;
}(EllipticalFigure));
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(width, height, color) {
        var _this = _super.call(this, 'Rectangle', color, [width, height, width, height]) || this;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    Rectangle.prototype.calculateArea = function () {
        return this.width * this.height;
    };
    Rectangle.prototype.calculatePerimeter = function () {
        return 2 * (this.width + this.height);
    };
    Rectangle.prototype.printAreaFormula = function () {
        console.log('Area = width * height');
    };
    return Rectangle;
}(GenericPolygon));
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(sideLength, color) {
        var _this = _super.call(this, sideLength, sideLength, color) || this;
        _this.name = 'Square';
        return _this;
    }
    Square.prototype.printAreaFormula = function () {
        console.log('Area = sideLength^2');
    };
    return Square;
}(Rectangle));
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    function Triangle(sideA, sideB, sideC, color) {
        var _this = _super.call(this, 'Triangle', color, [sideA, sideB, sideC]) || this;
        _this.sideA = sideA;
        _this.sideB = sideB;
        _this.sideC = sideC;
        return _this;
    }
    Triangle.prototype.calculateArea = function () {
        var s = this.calculatePerimeter() / 2;
        return Math.sqrt(s * (s - this.sideA) * (s - this.sideB) * (s - this.sideC));
    };
    Triangle.prototype.calculatePerimeter = function () {
        return this.sideA + this.sideB + this.sideC;
    };
    Triangle.prototype.printAreaFormula = function () {
        console.log('Area = sqrt(s * (s - a) * (s - b) * (s - c))');
    };
    Triangle.prototype.printTriangleType = function () {
        if (this.sideA === this.sideB && this.sideB === this.sideC) {
            console.log('Equilateral triangle');
        }
        else if (this.sideA === this.sideB || this.sideB === this.sideC || this.sideA === this.sideC) {
            console.log('Isosceles triangle');
        }
        else {
            console.log('Scalene triangle');
        }
    };
    Triangle.prototype.calcHeight = function () {
        var s = this.calculatePerimeter() / 2;
        var area = this.calculateArea();
        return (2 * area) / this.sideA;
    };
    return Triangle;
}(GenericPolygon));
var Polygon = /** @class */ (function (_super) {
    __extends(Polygon, _super);
    function Polygon(sides, color) {
        return _super.call(this, 'Polygon', color, sides) || this;
    }
    Polygon.prototype.calculatePerimeter = function () {
        return this.sides.reduce(function (acc, side) { return acc + side; }, 0);
    };
    Polygon.prototype.printAreaFormula = function () {
        console.log('Area formula depends on the polygon type.');
    };
    Polygon.prototype.calculateArea = function () {
        throw new Error("Area calculation for arbitrary polygon is not implemented");
    };
    return Polygon;
}(GenericPolygon));
var circle = new Circle(5, 'red');
circle.printInfo();
circle.printDiameter();
var ellipse = new Ellipse(6, 4, 'blue');
ellipse.printInfo();
ellipse.printDiameter();
var rectangle = new Rectangle(4, 6, 'green');
rectangle.printInfo();
rectangle.printAreaFormula();
var square = new Square(4, 'yellow');
square.printInfo();
square.printAreaFormula();
