"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function DeprecatedMethod(reason, alternative) {
    return function (target, propertyKey, descriptor) {
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.warn("Method ".concat(propertyKey, " is deprecated. ").concat(reason));
            if (alternative) {
                console.warn("Use ".concat(alternative, " instead."));
            }
            return originalMethod.apply(this, args);
        };
    };
}
function MinLength(length) {
    return function (target, propertyKey) {
        var value;
        Object.defineProperty(target, propertyKey, {
            get: function () { return value; },
            set: function (newValue) {
                if (newValue.length < length) {
                    throw new Error("".concat(propertyKey, " must be at least ").concat(length, " characters long."));
                }
                value = newValue;
            },
        });
    };
}
function MaxLength(length) {
    return function (target, propertyKey) {
        var value;
        Object.defineProperty(target, propertyKey, {
            get: function () { return value; },
            set: function (newValue) {
                if (newValue.length > length) {
                    throw new Error("".concat(propertyKey, " must be at most ").concat(length, " characters long."));
                }
                value = newValue;
            },
        });
    };
}
function Email(target, propertyKey) {
    var value;
    Object.defineProperty(target, propertyKey, {
        get: function () { return value; },
        set: function (newValue) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(newValue)) {
                throw new Error("".concat(propertyKey, " must be a valid email address."));
            }
            value = newValue;
        },
    });
}
function Validate() {
    return function (target, propertyKey) {
        var value;
        var validators = Reflect.getMetadata("validators", target, propertyKey) || [];
        Object.defineProperty(target, propertyKey, {
            get: function () { return value; },
            set: function (newValue) {
                for (var _i = 0, validators_1 = validators; _i < validators_1.length; _i++) {
                    var validator = validators_1[_i];
                    validator(newValue, propertyKey);
                }
                value = newValue;
            },
        });
    };
}
function MinLengthExperimental(length) {
    return function (target, propertyKey) {
        var validators = Reflect.getMetadata("validators", target, propertyKey) || [];
        validators.push(function (value, key) {
            if (value.length < length) {
                throw new Error("".concat(key, " must be at least ").concat(length, " characters long."));
            }
        });
        Reflect.defineMetadata("validators", validators, target, propertyKey);
    };
}
function MaxLengthExperimental(length) {
    return function (target, propertyKey) {
        var validators = Reflect.getMetadata("validators", target, propertyKey) || [];
        validators.push(function (value, key) {
            if (value.length > length) {
                throw new Error("".concat(key, " must be at most ").concat(length, " characters long."));
            }
        });
        Reflect.defineMetadata("validators", validators, target, propertyKey);
    };
}
function EmailExperimental(target, propertyKey) {
    var validators = Reflect.getMetadata("validators", target, propertyKey) || [];
    validators.push(function (value, key) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error("".concat(key, " must be a valid email address."));
        }
    });
    Reflect.defineMetadata("validators", validators, target, propertyKey);
}
var User = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _oldMethod_decorators;
    return _a = /** @class */ (function () {
            function User(name, email) {
                this.name = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _name_initializers, void 0));
                this.email = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                __runInitializers(this, _email_extraInitializers);
                this.name = name;
                this.email = email;
            }
            User.prototype.oldMethod = function () {
                console.log("Old method logic.");
            };
            User.prototype.newMethod = function () {
                console.log("New method logic.");
            };
            return User;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [MinLength(3), MaxLength(20)];
            _email_decorators = [Email];
            _oldMethod_decorators = [DeprecatedMethod("This method is obsolete.", "newMethod")];
            __esDecorate(_a, null, _oldMethod_decorators, { kind: "method", name: "oldMethod", static: false, private: false, access: { has: function (obj) { return "oldMethod" in obj; }, get: function (obj) { return obj.oldMethod; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var user = new User("Ainur", "ainur@example.com");
user.oldMethod();
var invalidUser = new User("Jo", "invalidEmail");
