import { describe, it, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import {
    __assertIsString,
    __assertIsNumber,
    __assertIsFunction,
    __assertBetween,
    __assertSomeOf,
    __safeGetElementById,
} from '../../lib/assert.js';

import { GlobalDocumentMock } from './global-document-mock.js';

describe('__assertIsString', () => {
    it('should not throw an error when the value is a string', () => {
        __assertIsString('hello');
        assert.ok(true, 'Expected no error to be thrown');
    });

    it('should throw an error when the value is not a string', () => {
        assert.throws(
            () => {
                __assertIsString(42);
            },
            {
                name: 'AssertionError',
            }
        );
    });
});

describe('__assertIsNumber', () => {
    it('should not throw an error when the value is a number', () => {
        __assertIsNumber(42);
        assert.ok(true, 'Expected no error to be thrown');
    });

    it('should throw an error when the value is not a number', () => {
        assert.throws(
            () => {
                __assertIsNumber('hello');
            },
            {
                name: 'AssertionError',
            }
        );
    });
});

describe('__assertIsFunction', () => {
    it('should not throw an error when the value is an arrow function', () => {
        __assertIsFunction(() => {});
        assert.ok(true, 'Expected no error to be thrown');
    });
    it('should not throw an error when the value is an anonymous function', () => {
        __assertIsFunction(function () {});
        assert.ok(true, 'Expected no error to be thrown');
    });
    it('should not throw an error when the value is a named function', () => {
        __assertIsFunction(function myFunction() {});
        assert.ok(true, 'Expected no error to be thrown');
    });
    it('should not throw an error when the value is a class', () => {
        __assertIsFunction(class MyClass {});
        assert.ok(true, 'Expected no error to be thrown');
    });
    it('should throw an error when the value is not a function', () => {
        assert.throws(
            () => {
                __assertIsFunction(42);
            },
            {
                name: 'AssertionError',
            }
        );
    });
});

describe('__assertBetween', () => {
    it('should not throw an error when the value is within the range', () => {
        __assertBetween(5, 1, 10);
        assert.ok(true, 'Expected no error to be thrown');
    });
    it('should not throw an error when the value is equal to the minimum', () => {
        __assertBetween(1, 1, 10);
        assert.ok(true, 'Expected no error to be thrown');
    });
    it('should not throw an error when the value is equal to the maximum', () => {
        __assertBetween(10, 1, 10);
        assert.ok(true, 'Expected no error to be thrown');
    });

    it('should throw an error when the value is below the range', () => {
        assert.throws(
            () => {
                __assertBetween(0, 1, 10);
            },
            {
                name: 'AssertionError',
            }
        );
    });
    it('should throw an error when the value is above the range', () => {
        assert.throws(
            () => {
                __assertBetween(11, 1, 10);
            },
            {
                name: 'AssertionError',
            }
        );
    });
    it('should throw an error when the value is not a number', () => {
        assert.throws(
            () => {
                __assertBetween('hello', 1, 10);
            },
            {
                name: 'AssertionError',
            }
        );
    });
    it('should throw an error when the minimum is not a number', () => {
        assert.throws(
            () => {
                __assertBetween(5, 'hello', 10);
            },
            {
                name: 'AssertionError',
            }
        );
    });
    it('should throw an error when the maximum is not a number', () => {
        assert.throws(
            () => {
                __assertBetween(5, 1, 'hello');
            },
            {
                name: 'AssertionError',
            }
        );
    });
    it('should throw an error when string comparison is used', () => {
        assert.throws(
            () => {
                __assertBetween('x', 'a', 'z');
            },
            {
                name: 'AssertionError',
            }
        );
    });
});

describe('__assertSomeOf', () => {
    it('should not throw an error when the value is in the array', () => {
        __assertSomeOf('a', ['a', 'b', 'c']);
        assert.ok(true, 'Expected no error to be thrown');
    });

    it('should throw an error when the value is not in the array', () => {
        assert.throws(
            () => {
                __assertSomeOf('x', ['a', 'b', 'c']);
            },
            {
                name: 'AssertionError',
            }
        );
    });
});

describe('__safeGetElementById', () => {
    const testId = 'test-element';
    const testElement = {};
    const mockDocument = new GlobalDocumentMock();
    const mockOfGetElementById = mock.fn((id) => {
        if (id === testId) {
            return testElement;
        }
        return null;
    });

    beforeEach(() => {
        mockDocument.mock({
            getElementById: mockOfGetElementById,
        });
    });

    afterEach(() => {
        mockDocument.unmock();
    });

    it('should return the element when it exists', () => {
        const element = __safeGetElementById(testId);
        assert.ok(
            element === testElement,
            'Expected the returned element to be the test element'
        );
    });
    it('should throw an error when the element does not exist', () => {
        assert.throws(
            () => {
                __safeGetElementById('non-existent-id');
            },
            {
                name: 'AssertionError',
            }
        );
    });
    it('should throw an error when the id is not a string', () => {
        assert.throws(
            () => {
                __safeGetElementById(42);
            },
            {
                name: 'AssertionError',
            }
        );
    });
});
