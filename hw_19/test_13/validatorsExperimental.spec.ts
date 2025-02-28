import { describe, it, expect } from '@jest/globals';
import { MinLengthExperimental, MaxLengthExperimental, EmailExperimental } from './methods';
import 'reflect-metadata';

describe('Experimental Validators', () => {

    describe('MinLengthExperimental', () => {
        it('should throw error if value is shorter than the minimum length', () => {
            class TestClass {
                @MinLengthExperimental(5)
                name: string;
            }

            const instance = new TestClass();
            expect(() => { instance.name = 'John'; }).toThrowError('name must be at least 5 characters long.');
        });
    });

    describe('MaxLengthExperimental', () => {
        it('should throw error if value is longer than the maximum length', () => {
            class TestClass {
                @MaxLengthExperimental(5)
                name: string;
            }

            const instance = new TestClass();
            expect(() => { instance.name = 'John Doe'; }).toThrowError('name must be at most 5 characters long.');
        });
    });

    describe('EmailExperimental', () => {
        it('should throw error if value is not a valid email', () => {
            class TestClass {
                @EmailExperimental
                email: string;
            }

            const instance = new TestClass();
            expect(() => { instance.email = 'invalid-email'; }).toThrowError('email must be a valid email address.');
        });
    });

});
