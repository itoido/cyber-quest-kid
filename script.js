// script.js

// data.jsから読み込んだデータを使用
// このオブジェクトがゲームの現在の状態を管理する
const gameData = {
    scenarios: scenarios, // data.jsから問題データを取得
    panels: panels,       // data.jsからパネルの初期状態を取得
    currentView: 'home'   // 現在表示されているページを追跡
};

// HTMLから各ページのDOM要素を取得
const homePageDiv = document.getElementById('home-page');
const problemPageDiv = document.getElementById('problem-page');
const resultPageDiv = document.getElementById('result-page');

// パネルの状態をlocalStorageに保存する関数
// ブラウザを閉じてもデータが消えないようにするため
function savePanelState() {
    // gameData.panelsオブジェクトをJSON形式の文字列に変換して保存
    localStorage.setItem('gamePanels', JSON.stringify(gameData.panels));
}

// localStorageから保存されたパネルの状態を読み込む関数
function loadPanelState() {
    const savedData = localStorage.getItem('gamePanels');
    if (savedData) {
        // 保存されたJSON文字列をオブジェクトに戻してゲームデータに反映
        gameData.panels = JSON.parse(savedData);
    }
}

// ページの表示を切り替える主要な関数
// 'home-page', 'problem-page', 'result-page' などのIDを引数に取る
function showPage(pageId) {
    // まず、共通クラス'page'を持つすべての要素を取得
    const pages = document.querySelectorAll('.page');
    
    // 全てのページを非表示にする
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // 指定されたIDのページだけを表示する
    document.getElementById(pageId).style.display = 'block';

    // もし表示するページがホームであれば、コンテンツを生成する関数を呼び出す
    if (pageId === 'home-page') {
        showHomepageContent();
    }
}

// ホームページ内のコンテンツ（問題リストとパネル）を生成・更新する関数
function showHomepageContent() {
    // ゲームの現在の状態を「ホーム」に設定
    gameData.currentView = 'home';
    // localStorageからデータを読み込む
    loadPanelState();
    
    // 問題リストのDOM要素を取得
    const problemList = document.querySelector('#home-page .problem-list');
    let problemListHtml = '';
    
    // 問題データの配列をループして、それぞれの問題のボタンHTMLを作成
    gameData.scenarios.forEach(scenario => {
        problemListHtml += `<button onclick="showProblem('${scenario.id}')">${scenario.title}</button>`;
    });
    // 作成したHTMLを問題リストの要素に挿入
    problemList.innerHTML = problemListHtml;

    // パネルのDOM要素を取得
    const panelContainer = document.querySelector('#home-page .panel-container');
    let panelHtml = '';
    
    // パネルの状態データをループして、それぞれのパネルのHTMLを作成
    gameData.scenarios.forEach(scenario => {
        const isUnlocked = gameData.panels[scenario.id]; // 解放されているか確認
        const panelClass = isUnlocked ? 'panel unlocked' : 'panel locked'; // 解放状態によってクラスを切り替え
        const panelContent = isUnlocked ? '✅' : '？'; // 解放状態によって表示内容を切り替え
        panelHtml += `<div class="${panelClass}">${panelContent}</div>`;
    });
    // 作成したHTMLをパネルコンテナに挿入
    panelContainer.innerHTML = panelHtml;
}

// 問題ページを表示する関数
// 選択された問題のIDを引数に受け取る
function showProblem(problemId) {
    gameData.currentView = 'problem';
    // 問題ページに切り替える
    showPage('problem-page');

    // 選択された問題のデータをscenarios配列から見つける
    const currentScenario = gameData.scenarios.find(s => s.id === problemId);
    
    // 問題ページのDOM要素の内容を更新
    problemPageDiv.querySelector('.problem-title').textContent = currentScenario.title;
    problemPageDiv.querySelector('.scenario-image').src = `images/${currentScenario.image}`;
    problemPageDiv.querySelector('.scenario-text').textContent = currentScenario.text;

    let choicesHtml = '';
    // 選択肢のボタンHTMLを生成
    currentScenario.choices.forEach(choice => {
        // 問題IDと選択肢データをまとめてJSON文字列として渡す
        const data = { problemId: currentScenario.id, choice: choice };
        choicesHtml += `<button onclick="showResult('${encodeURIComponent(JSON.stringify(data))}')">${choice.text}</button>`;
    });
    // 作成したHTMLを選択肢の要素に挿入
    problemPageDiv.querySelector('.choices').innerHTML = choicesHtml;
}

// 結果ページを表示する関数
function showResult(dataString) {
    // エンコードされたJSON文字列を元のオブジェクトに戻す
    const data = JSON.parse(decodeURIComponent(dataString));
    const problemId = data.problemId;
    const choice = data.choice;
    
    // もし選択が正解であれば
    if (choice.isCorrect) {
        // パネルの状態を更新
        gameData.panels[problemId] = true;
        // 更新したデータをlocalStorageに保存
        savePanelState();
    }
    
    // 結果ページに切り替える
    showPage('result-page');
    
    // 結果ページの内容を更新
    resultPageDiv.querySelector('.scenario-image').src = `images/${choice.resultImage}`;
    resultPageDiv.querySelector('.scenario-text').textContent = choice.result;
}

// ゲームデータをlocalStorageから完全に削除する関数
function resetGameData() {
    // localStorageから'gamePanels'キーを削除
    localStorage.removeItem('gamePanels');
    // メモリ上のデータも初期化
    gameData.panels = {};
    gameData.scenarios.forEach(scenario => {
        gameData.panels[scenario.id] = false;
    });
    // ホームページを再表示
    showPage('home-page');
    // ホームページの内容も再生成して初期化
    showHomepageContent(); 
    // リセットが完了したことをユーザーに通知
    alert('ゲームの記録がリセットされました！');
}

// サイドメニューを開閉する関数
function toggleMenu() {
    const sideMenu = document.querySelector('.side-menu');
    // 'open'クラスを付け外しすることで、CSSによる表示/非表示を切り替える
    sideMenu.classList.toggle('open');
}

// ページの読み込みが完了したときに実行される
document.addEventListener('DOMContentLoaded', () => {
    // ゲームの初期状態としてホームページを表示
    showPage('home-page');
});
