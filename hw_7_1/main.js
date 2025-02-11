function isUser(entity) {
    return (typeof entity === "object" &&
        entity !== null &&
        "username" in entity &&
        "password" in entity);
}
function isGuest(entity) {
    return (typeof entity === "object" &&
        entity !== null &&
        "sessionId" in entity);
}
function isAdmin(entity) {
    return isUser(entity) && entity.role === "admin";
}
function isExternalUser(entity) {
    return (typeof entity === "object" &&
        entity !== null &&
        "oauthToken" in entity);
}
function login(entity) {
    if (isAdmin(entity)) {
        console.log("Admin ".concat(entity.username, " logged in with role: ").concat(entity.role));
    }
    else if (isUser(entity)) {
        console.log("User ".concat(entity.username, " logged in."));
    }
    else if (isGuest(entity)) {
        console.log("Guest logged in with session ID: ".concat(entity.sessionId));
    }
    else if (isExternalUser(entity)) {
        console.log("External user logged in with OAuth token.");
    }
    else {
        console.log("Unknown entity");
    }
}
login({ username: "John", password: "123456" });
login({ sessionId: "abc123" });
login({ username: "AdminUser", password: "pass", role: "admin" });
login({ oauthToken: "xyz789" });
login({ abrakadabra: "1222" });
