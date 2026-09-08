import { Counter } from '../../../lib/counter.js';

// ドキュメントをすべて読み込んだら onPageLoad関数を呼び出す
document.addEventListener('DOMContentLoaded', onPageLoad);

let testTargetCounter = null;
/**
 * ページが読み込まれたときに呼び出される関数
 */
function onPageLoad() {
    console.log('Page loaded');

    // カウンタ作成イベントの登録
    document
        .getElementById('create-counter')
        ?.addEventListener('click', onCreateCounterButtonClick);

    // 値取得イベントの登録
    document
        .getElementById('get-properties')
        ?.addEventListener('click', onGetPropertiesButtonClick);

    // 値の設定イベントの登録
    document
        .getElementById('set-value')
        ?.addEventListener('click', onSetValueButtonClick);

    // incrementボタンのイベント登録
    document
        .getElementById('increment')
        ?.addEventListener('click', onIncrementButtonClick);

    // decrementボタンのイベント登録
    document
        .getElementById('decrement')
        ?.addEventListener('click', onDecrementButtonClick);
}

/**
 * カウンタを作成ボタンクリックのイベント
 */
function onCreateCounterButtonClick() {
    try {
        const counterELementId = document.getElementById('element-id').value;
        createCounterElement(counterELementId);
    } catch (error) {
        console.error(error);
    }
}

/**
 * 値を取得ボタンクリックイベント
 */
function onGetPropertiesButtonClick() {
    try {
        const displayText = `
            value: ${testTargetCounter.value},
            maximum: ${testTargetCounter.maximum},
            minimum: ${testTargetCounter.minimum}`;
        document.getElementById('value-display').textContent = displayText;
    } catch (error) {
        console.error(error);
    }
}

function onSetValueButtonClick() {
    try {
        // 値の取得
        const valueInput = document.getElementById('value-input').value;

        // 数値に変換すべきかを確認する
        const mustBeChangeToNumber =
            document.getElementById('covert-from-string').checked;

        // 数値に変換する場合
        const valueToSet = mustBeChangeToNumber
            ? Number(valueInput)
            : valueInput;

        // 値の設定
        testTargetCounter.value = valueToSet;
    } catch (error) {
        console.error(error);
    }
}

function onIncrementButtonClick() {
    try {
        testTargetCounter.increment();
    } catch (error) {
        console.error(error);
    }
}
function onDecrementButtonClick() {
    try {
        testTargetCounter.decrement();
    } catch (error) {
        console.error(error);
    }
}

function createCounterElement(elementId) {
    testTargetCounter = new Counter(elementId);

    return testTargetCounter;
}
