import 'reflect-metadata';
import { describe, it, expect } from '@jest/globals';
import { User } from './methods';

describe('User Class', () => {
    it('should create a user with valid name and email', () => {
        const user = new User('Ainur', 'ainur@example.com');
        expect(user.name).toBe('Ainur');
        expect(user.email).toBe('ainur@example.com');
    });

    it('should throw an error for invalid email', () => {
        expect(() => new User('John', 'invalid-email')).toThrowError('email must be a valid email address.');
    });

    it('should throw an error for name shorter than minimum length', () => {
        expect(() => new User('Jo', 'jo@example.com')).toThrowError('name must be at least 3 characters long.');
    });

    it('should throw an error for name longer than maximum length', () => {
        expect(() => new User('A'.repeat(21), 'jo@example.com')).toThrowError('name must be at most 20 characters long.');
    });

    it('should call the new method instead of the deprecated old method', () => {
        const user = new User('Ainur', 'ainur@example.com');
        const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        user.oldMethod();
        expect(spy).toHaveBeenCalledWith('Method oldMethod is deprecated. This method is obsolete.');
        expect(spy).toHaveBeenCalledWith('Use newMethod instead.');
        spy.mockRestore();
    });
});
