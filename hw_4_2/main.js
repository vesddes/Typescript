var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.prototype.add = function (a, b) {
        return a + b;
    };
    Calculator.prototype.subtract = function (a, b) {
        return a - b;
    };
    Calculator.prototype.multiply = function (a, b) {
        return a * b;
    };
    Calculator.prototype.divide = function (a, b) {
        if (b === 0)
            throw new Error("Division by zero is not allowed");
        return a / b;
    };
    Calculator.prototype.percent = function (value, percent) {
        return (value * percent) / 100;
    };
    Calculator.prototype.calculate = function (operation, a, b) {
        switch (operation) {
            case "add":
                return this.add(a, b);
            case "subtract":
                return this.subtract(a, b);
            case "multiply":
                return this.multiply(a, b);
            case "divide":
                return this.divide(a, b);
            case "percent":
                return this.percent(a, b);
            default:
                throw new Error("Unknown operation");
        }
    };
    return Calculator;
}());
var calc = new Calculator();
console.log(calc.add(2, 2));
console.log(calc.calculate("add", 55, 3));
console.log(calc.calculate("subtract", 100, 33));
console.log(calc.calculate("multiply", 8, 8));
console.log(calc.calculate("divide", 1000, 100));
console.log(calc.calculate("percent", 850, 15));
