var Todo = /** @class */ (function () {
    function Todo(title, content, requiresConfirmation) {
        if (requiresConfirmation === void 0) { requiresConfirmation = false; }
        if (!title.trim() || !content.trim()) {
            throw new Error("Заголовок та зміст не можуть бути порожніми");
        }
        this._id = Todo.generateId();
        this._title = title;
        this._content = content;
        this._createdAt = new Date();
        this._updatedAt = new Date();
        this._isCompleted = false;
        this._requiresConfirmation = requiresConfirmation;
    }
    Todo.generateId = function () {
        return this.idCounter++;
    };
    Object.defineProperty(Todo.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Todo.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value;
            this._updatedAt = new Date();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Todo.prototype, "content", {
        get: function () {
            return this._content;
        },
        set: function (value) {
            this._content = value;
            this._updatedAt = new Date();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Todo.prototype, "createdAt", {
        get: function () {
            return this._createdAt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Todo.prototype, "updatedAt", {
        get: function () {
            return this._updatedAt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Todo.prototype, "isCompleted", {
        get: function () {
            return this._isCompleted;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Todo.prototype, "requiresConfirmation", {
        get: function () {
            return this._requiresConfirmation;
        },
        enumerable: false,
        configurable: true
    });
    Todo.prototype.edit = function (title, content) {
        if (this._requiresConfirmation && !confirm("Ви впевнені, що хочете змінити нотатку?")) {
            return;
        }
        if (!title.trim() || !content.trim()) {
            throw new Error("Заголовок та зміст не можуть бути порожніми");
        }
        this._title = title;
        this._content = content;
        this._updatedAt = new Date();
    };
    Todo.prototype.toggleComplete = function () {
        this._isCompleted = !this._isCompleted;
    };
    Todo.prototype.getInfo = function () {
        return {
            id: this._id,
            title: this._title,
            content: this._content,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
            isCompleted: this._isCompleted,
        };
    };
    Todo.idCounter = 1;
    return Todo;
}());
var TodoManager = /** @class */ (function () {
    function TodoManager() {
        this.todos = new Map();
    }
    TodoManager.prototype.add = function (todo) {
        this.todos.set(todo.id, todo);
    };
    TodoManager.prototype.remove = function (id) {
        var todo = this.todos.get(id);
        if (todo) {
            if (todo.requiresConfirmation && !confirm("Ви впевнені, що хочете видалити нотатку?")) {
                return;
            }
            this.todos.delete(id);
        }
    };
    TodoManager.prototype.getAll = function () {
        return Array.from(this.todos.values());
    };
    TodoManager.prototype.getById = function (id) {
        return this.todos.get(id);
    };
    TodoManager.prototype.search = function (query) {
        return Array.from(this.todos.values()).filter(function (todo) { return todo.title.includes(query) || todo.content.includes(query); });
    };
    TodoManager.prototype.getStats = function () {
        var allTodos = Array.from(this.todos.values());
        return {
            total: allTodos.length,
            remaining: allTodos.filter(function (todo) { return !todo.isCompleted; }).length,
        };
    };
    TodoManager.prototype.sortByStatus = function () {
        return Array.from(this.todos.values()).sort(function (a, b) { return Number(a.isCompleted) - Number(b.isCompleted); });
    };
    TodoManager.prototype.sortByDate = function () {
        return Array.from(this.todos.values()).sort(function (a, b) { return a.createdAt.getTime() - b.createdAt.getTime(); });
    };
    return TodoManager;
}());
var todoManager = new TodoManager();
todoManager.add(new Todo("Зробити домашку по Typescript", "Завдання ООП To do"));
todoManager.add(new Todo("Подзвонити лікарю", "Записатись на прийом", true));
console.log(todoManager.getAll());
