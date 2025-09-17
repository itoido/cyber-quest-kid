// 全体のゲームデータを管理
const gameData = {
    scenarios: scenarios,
    panels: panels,
    currentView: 'home'
};

const appDiv = document.getElementById('app');

// パネルの状態をlocalStorageに保存
function savePanelState() {
    localStorage.setItem('gamePanels', JSON.stringify(gameData.panels));
}

// パネルの状態をlocalStorageから読み込み
function loadPanelState() {
    const savedData = localStorage.getItem('gamePanels');
    if (savedData) {
        gameData.panels = JSON.parse(savedData);
    }
}

// ホーム画面を表示する関数
function showHomepage() {
    gameData.currentView = 'home';
    loadPanelState(); // ホーム画面表示時に状態を読み込む
    
    let html = '<h2>問題を選んでね</h2><div class="problem-list">';
    
    gameData.scenarios.forEach(scenario => {
        html += `<button onclick="showProblem('${scenario.id}')">${scenario.title}</button>`;
    });

    html += '</div>';

    html += '<h2 style="margin-top: 40px;">ごほうびパネル</h2><div class="panel-container">';
    gameData.scenarios.forEach(scenario => {
        const isUnlocked = gameData.panels[scenario.id];
        const panelClass = isUnlocked ? 'panel unlocked' : 'panel locked';
        const panelContent = isUnlocked ? '✅' : '？';
        html += `<div class="${panelClass}">${panelContent}</div>`;
    });
    html += '</div>';

    // リセットボタンを追加
    html += '<button class="return-button reset-button" onclick="resetGameData()">ゲームをリセット</button>';

    appDiv.innerHTML = html;
}

// 問題画面を表示する関数
function showProblem(problemId) {
    gameData.currentView = 'problem';
    const currentScenario = gameData.scenarios.find(s => s.id === problemId);
    
    let html = `<h2 class="problem-title">${currentScenario.title}</h2>`;
    html += `<img class="scenario-image" src="images/${currentScenario.image}" alt="${currentScenario.title}">`;
    html += `<p class="scenario-text">${currentScenario.text}</p>`;
    html += `<div class="choices">`;

    currentScenario.choices.forEach(choice => {
        const data = { problemId: currentScenario.id, choice: choice };
        html += `<button onclick="showResult('${encodeURIComponent(JSON.stringify(data))}')">${choice.text}</button>`;
    });

    html += `</div>`;
    appDiv.innerHTML = html;
}

// 結果画面を表示する関数
function showResult(dataString) {
    const data = JSON.parse(decodeURIComponent(dataString));
    const problemId = data.problemId;
    const choice = data.choice;
    
    if (choice.isCorrect) {
        gameData.panels[problemId] = true;
        savePanelState(); // パネルの状態が変更されたら保存
    }
    
    let html = `<h2>結果</h2>`;
    html += `<img class="scenario-image" src="images/${choice.resultImage}" alt="結果の画像">`;
    html += `<p class="scenario-text">${choice.result}</p>`;
    html += `<button class="return-button" onclick="showHomepage()">ホームに戻る</button>`;
    
    appDiv.innerHTML = html;
}

// ゲームデータをリセットする関数
function resetGameData() {
    // localStorageからデータを削除
    localStorage.removeItem('gamePanels');
    // メモリ上のデータも初期化
    gameData.panels = {};
    gameData.scenarios.forEach(scenario => {
        gameData.panels[scenario.id] = false;
    });
    // ホーム画面を再描画
    showHomepage();
    alert('ゲームの記録がリセットされました！');
}

// サイドメニューを開閉する関数
function toggleMenu() {
    const sideMenu = document.querySelector('.side-menu');
    sideMenu.classList.toggle('open');
}

// ... その他、ゲームのロジックはそのまま ...

// ページの読み込みが完了したらホーム画面を表示
document.addEventListener('DOMContentLoaded', showHomepage);