import {
    __assertIsNumber,
    __assertBetween,
    __safeGetElementById,
} from './assert.js';

import { EventHandler } from './event-handler.js';

export const COUNTER_EVENT_CHANGE = 'change';

export class Counter extends EventHandler {
    _element = null;

    //#region コンストラクタ
    /**
     * M1.カウンタ部品
     * @param {string} elementId カウンタのDOMオブジェクトのID
     */
    constructor(elementId) {
        super();

        // Domエレメントの検索と設定
        this._element = __safeGetElementById(elementId);

        // クラス内のイベントハンドラの設定
        this.on(COUNTER_EVENT_CHANGE, this.onChange.bind(this));
    }
    //#endregion

    //#region プロパティ
    /**
     * 値の設定
     */
    set value(value) {
        // 型チェック(数字かどうか)
        // 型の安全性を確認したのでクラスローカル変数に設定する
    }
    /**
     * 値の参照
     */
    get value() {}
    /**
     * 最大値の参照
     */
    get maximum() {}
    /**
     * 最小値の参照
     */
    get minimum() {}
    /**
     * DOM要素の参照
     */
    get element() {
        return this._element;
    }
    //#endregion

    //#region メソッド
    /**
     * 値を一つ増やす
     */
    increment() {}
    /**
     * 値を一つ減らす
     */
    decrement() {}
    //#endregion

    //#region イベントハンドラ
    onChange() {
        // 表示を更新する
        this._updateDisplay();
    }
    //#endregion

    //#region 内部メンバ
    /**
     * クラスローカル変数(カウンタを表す変数)の設定
     */
    set _unsafeValue(value) {
        // 値の範囲チェック
        // 値の保存
        // 変更イベントを発行
    }
    /**
     * Dom要素の更新
     */
    _updateDisplay() {}
    //#endregion
}
