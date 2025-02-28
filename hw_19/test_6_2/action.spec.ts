import { describe, it, expect, afterEach } from '@jest/globals';
import {Action, handleAction} from './action';

describe('handleAction', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    afterEach(() => {
        logSpy.mockClear();
    });

    it('should handle CREATE_USER action', () => {
        const action: Action = { type: 'CREATE_USER', payload: { name: 'John Doe', age: 30 } };

        handleAction(action);

        expect(logSpy).toHaveBeenCalledWith('Creating user: Name: John Doe, Age: 30');
    });

    it('should handle DELETE_USER action', () => {
        const action: Action = { type: 'DELETE_USER', payload: { userId: 1 } };

        handleAction(action);

        expect(logSpy).toHaveBeenCalledWith('Deleting user with ID: 1');
    });

    it('should handle UPDATE_USER action with name and age', () => {
        const action: Action = { type: 'UPDATE_USER', payload: { userId: 1, name: 'Jane Doe', age: 25 } };

        handleAction(action);

        expect(logSpy).toHaveBeenCalledWith('Updating user with ID: 1');
        expect(logSpy).toHaveBeenCalledWith('New name: Jane Doe');
        expect(logSpy).toHaveBeenCalledWith('New age: 25');
    });

    it('should handle UPDATE_USER action with only name', () => {
        const action: Action = { type: 'UPDATE_USER', payload: { userId: 1, name: 'Jane Doe' } };

        handleAction(action);

        expect(logSpy).toHaveBeenCalledWith('Updating user with ID: 1');
        expect(logSpy).toHaveBeenCalledWith('New name: Jane Doe');
    });

    it('should handle UPDATE_USER action with only age', () => {
        const action: Action = { type: 'UPDATE_USER', payload: { userId: 1, age: 25 } };

        handleAction(action);

        expect(logSpy).toHaveBeenCalledWith('Updating user with ID: 1');
        expect(logSpy).toHaveBeenCalledWith('New age: 25');
    });

    it('should handle BLOCK_USER action', () => {
        const action: Action = { type: 'BLOCK_USER', payload: { userId: 1, reason: 'Violation of terms' } };

        handleAction(action);

        expect(logSpy).toHaveBeenCalledWith('Blocking user with ID: 1, Reason: Violation of terms');
    });


    it('should throw an error for an unknown action type', () => {
        const action: any = {
            type: 'UNKNOWN_ACTION',
            payload: {}
        };
        expect(() => handleAction(action)).toThrow('Error action type: [object Object]');
    });

});
