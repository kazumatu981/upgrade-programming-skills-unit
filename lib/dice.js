import {
    __assertIsString,
    __assertIsNumber,
    __assertBetween,
    __safeGetElementById,
} from './assert.js';

import { EventHandler } from './event-handler.js';

const DICE_MINIMUM = 1;
const DICE_MAXIMUM = 6;
const DICE_INTERVALS = 50;

export const DICE_EVENT_VALUE_CHANGE = 'value.change';
export const DICE_EVENT_STATE_CHANGE = 'state.change';

const DICE_STATE_STARTED = 'started';
const DICE_STATE_STOPPED = 'stopped';

export class Dice extends EventHandler {
    _element = null;
    _value = DICE_MINIMUM;
    _state = DICE_STATE_STOPPED;

    //#region コンストラクタ
    /**
     * M1.カウンタ部品
     * @param {string} elementId カウンタのDOMオブジェクトのID
     */
    constructor(elementId) {
        super();
        __assertIsString(elementId);

        this._element = __safeGetElementById(elementId);
    }
    //#endregion

    //#region プロパティ
    get value() {}

    get minimum() {}
    get maximum() {}
    get state() {
        return this._state;
    }
    //#endregion

    //#region メソッド

    set _unsafeValue(value) {
        __assertBetween(value, this.minimum, this.maximum);
        this._value = value;
        this.fire(DICE_EVENT_VALUE_CHANGE);
    }
    //#endregion

    //#region 内部メンバ
    _loopDice() {
        if (this.state === DICE_STATE_STOPPED) {
            return;
        }
        this._unsafeValue = getRandomValue(
            this.minimum,
            this.maximum,
            this.value
        );
        setTimeout(this._loopDice.bine(this), DICE_INTERVALS);
    }
    //#endregion
}

/**
 * 最小値と最大値の間の値の乱数を取得する。
 * ひとつ前の値と同じ値が出ないようにする。
 * @param {number} min 最小の値
 * @param {number} max 最大の値
 * @param {number || undefined} prev 一つ前の値
 */
function getRandomValue(min, max, prev) {
    let newValue = Math.floor(Math.random() * (max - min + 1)) + min;
    while (prev === newValue) {
        newValue = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return newValue;
}
