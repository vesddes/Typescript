function fetchData() {
    return { name: "Ainur", age: 25 };
}
// Type Guard
function isPerson(obj) {
    return typeof obj === "object" && obj !== null && "name" in obj && "age" in obj;
}
var rawData = fetchData();
var personData;
if (isPerson(rawData)) {
    personData = rawData;
}
else {
    throw new Error("Invalid data format");
}
// оператор as
function assertAs(data) {
    return data;
}
var dataAs = assertAs(fetchData());
// <>
function assertAngle(data) {
    return data;
}
var dataAngle = assertAngle(fetchData());
// Assertion для Signature Assertion
function assertIsPerson(obj) {
    if (!isPerson(obj)) {
        throw new Error("Object is not a Person");
    }
}
function printPersonInfo(person) {
    assertIsPerson(person);
    console.log("Name: ".concat(person.name, ", Age: ").concat(person.age));
}
printPersonInfo(rawData);
printPersonInfo(personData);
printPersonInfo(dataAs);
printPersonInfo(dataAngle);
