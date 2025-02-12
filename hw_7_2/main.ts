function fetchData(): unknown {
    return { name: "Ainur", age: 25 };
}

// Type Guard
function isPerson(obj: unknown): obj is { name: string; age: number } {
    return typeof obj === "object" && obj !== null && "name" in obj && "age" in obj;
}

const rawData: unknown = fetchData();

let personData: { name: string; age: number };
if (isPerson(rawData)) {
    personData = rawData;
} else {
    throw new Error("Invalid data format");
}

// оператор as
function assertAs<T>(data: unknown): T {
    return data as T;
}

const dataAs = assertAs<{ name: string; age: number }>(fetchData());

// <>
function assertAngle<T>(data: unknown): T {
    return <T>data;
}

const dataAngle = assertAngle<{ name: string; age: number }>(fetchData());


// Assertion для Signature Assertion
function assertIsPerson(obj: unknown): asserts obj is { name: string; age: number } {
    if (!isPerson(obj)) {
        throw new Error("Object is not a Person")
    }
}

function printPersonInfo(person: unknown): void {
    assertIsPerson(person)
    console.log(`Name: ${person.name}, Age: ${person.age}`)
}

printPersonInfo(rawData);
printPersonInfo(personData);
printPersonInfo(dataAs);
printPersonInfo(dataAngle);


