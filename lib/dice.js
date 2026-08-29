import {
    __assertIsString,
    __assertIsNumber,
    __assertBetween,
    __safeGetElementById,
} from './assert.js';

import { EventHandler } from './event-handler.js';

export class Dice extends EventHandler {
    _element = null;

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
    //#endregion

    //#region メソッド
    //#endregion

    //#region 内部メンバ
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
