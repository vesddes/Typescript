type DeepMutable<T> = {
    -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

type PickByValueType<T, ValueType> = {
    [K in keyof T as T[K] extends ValueType ? K : never]: T[K];
};

type OmitByValueType<T, ValueType> = {
    [K in keyof T as T[K] extends ValueType ? never : K]: T[K];
};

type CustomReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never;
// type CustomReturnType<T extends (...args: any) => any> = ReturnType<T>;


type ExtendedCustomReturnType<T extends (...args: any[]) => any> = T extends (...args: infer P) => infer R ? [R, P] : never;
