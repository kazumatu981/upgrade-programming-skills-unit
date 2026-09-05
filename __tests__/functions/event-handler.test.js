import { describe, it, afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { EventHandler } from '../../lib/event-handler.js';

describe('EventHandler クラスの単体テスト', () => {
    const dummyHandler_x1 = mock.fn();
    const dummyHandler_y1 = mock.fn();
    const dummyHandler_y2 = mock.fn();

    afterEach(() => {
        dummyHandler_x1.mock.resetCalls();
        dummyHandler_y1.mock.resetCalls();
        dummyHandler_y2.mock.resetCalls();
    });

    it('イベントを登録し、fire()で実行されることを確認する', () => {
        const eventHandler = new EventHandler();
        eventHandler.on('event_x', dummyHandler_x1);
        eventHandler.on('event_y', dummyHandler_y1);
        eventHandler.on('event_y', dummyHandler_y2);

        eventHandler.fire('event_x');
        assert.strictEqual(dummyHandler_x1.mock.calls.length, 1);

        eventHandler.fire('event_y');
        assert.strictEqual(dummyHandler_y1.mock.calls.length, 1);
        assert.strictEqual(dummyHandler_y2.mock.calls.length, 1);
    });

    it('イベントが登録されていない場合、fire()で何も実行されないことを確認する', () => {
        const eventHandler = new EventHandler();
        eventHandler.fire('event_z');
        assert.strictEqual(dummyHandler_x1.mock.calls.length, 0);
        assert.strictEqual(dummyHandler_y1.mock.calls.length, 0);
        assert.strictEqual(dummyHandler_y2.mock.calls.length, 0);
    });

    it('イベントに引数を渡すことができることを確認する', () => {
        const eventHandler = new EventHandler();
        const arg1 = 'arg1';
        const arg2 = 42;
        eventHandler.on('event_x', dummyHandler_x1);
        eventHandler.fire('event_x', arg1, arg2);
        assert.strictEqual(dummyHandler_x1.mock.calls.length, 1);
        assert.strictEqual(
            dummyHandler_x1.mock.calls[0].arguments[0],
            eventHandler
        );
        assert.strictEqual(dummyHandler_x1.mock.calls[0].arguments[1], arg1);
        assert.strictEqual(dummyHandler_x1.mock.calls[0].arguments[2], arg2);
    });
});
