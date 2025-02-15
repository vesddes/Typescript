var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function handleResult(result) {
    if (result.status === "success") {
        return result.data;
    }
    else {
        throw new Error(result.error);
    }
}
var Queue = /** @class */ (function () {
    function Queue() {
        this.items = [];
    }
    Queue.prototype.enqueue = function (item) {
        this.items.push(item);
    };
    Queue.prototype.dequeue = function () {
        return this.items.shift();
    };
    Queue.prototype.peek = function () {
        return this.items[0];
    };
    Queue.prototype.size = function () {
        return this.items.length;
    };
    return Queue;
}());
function sortArray(arr, compareFn) {
    return __spreadArray([], arr, true).sort(compareFn);
}
function extractProperty(obj, key) {
    return obj[key];
}
var Repository = /** @class */ (function () {
    function Repository() {
        this.items = new Map();
    }
    Repository.prototype.add = function (item) {
        this.items.set(item.id, item);
    };
    Repository.prototype.getById = function (id) {
        return this.items.get(id);
    };
    Repository.prototype.removeById = function (id) {
        return this.items.delete(id);
    };
    Repository.prototype.getAll = function () {
        return Array.from(this.items.values());
    };
    return Repository;
}());
var User = /** @class */ (function () {
    function User(id, name) {
        this.id = id;
        this.name = name;
    }
    return User;
}());
var Product = /** @class */ (function () {
    function Product(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
    return Product;
}());
var userRepo = new Repository();
userRepo.add(new User(1, "Ainur"));
userRepo.add(new User(2, "Rodion"));
var productRepo = new Repository();
productRepo.add(new Product(51, "Table", 4500));
productRepo.add(new Product(52, "Sofa", 1000));
console.log(userRepo.getById(1));
console.log(productRepo.getAll());
