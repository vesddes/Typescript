import {ITodo} from "./interfaceTodo"

export class Todo implements ITodo {
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




// const todoManager = new TodoManager();
// todoManager.add(new Todo("Зробити домашку по Typescript", "Завдання ООП To do"));
// todoManager.add(new Todo("Подзвонити лікарю", "Записатись на прийом", true));
//
//
// console.log(todoManager.getAll());

