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

/**
 * __assertIsString の単体テスト
 * - 値が文字列の場合、エラーが発生しない
 * - 値が文字列でない場合、エラーが発生する
 */
describe('__assertIsString の単体テスト', () => {
    it('値が文字列の場合、エラーが発生しない', () => {
        __assertIsString('hello');
        assert.ok(true, 'Expected no error to be thrown');
    });

    it('値が文字列でない場合、エラーが発生する', () => {
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

/**
 * __assertIsNumber の単体テスト
 * - 値が数値の場合、エラーが発生しない
 * - 値が数値でない場合、エラーが発生する
 */
describe('__assertIsNumber の単体テスト', () => {
    it('値が数値の場合、エラーが発生しない', () => {
        __assertIsNumber(42);
        assert.ok(true, 'Expected no error to be thrown');
    });

    it('値が数値でない場合、エラーが発生する', () => {
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

/**
 * __assertIsFunction の単体テスト
 * - 値がアロー関数の場合、エラーが発生しない
 * - 値が無名関数の場合、エラーが発生しない
 * - 値が名前付き関数の場合、エラーが発生しない
 * - 値がクラスの場合、エラーが発生しない
 * - 値が関数でない場合、エラーが発生する
 */
describe('__assertIsFunction の単体テスト', () => {
    it('値がアロー関数の場合、エラーが発生しない', () => {
        __assertIsFunction(() => {});
        assert.ok(true, 'Expected no error to be thrown');
    });
    it('値が無名関数の場合、エラーが発生しない', () => {
        __assertIsFunction(function () {});
        assert.ok(true, 'Expected no error to be thrown');
    });
    it('値が名前付き関数の場合、エラーが発生しない', () => {
        __assertIsFunction(function myFunction() {});
        assert.ok(true, 'Expected no error to be thrown');
    });
    it('値がクラスの場合、エラーが発生しない', () => {
        __assertIsFunction(class MyClass {});
        assert.ok(true, 'Expected no error to be thrown');
    });
    it('値が関数でない場合、エラーが発生する', () => {
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

/**
 * __assertBetween の単体テスト
 * - 値が範囲内の場合、エラーが発生しない
 * - 値が最小値と等しい場合、エラーが発生しない
 * - 値が最大値と等しい場合、エラーが発生しない
 * - 値が範囲を下回る場合、エラーが発生する
 * - 値が範囲を上回る場合、エラーが発生する
 * - 値が数値でない場合、エラーが発生する
 * - 最小値が数値でない場合、エラーが発生する
 * - 最大値が数値でない場合、エラーが発生する
 * - 文字列比較を使用した場合、エラーが発生する
 */
describe('__assertBetween の単体テスト', () => {
    it('値が範囲内の場合、エラーが発生しない', () => {
        __assertBetween(5, 1, 10);
        assert.ok(true, 'Expected no error to be thrown');
    });
    it('値が最小値と等しい場合、エラーが発生しない', () => {
        __assertBetween(1, 1, 10);
        assert.ok(true, 'Expected no error to be thrown');
    });
    it('値が最大値と等しい場合、エラーが発生しない', () => {
        __assertBetween(10, 1, 10);
        assert.ok(true, 'Expected no error to be thrown');
    });

    it('値が範囲を下回る場合、エラーが発生する', () => {
        assert.throws(
            () => {
                __assertBetween(0, 1, 10);
            },
            {
                name: 'AssertionError',
            }
        );
    });
    it('値が範囲を上回る場合、エラーが発生する', () => {
        assert.throws(
            () => {
                __assertBetween(11, 1, 10);
            },
            {
                name: 'AssertionError',
            }
        );
    });
    it('値が数値でない場合、エラーが発生する', () => {
        assert.throws(
            () => {
                __assertBetween('hello', 1, 10);
            },
            {
                name: 'AssertionError',
            }
        );
    });
    it('最小値が数値でない場合、エラーが発生する', () => {
        assert.throws(
            () => {
                __assertBetween(5, 'hello', 10);
            },
            {
                name: 'AssertionError',
            }
        );
    });
    it('最大値が数値でない場合、エラーが発生する', () => {
        assert.throws(
            () => {
                __assertBetween(5, 1, 'hello');
            },
            {
                name: 'AssertionError',
            }
        );
    });
    it('文字列比較を使用した場合、エラーが発生する', () => {
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

/**
 * __assertSomeOf の単体テスト
 * - 値が配列に含まれる場合、エラーが発生しない
 * - 値が配列に含まれない場合、エラーが発生する
 */
describe('__assertSomeOf の単体テスト', () => {
    it('値が配列に含まれる場合、エラーが発生しない', () => {
        __assertSomeOf('a', ['a', 'b', 'c']);
        assert.ok(true, 'Expected no error to be thrown');
    });

    it('値が配列に含まれない場合、エラーが発生する', () => {
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

/**
 * __safeGetElementById の単体テスト
 * - 要素が存在する場合、その要素を返す
 * - getElementById が呼び出されることを確認する
 * - 要素が存在しない場合、エラーが発生する
 * - IDが文字列でない場合、エラーが発生する
 */
describe('__safeGetElementById の単体テスト', () => {
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
        mockOfGetElementById.mock.resetCalls();
        mockDocument.mock({
            getElementById: mockOfGetElementById,
        });
    });

    afterEach(() => {
        mockDocument.unmock();
    });

    it('要素が存在する場合、その要素を返す', () => {
        const element = __safeGetElementById(testId);
        assert.equal(element === testElement, true);
    });
    it('getElementById が呼び出されることを確認する', () => {
        __safeGetElementById(testId);
        // 一度呼び出されることを確認する
        assert.equal(mockOfGetElementById.mock.calls.length, 1);
        // 呼び出し時に渡したIDがそのまま引き継がれていることを確認する
        assert.equal(mockOfGetElementById.mock.calls[0].arguments[0], testId);
    });
    it('要素が存在しない場合、エラーが発生する', () => {
        assert.throws(
            () => {
                __safeGetElementById('non-existent-id');
            },
            {
                name: 'AssertionError',
            }
        );
    });
    it('IDが文字列でない場合、エラーが発生する', () => {
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
