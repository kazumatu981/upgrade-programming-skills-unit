import { describe, it, before, after, mock } from 'node:test';
import {
    __assertIsString,
    __assertIsNumber,
    __assertIsFunction,
    __assertBetween,
    __assertSomeOf,
    __safeGetElementById,
    AssertionError,
} from '../../lib/assert.js';

function __assertIsInstanceOfAssertionError(error) {
    if (!(error instanceof AssertionError)) {
        throw new Error('Expected an instance of AssertionError');
    }
}
describe('__assertIsString', () => {
    it('should not throw an error when the value is a string', () => {
        __assertIsString('hello');
    });

    it('should throw an error when the value is not a string', () => {
        try {
            __assertIsString(42);
            throw new Error('Expected an error to be thrown');
        } catch (error) {
            __assertIsInstanceOfAssertionError(error);
        }
    });
});

describe('__assertIsNumber', () => {
    it('should not throw an error when the value is a number', () => {
        __assertIsNumber(42);
    });

    it('should throw an error when the value is not a number', () => {
        try {
            __assertIsNumber('hello');
            throw new Error('Expected an error to be thrown');
        } catch (error) {
            __assertIsInstanceOfAssertionError(error);
        }
    });
});

describe('__assertIsFunction', () => {
    it('should not throw an error when the value is an arrow function', () => {
        __assertIsFunction(() => {});
    });
    it('should not throw an error when the value is an anonymous function', () => {
        __assertIsFunction(function () {});
    });
    it('should not throw an error when the value is a named function', () => {
        __assertIsFunction(function myFunction() {});
    });
    it('should not throw an error when the value is a class', () => {
        __assertIsFunction(class MyClass {});
    });
    it('should throw an error when the value is not a function', () => {
        try {
            __assertIsFunction(42);
            throw new Error('Expected an error to be thrown');
        } catch (error) {
            __assertIsInstanceOfAssertionError(error);
        }
    });
});

describe('__assertBetween', () => {
    it('should not throw an error when the value is within the range', () => {
        __assertBetween(5, 1, 10);
    });
    it('should not throw an error when the value is equal to the minimum', () => {
        __assertBetween(1, 1, 10);
    });
    it('should not throw an error when the value is equal to the maximum', () => {
        __assertBetween(10, 1, 10);
    });

    it('should throw an error when the value is below the range', () => {
        try {
            __assertBetween(0, 1, 10);
            throw new Error('Expected an error to be thrown');
        } catch (error) {
            __assertIsInstanceOfAssertionError(error);
        }
    });
    it('should throw an error when the value is above the range', () => {
        try {
            __assertBetween(11, 1, 10);
            throw new Error('Expected an error to be thrown');
        } catch (error) {
            __assertIsInstanceOfAssertionError(error);
        }
    });
    it('should throw an error when the value is not a number', () => {
        try {
            __assertBetween('hello', 1, 10);
            throw new Error('Expected an error to be thrown');
        } catch (error) {
            __assertIsInstanceOfAssertionError(error);
        }
    });
    it('should throw an error when the minimum is not a number', () => {
        try {
            __assertBetween(5, 'hello', 10);
            throw new Error('Expected an error to be thrown');
        } catch (error) {
            __assertIsInstanceOfAssertionError(error);
        }
    });
    it('should throw an error when the maximum is not a number', () => {
        try {
            __assertBetween(5, 1, 'hello');
            throw new Error('Expected an error to be thrown');
        } catch (error) {
            __assertIsInstanceOfAssertionError(error);
        }
    });
    it('should throw an error when string comparison is used', () => {
        try {
            __assertBetween('x', 'a', 'z');
            throw new Error('Expected an error to be thrown');
        } catch (error) {
            __assertIsInstanceOfAssertionError(error);
        }
    });
});

describe('__assertSomeOf', () => {
    it('should not throw an error when the value is in the array', () => {
        __assertSomeOf('a', ['a', 'b', 'c']);
    });

    it('should throw an error when the value is not in the array', () => {
        try {
            __assertSomeOf('x', ['a', 'b', 'c']);
            throw new Error('Expected an error to be thrown');
        } catch (error) {
            __assertIsInstanceOfAssertionError(error);
        }
    });
});

describe('__safeGetElementById', () => {
    const testId = 'test-element';
    const testElement = {};
    const originalDocument = globalThis.document;

    before(() => {
        Object.defineProperty(globalThis, 'document', {
            value: {
                getElementById(id) {
                    if (id === testId) {
                        return testElement;
                    }
                    return null;
                },
            },
            configurable: true,
            writable: true,
        });
    });

    after(() => {
        if (originalDocument === undefined) {
            delete globalThis.document;
            return;
        }

        Object.defineProperty(globalThis, 'document', {
            value: originalDocument,
            configurable: true,
            writable: true,
        });
    });

    it('should return the element when it exists', () => {
        const element = __safeGetElementById(testId);
        if (element !== testElement) {
            throw new Error(
                'Expected the returned element to be the test element'
            );
        }
    });
    it('should throw an error when the element does not exist', () => {
        try {
            __safeGetElementById('non-existent-id');
            throw new Error('Expected an error to be thrown');
        } catch (error) {
            __assertIsInstanceOfAssertionError(error);
        }
    });
    it('should throw an error when the id is not a string', () => {
        try {
            __safeGetElementById(42);
            throw new Error('Expected an error to be thrown');
        } catch (error) {
            __assertIsInstanceOfAssertionError(error);
        }
    });
});
