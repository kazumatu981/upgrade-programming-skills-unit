import { Dice } from '../../../lib/dice.js';

// ドキュメントをすべて読み込んだら onPageLoad関数を呼び出す
document.addEventListener('DOMContentLoaded', onPageLoad);

let testTargetDice = null;
/**
 * ページが読み込まれたときに呼び出される関数
 */
function onPageLoad() {
    console.log('Page loaded');

    // ダイス作成イベントの登録
    document
        .getElementById('create-dice')
        ?.addEventListener('click', onCreateDiceButtonClick);

    // 値取得イベントの登録
    document
        .getElementById('get-properties')
        ?.addEventListener('click', onGetPropertiesButtonClick);

    // 値の設定イベントの登録
    document
        .getElementById('set-value')
        ?.addEventListener('click', onSetValueButtonClick);

    // startボタンのイベント登録
    document
        .getElementById('start')
        ?.addEventListener('click', onStartButtonClick);

    // stopボタンのイベント登録
    document
        .getElementById('stop')
        ?.addEventListener('click', onStopButtonClick);
}

/**
 * ダイスを作成ボタンクリックのイベント
 */
function onCreateDiceButtonClick() {
    try {
        const diceElementId = document.getElementById('element-id').value;
        testTargetDice = new Dice(diceElementId);
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
            value: ${testTargetDice.value},
            maximum: ${testTargetDice.maximum},
            minimum: ${testTargetDice.minimum},
            state: ${testTargetDice.state}`;

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
        testTargetDice.value = valueToSet;
    } catch (error) {
        console.error(error);
    }
}

function onStartButtonClick() {
    try {
        testTargetDice.start();
    } catch (error) {
        console.error(error);
    }
}
function onStopButtonClick() {
    try {
        testTargetDice.stop();
    } catch (error) {
        console.error(error);
    }
}
