import 'reflect-metadata';

function DeprecatedMethod(reason: string, alternative?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            console.warn(`Method ${propertyKey} is deprecated. ${reason}`);
            if (alternative) {
                console.warn(`Use ${alternative} instead.`);
            }
            return originalMethod.apply(this, args);
        };
    };
}


function MinLength(length: number) {
    return function (target: any, propertyKey: string) {
        let value: string;
        Object.defineProperty(target, propertyKey, {
            get: () => value,
            set: (newValue: string) => {
                if (newValue.length < length) {
                    throw new Error(`${propertyKey} must be at least ${length} characters long.`);
                }
                value = newValue;
            },
        });
    };
}

function MaxLength(length: number) {
    return function (target: any, propertyKey: string) {
        let value: string;
        Object.defineProperty(target, propertyKey, {
            get: () => value,
            set: (newValue: string) => {
                if (newValue.length > length) {
                    throw new Error(`${propertyKey} must be at most ${length} characters long.`);
                }
                value = newValue;
            },
        });
    };
}

function Email(target: any, propertyKey: string) {
    let value: string;
    Object.defineProperty(target, propertyKey, {
        get: () => value,
        set: (newValue: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(newValue)) {
                throw new Error(`${propertyKey} must be a valid email address.`);
            }
            value = newValue;
        },
    });
}


function Validate() {
    return function (target: any, propertyKey: string) {
        let value: string;
        const validators: Function[] = Reflect.getMetadata("validators", target, propertyKey) || [];

        Object.defineProperty(target, propertyKey, {
            get: () => value,
            set: (newValue: string) => {
                for (const validator of validators) {
                    validator(newValue, propertyKey);
                }
                value = newValue;
            },
        });
    };
}

function MinLengthExperimental(length: number) {
    return function (target: any, propertyKey: string) {
        const validators = Reflect.getMetadata("validators", target, propertyKey) || [];
        validators.push((value: string, key: string) => {
            if (value.length < length) {
                throw new Error(`${key} must be at least ${length} characters long.`);
            }
        });
        Reflect.defineMetadata("validators", validators, target, propertyKey);
    };
}

function MaxLengthExperimental(length: number) {
    return function (target: any, propertyKey: string) {
        const validators = Reflect.getMetadata("validators", target, propertyKey) || [];
        validators.push((value: string, key: string) => {
            if (value.length > length) {
                throw new Error(`${key} must be at most ${length} characters long.`);
            }
        });
        Reflect.defineMetadata("validators", validators, target, propertyKey);
    };
}

function EmailExperimental(target: any, propertyKey: string) {
    const validators = Reflect.getMetadata("validators", target, propertyKey) || [];
    validators.push((value: string, key: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error(`${key} must be a valid email address.`);
        }
    });
    Reflect.defineMetadata("validators", validators, target, propertyKey);
}









class User {
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @Email
    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    @DeprecatedMethod("This method is obsolete.", "newMethod")
    oldMethod() {
        console.log("Old method logic.");
    }

    newMethod() {
        console.log("New method logic.");
    }
}

const user = new User("Ainur", "ainur@example.com");
user.oldMethod();

const invalidUser = new User("Jo", "invalidEmail");
