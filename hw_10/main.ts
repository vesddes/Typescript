function sortArray<T>(arr: T[], compareFn: (a: T, b: T) => number): T[];
function sortArray<T, K extends keyof T>(arr: T[], key: K): T[];
function sortArray<T, K extends keyof T>(arr: T[], keyOrCompareFn: K | ((a: T, b: T) => number)): T[] {
    if (typeof keyOrCompareFn === "function") {
        return [...arr].sort(keyOrCompareFn);
    } else {
        return [...arr].sort((a, b) => {
            if (a[keyOrCompareFn] < b[keyOrCompareFn]) return -1;
            if (a[keyOrCompareFn] > b[keyOrCompareFn]) return 1;
            return 0;
        });
    }
}


type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};


type DeepRequireReadonly<T> = {
    readonly [K in keyof T]-?: T[K] extends object ? DeepRequireReadonly<T[K]> : T[K];
};


type PartialByKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;


type ReadonlyByKeys<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;


type MutableByKeys<T, K extends keyof T> = Omit<T, K> & {
    -readonly [P in K]: T[P];
};


type UpperCaseKeys<T> = {
    [K in keyof T as Uppercase<string & K>]: T[K];
};


type CustomPropertyDescriptor<T> = {
    value?: T;
    writable?: boolean;
    get?: () => T;
    set?: (value: T) => void;
    configurable?: boolean;
    enumerable?: boolean;
};

type ObjectToPropertyDescriptor<T> = {
    [K in keyof T]: CustomPropertyDescriptor<T[K]>;
};


