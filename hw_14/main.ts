interface ITodo {
    readonly id: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly requiresConfirmation: boolean;
    title: string;
    content: string;
    isCompleted: boolean;
    edit(title: string, content: string): void;
    toggleComplete(): void;
    getInfo(): object;
}

class Todo implements ITodo {
    private static idCounter = 1;
    private _id: number;
    private _title: string;
    private _content: string;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _isCompleted: boolean;
    private _requiresConfirmation: boolean;

    constructor(title: string, content: string, requiresConfirmation = false) {
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

    private static generateId(): number {
        return this.idCounter++;
    }

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
        this._updatedAt = new Date();
    }

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this._content = value;
        this._updatedAt = new Date();
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    get isCompleted(): boolean {
        return this._isCompleted;
    }

    get requiresConfirmation(): boolean {
        return this._requiresConfirmation;
    }

    edit(title: string, content: string) {
        if (this._requiresConfirmation && !confirm("Ви впевнені, що хочете змінити нотатку?")) {
            return;
        }
        if (!title.trim() || !content.trim()) {
            throw new Error("Заголовок та зміст не можуть бути порожніми");
        }
        this._title = title;
        this._content = content;
        this._updatedAt = new Date();
    }

    toggleComplete() {
        this._isCompleted = !this._isCompleted;
    }

    getInfo() {
        return {
            id: this._id,
            title: this._title,
            content: this._content,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
            isCompleted: this._isCompleted,
        };
    }
}

class TodoManager {
    private todos: Map<number, ITodo> = new Map();

    add(todo: ITodo) {
        this.todos.set(todo.id, todo);
    }

    remove(id: number) {
        const todo = this.todos.get(id);
        if (todo) {
            if (todo.requiresConfirmation && !confirm("Ви впевнені, що хочете видалити нотатку?")) {
                return;
            }
            this.todos.delete(id);
        }
    }

    getAll() {
        return Array.from(this.todos.values());
    }

    getById(id: number) {
        return this.todos.get(id);
    }

    search(query: string) {
        return Array.from(this.todos.values()).filter(
            todo => todo.title.includes(query) || todo.content.includes(query)
        );
    }

    getStats() {
        const allTodos = Array.from(this.todos.values());
        return {
            total: allTodos.length,
            remaining: allTodos.filter(todo => !todo.isCompleted).length,
        };
    }

    sortByStatus() {
        return Array.from(this.todos.values()).sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
    }

    sortByDate() {
        return Array.from(this.todos.values()).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
}


const todoManager = new TodoManager();
todoManager.add(new Todo("Зробити домашку по Typescript", "Завдання ООП To do"));
todoManager.add(new Todo("Подзвонити лікарю", "Записатись на прийом", true));


console.log(todoManager.getAll());

