import { describe, it, expect} from '@jest/globals';
import { MinLength, MaxLength, Email } from './methods';
import 'reflect-metadata';

describe('Validators', () => {

    describe('MinLength', () => {
        it('should throw an error if value is shorter than the minimum length', () => {
            class TestClass {
                @MinLength(5)
                name: string;
            }

            const instance = new TestClass();
            expect(() => { instance.name = 'John'; }).toThrowError('name must be at least 5 characters long.');
        });

        it('should allow setting value equal to the minimum length', () => {
            class TestClass {
                @MinLength(5)
                name: string;
            }

            const instance = new TestClass();
            expect(() => { instance.name = 'John Doe'; }).not.toThrowError();
        });
    });

    describe('MaxLength', () => {
        it('should throw an error if value is longer than the maximum length', () => {
            class TestClass {
                @MaxLength(5)
                name: string;
            }

            const instance = new TestClass();
            expect(() => { instance.name = 'John Doe'; }).toThrowError('name must be at most 5 characters long.');
        });

        it('should allow setting value equal to the maximum length', () => {
            class TestClass {
                @MaxLength(5)
                name: string;
            }

            const instance = new TestClass();
            expect(() => { instance.name = 'John'; }).not.toThrowError();
        });
    });

    describe('Email', () => {
        it('should throw an error if value is not a valid email', () => {
            class TestClass {
                @Email
                email: string;
            }

            const instance = new TestClass();
            expect(() => { instance.email = 'invalid-email'; }).toThrowError('email must be a valid email address.');
        });

        it('should allow setting a valid email address', () => {
            class TestClass {
                @Email
                email: string;
            }

            const instance = new TestClass();
            expect(() => { instance.email = 'test@example.com'; }).not.toThrowError();
        });
    });

});

