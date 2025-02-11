type Action =
    | { type: 'CREATE_USER'; payload: { name: string; age: number } }
    | { type: 'DELETE_USER'; payload: { userId: number } }
    | { type: 'UPDATE_USER'; payload: { userId: number; name?: string; age?: number } }
    | { type: 'BLOCK_USER'; payload: { userId: number; reason: string } };

function handleAction(action: Action): void {
    switch (action.type) {
        case 'CREATE_USER':
            console.log(`Creating user: Name: ${action.payload.name}, Age: ${action.payload.age}`);
            break;
        case 'DELETE_USER':
            console.log(`Deleting user with ID: ${action.payload.userId}`);
            break;
        case 'UPDATE_USER':
            console.log(`Updating user with ID: ${action.payload.userId}`);
            if (action.payload.name !== undefined) {
                console.log(`New name: ${action.payload.name}`);
            }
            if (action.payload.age !== undefined) {
                console.log(`New age: ${action.payload.age}`);
            }
            break;
        case 'BLOCK_USER':
            console.log(`Blocking user with ID: ${action.payload.userId}, Reason: ${action.payload.reason}`);
            break;
        default:
            const _exhaustiveCheck: never = action;
            throw new Error(`Error action type: ${_exhaustiveCheck}`);
    }
}
