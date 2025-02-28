import {Rectangle} from "./rectangle";

export class Square extends Rectangle {
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