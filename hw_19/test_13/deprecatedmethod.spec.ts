import { describe, it, expect, jest } from '@jest/globals';
import { DeprecatedMethod } from './methods';
import 'reflect-metadata';

describe('DeprecatedMethod Decorator', () => {

    it('should log a warning when the method is called', () => {
        class TestClass {
            @DeprecatedMethod("This method is obsolete.", "newMethod")
            oldMethod() {
                return "Old method called";
            }
        }

        const instance = new TestClass();
        const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        instance.oldMethod();
        expect(spy).toHaveBeenCalledWith('Method oldMethod is deprecated. This method is obsolete.');
        expect(spy).toHaveBeenCalledWith('Use newMethod instead.');
        spy.mockRestore();
    });

});




