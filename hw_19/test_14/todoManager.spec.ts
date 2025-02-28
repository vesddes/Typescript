import { describe, beforeEach, expect, jest, test } from '@jest/globals';
import { Todo } from './todo';
import { TodoManager } from './todoManager';

describe('TodoManager class', () => {
    let todoManager: TodoManager;

    beforeEach(() => {
        todoManager = new TodoManager();
    });

    test('should add a todo', () => {
        const todo = new Todo('Task 1', 'Content 1');
        todoManager.add(todo);
        expect(todoManager.getAll()).toContain(todo);
    });

    test('should remove a todo', () => {
        const todo = new Todo('Task 1', 'Content 1');
        todoManager.add(todo);
        todoManager.remove(todo.id);
        expect(todoManager.getAll()).not.toContain(todo);
    });

    test('should confirm removal before deleting', () => {
        const todo = new Todo('Task 1', 'Content 1', true);
        todoManager.add(todo);
        const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false);
        todoManager.remove(todo.id);
        expect(todoManager.getAll()).toContain(todo);
        confirmSpy.mockRestore();
    });

    test('should search todos by title or content', () => {
        const todo1 = new Todo('Task 1', 'Content 1');
        const todo2 = new Todo('Task 2', 'Content 2');
        todoManager.add(todo1);
        todoManager.add(todo2);
        const result = todoManager.search('Task 1');
        expect(result).toContain(todo1);
        expect(result).not.toContain(todo2);
    });

    test('should return correct stats', () => {
        const todo1 = new Todo('Task 1', 'Content 1');
        const todo2 = new Todo('Task 2', 'Content 2');
        todoManager.add(todo1);
        todoManager.add(todo2);
        expect(todoManager.getStats()).toEqual({
            total: 2,
            remaining: 2,
        });
    });

    test('should sort todos by status', () => {
        const todo1 = new Todo('Task 1', 'Content 1');
        const todo2 = new Todo('Task 2', 'Content 2');
        todoManager.add(todo1);
        todoManager.add(todo2);
        todo2.toggleComplete();
        const sorted = todoManager.sortByStatus();
        expect(sorted[0].isCompleted).toBe(false);
        expect(sorted[1].isCompleted).toBe(true);
    });

    test('should sort todos by creation date', () => {
        const todo1 = new Todo('Task 1', 'Content 1');
        const todo2 = new Todo('Task 2', 'Content 2');
        todoManager.add(todo1);
        todoManager.add(todo2);
        const sorted = todoManager.sortByDate();
        expect(sorted[0].createdAt.getTime()).toBeLessThanOrEqual(sorted[1].createdAt.getTime());
    });
});
