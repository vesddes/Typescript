export interface ICalculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    divide(a: number, b: number): number;
    percent(value: number, percent: number): number;
    calculate(operation: "add" | "subtract" | "multiply" | "divide", a: number, b: number): number;
    calculate(operation: "percent", value: number, percent: number): number;
}

export class Calculator implements ICalculator {
    add(a: number, b: number): number {
        return a + b;
    }

    subtract(a: number, b: number): number {
        return a - b;
    }

    multiply(a: number, b: number): number {
        return a * b;
    }

    divide(a: number, b: number): number {
        if (b === 0) throw new Error("Division by zero is not allowed");
        return a / b;
    }

    percent(value: number, percent: number): number {
        return (value * percent) / 100;
    }

    calculate(operation: "add" | "subtract" | "multiply" | "divide", a: number, b: number): number;
    calculate(operation: "percent", value: number, percent: number): number;
    calculate(operation: string, a: number, b: number): number {
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
    }
}


// const calc = new Calculator();
// console.log(calc.add( 2, 2));
// console.log(calc.calculate("add", 55, 3));
// console.log(calc.calculate("subtract", 100, 33));
// console.log(calc.calculate("multiply", 8, 8));
// console.log(calc.calculate("divide", 1000, 100));
// console.log(calc.calculate("percent", 850, 15));
