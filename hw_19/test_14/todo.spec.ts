import { describe, beforeEach, afterEach, expect, jest, test } from '@jest/globals';
import { Todo } from './todo';

describe('Todo class', () => {
    let todo: Todo;
    const mockDate = new Date(2025, 1, 28);

    beforeEach(() => {
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate as unknown as Date);
        todo = new Todo('Test Task', 'Test Content');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should throw error when title or content is empty', () => {
        expect(() => new Todo('', 'Test Content')).toThrow('Заголовок та зміст не можуть бути порожніми');
        expect(() => new Todo('Test Task', '')).toThrow('Заголовок та зміст не можуть бути порожніми');
    });

    test('should have unique IDs', () => {
        const todo1 = new Todo('Task 1', 'Content 1');
        const todo2 = new Todo('Task 2', 'Content 2');
        expect(todo1.id).not.toBe(todo2.id);
    });

    test('should update title and content', () => {
        todo.title = 'Updated Task';
        todo.content = 'Updated Content';
        expect(todo.title).toBe('Updated Task');
        expect(todo.content).toBe('Updated Content');
    });

    test('should toggle completion status', () => {
        expect(todo.isCompleted).toBe(false);
        todo.toggleComplete();
        expect(todo.isCompleted).toBe(true);
    });

    test('should throw error if title or content are empty when editing', () => {
        expect(() => todo.edit('', 'Updated Content')).toThrow('Заголовок та зміст не можуть бути порожніми');
        expect(() => todo.edit('Updated Task', '')).toThrow('Заголовок та зміст не можуть бути порожніми');
    });

    test('should edit title and content when confirmed', () => {
        const editSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);

        todo.edit('Edited Task', 'Edited Content');

        expect(todo.title).toBe('Edited Task');
        expect(todo.content).toBe('Edited Content');

        editSpy.mockRestore();
    });

    test('should not edit title and content when not confirmed', () => {
        const editSpy = jest.spyOn(window, 'confirm').mockReturnValue(false);

        const originalTitle = todo.title;
        const originalContent = todo.content;


        todo.edit('Edited Task', 'Edited Content');

        expect(todo.title).toBe(originalTitle);
        expect(todo.content).toBe(originalContent);


        editSpy.mockRestore();
    });

    test('getInfo should return correct todo data', () => {
        const info = todo.getInfo();
        expect(info).toEqual({
            id: todo.id,
            title: 'Test Task',
            content: 'Test Content',
            createdAt: mockDate,
            updatedAt: mockDate,
            isCompleted: false,
        });
    });
});
