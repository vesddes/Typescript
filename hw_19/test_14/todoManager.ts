import {ITodo} from "./interfaceTodo";

export class TodoManager {
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