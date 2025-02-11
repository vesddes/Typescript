type User = {
    username: string;
    password: string;
};

type Guest = {
    sessionId: string;
};

type Admin = {
    username: string;
    password: string;
    role: "admin";
};

type ExternalUser = {
    oauthToken: string;
};



function isUser(entity: unknown): entity is User {
    return (
        typeof entity === "object" &&
        entity !== null &&
        "username" in entity &&
        "password" in entity
    );
}

function isGuest(entity: unknown): entity is Guest {
    return (
        typeof entity === "object" &&
        entity !== null &&
        "sessionId" in entity
    );
}

function isAdmin(entity: unknown): entity is Admin {
    return isUser(entity) && (entity as Admin).role === "admin";
}

function isExternalUser(entity: unknown): entity is ExternalUser {
    return (
        typeof entity === "object" &&
        entity !== null &&
        "oauthToken" in entity
    );
}



function login(entity: User | Guest | Admin | ExternalUser): void {
    if (isAdmin(entity)) {
        console.log(`Admin ${entity.username} logged in with role: ${entity.role}`);
    } else if (isUser(entity)) {
        console.log(`User ${entity.username} logged in.`);
    } else if (isGuest(entity)) {
        console.log(`Guest logged in with session ID: ${entity.sessionId}`);
    } else if (isExternalUser(entity)) {
        console.log(`External user logged in with OAuth token.`);
    } else {
        console.log("Unknown entity");
    }
}


login({ username: "John", password: "123456" });
login({ sessionId: "abc123" });
login({ username: "AdminUser", password: "pass", role: "admin" });
login({ oauthToken: "xyz789" });
login({ abrakadabra: "1222" });
