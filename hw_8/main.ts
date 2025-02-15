type Result<T> =
    | { status: "success"; data: T }
    | { status: "error"; error: string };

function handleResult<T>(result: Result<T>): T {
    if (result.status === "success") {
        return result.data;
    } else {
        throw new Error(result.error);
    }
}

class Queue<T> {
    private items: T[] = [];

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    peek(): T | undefined {
        return this.items[0];
    }

    size(): number {
        return this.items.length;
    }
}


function sortArray<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
    return [...arr].sort(compareFn);
}


function extractProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}


interface Identifiable {
    id: number;
}

class Repository<T extends Identifiable> {
    private items: Map<number, T> = new Map();

    add(item: T): void {
        this.items.set(item.id, item);
    }

    getById(id: number): T | undefined {
        return this.items.get(id);
    }

    removeById(id: number): boolean {
        return this.items.delete(id);
    }

    getAll(): T[] {
        return Array.from(this.items.values());
    }
}


class User implements Identifiable {
    constructor(public id: number, public name: string) {}
}

class Product implements Identifiable {
    constructor(public id: number, public title: string, public price: number) {}
}

const userRepo = new Repository<User>();
userRepo.add(new User(1, "Ainur"));
userRepo.add(new User(2, "Rodion"));

const productRepo = new Repository<Product>();
productRepo.add(new Product(51, "Table", 4500));
productRepo.add(new Product(52, "Sofa", 1000));

console.log(userRepo.getById(1));
console.log(productRepo.getAll());
