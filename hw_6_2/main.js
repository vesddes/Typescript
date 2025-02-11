function handleAction(action) {
    switch (action.type) {
        case 'CREATE_USER':
            console.log("Creating user: Name: ".concat(action.payload.name, ", Age: ").concat(action.payload.age));
            break;
        case 'DELETE_USER':
            console.log("Deleting user with ID: ".concat(action.payload.userId));
            break;
        case 'UPDATE_USER':
            console.log("Updating user with ID: ".concat(action.payload.userId));
            if (action.payload.name !== undefined) {
                console.log("New name: ".concat(action.payload.name));
            }
            if (action.payload.age !== undefined) {
                console.log("New age: ".concat(action.payload.age));
            }
            break;
        case 'BLOCK_USER':
            console.log("Blocking user with ID: ".concat(action.payload.userId, ", Reason: ").concat(action.payload.reason));
            break;
        default:
            var _exhaustiveCheck = action;
            throw new Error("Error action type: ".concat(_exhaustiveCheck));
    }
}
