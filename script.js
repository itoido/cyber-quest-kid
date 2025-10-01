// script.js

// data.jsから読み込んだデータを使用
const gameData = {
    scenarios: scenarios,
    trophies: trophies,
    glossaryTerms: glossaryTerms,
    currentView: 'home'
};

// HTMLから各ページのDOM要素を取得
const homePageDiv = document.getElementById('home-page');
const problemPageDiv = document.getElementById('problem-page');
const resultPageDiv = document.getElementById('result-page');
const trophyPageDiv = document.getElementById('trophy-page');

// 問題ランダムピックアップ機能用の状態変数
const NUM_RANDOM_PROBLEMS = 2;
let currentRandomProblemIndex = 0;
let randomProblems = [];
let correctAnswersCount = 0;

function saveGameState() {
    const dataToSave = {
        trophies: gameData.trophies
    };
    localStorage.setItem('gameData', JSON.stringify(dataToSave));
}

function loadGameState() {
    const savedData = localStorage.getItem('gameData');
    if(savedData) {
        const parsedData = JSON.parse(savedData);
        gameData.trophies = parsedData.trophies || [];
    }
}

// 回答履歴保存用の変数
let incorrectProblems = [];

// ページ読み込み時にlocalStorageから回答履歴を読み込む
function loadIncorrectProblems() {
    const savedData = localStorage.getItem('incorrectProblems');
    if (savedData) {
        incorrectProblems = JSON.parse(savedData);
    }
}

// 回答履歴をlocalStorageに保存する
function saveIncorrectProblems() {
    localStorage.setItem('incorrectProblems', JSON.stringify(incorrectProblems));
}

// ページの表示を切り替える主要な関数
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');

    pages.forEach(page => {
        page.style.display = 'none';
    });

    document.getElementById(pageId).style.display = 'block';

    if (pageId === 'home-page') {
        showHomepageContent();
    } else if(pageId === 'trophy-page'){
        showTrophyPage();
    } else if (pageId === 'glossary-page') {
        showGlossaryPage();
    }
}

// ホームページ内のコンテンツ（問題リスト）を生成・更新する関数
function showHomepageContent() {
    loadGameState();

    // ホームページに戻るときは、復習リストを非表示に
    document.querySelector('.review-problem-list').style.display = 'none';
    // ホーム画面の二分割レイアウトを表示
    document.querySelector('.home-layout-container').style.display = 'flex';
    // ホーム画面の説明文を表示
    document.querySelector('.intro-container').style.display = 'block';

    const problemList = document.querySelector('#home-page .problem-list');
    let problemListHtml = '';
    gameData.scenarios.forEach(scenario => {
        problemListHtml += `<button onclick="showProblem('${scenario.id}')">${scenario.title}</button>`;
    });
    problemList.innerHTML = problemListHtml;
}

// 既存の問題ページ表示関数（好きな問題を選ぶ用）
function showProblem(problemId) {
    const currentScenario = gameData.scenarios.find(s => s.id === problemId);
    showProblemPage(currentScenario, false);
}

// 問題ページを表示する関数（好きな問題を選ぶ場合とランダムの場合を統合）
function showProblemPage(scenario, isRandomMode = false) {
    showPage('problem-page');
    
    // ホーム画面の説明文を非表示に
    const introContainer = document.querySelector('.intro-container');
    if (introContainer) {
        introContainer.style.display = 'none';
    }

    problemPageDiv.querySelector('.problem-title').textContent = scenario.title;
    problemPageDiv.querySelector('.scenario-image').src = `images/${scenario.image}`;
    problemPageDiv.querySelector('.scenario-text').textContent = scenario.text;

    const choicesContainer = problemPageDiv.querySelector('.choices');
    choicesContainer.innerHTML = '';

    scenario.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;

        switch(choice.evaluation) {
            case '〇':
                button.classList.add('evaluation-good');
                break;
            case '△':
                button.classList.add('evaluation-average');
                break;
            case '×':
                button.classList.add('evaluation-bad');
                break;
        }
        
        const data = {
            problemId: scenario.id,
            choice: choice,
            isRandomMode: isRandomMode
        };
        if (isRandomMode) {
            button.onclick = () => handleRandomResult(data);
        } else {
            button.onclick = () => handleResult(data);
        }
        choicesContainer.appendChild(button);
    });
}

// 好きな問題を選ぶモードでの回答結果を処理する関数
function handleResult(data) {
    const { problemId, choice } = data;
    
    if (choice.evaluation === '〇') {
        correctAnswersCount++;
        // ↓↓↓ 修正箇所 ↓↓↓
        // 正解した場合、復習リストから問題を削除
        const index = incorrectProblems.indexOf(problemId);
        if (index > -1) {
            incorrectProblems.splice(index, 1);
            saveIncorrectProblems();
        }
        // ↑↑↑ 修正箇所 ↑↑↑
    } else {
        // 正解しなかった場合、問題IDを履歴に追加
        if (!incorrectProblems.includes(problemId)) {
            incorrectProblems.push(problemId);
            saveIncorrectProblems();
        }
    }

    gameData.trophies.forEach(trophy => {
        if (correctAnswersCount >= trophy.correctAnswersNeeded && !trophy.unlocked) {
            trophy.unlocked = true;
        }
    });
    saveGameState();

    showPage('result-page');

    resultPageDiv.querySelector('h2').textContent = '結果';
    resultPageDiv.querySelector('.scenario-image').src = `images/${choice.resultImage}`;
    resultPageDiv.querySelector('.scenario-image').style.display = 'block';

    let evaluationLabel = '';
    switch (choice.evaluation) {
        case '〇':
            evaluationLabel = '✨ 〇（大正解）✨';
            break;
        case '△':
            evaluationLabel = '🤔 △（まあまあ）';
            break;
        case '×':
            evaluationLabel = '❌ ×（残念）';
            break;
    }

    // `evaluation-label` と `scenario-text` にテキストを挿入
    resultPageDiv.querySelector('.evaluation-label').textContent = evaluationLabel;
    resultPageDiv.querySelector('.scenario-text').textContent = choice.result;
    resultPageDiv.querySelector('.final-result-text').textContent = ''; // 最終結果テキストをクリア

    resultPageDiv.querySelector('.return-button').textContent = 'ホームに戻る';
    resultPageDiv.querySelector('.return-button').onclick = () => showPage('home-page');
}

// ランダムモードの開始関数
function startRandomQuiz() {
    currentRandomProblemIndex = 0;
    correctAnswersCount = 0;
    
    const shuffledScenarios = [...gameData.scenarios].sort(() => Math.random() - 0.5);
    randomProblems = shuffledScenarios.slice(0, NUM_RANDOM_PROBLEMS);
    
    showRandomProblem();
}

// ランダム問題ページを表示する関数
function showRandomProblem() {
    const currentScenario = randomProblems[currentRandomProblemIndex];

    if (!currentScenario) {
        showFinalResult();
        return;
    }
    
    showProblemPage(currentScenario, true);
    problemPageDiv.querySelector('.problem-title').textContent = `第${currentRandomProblemIndex + 1}問`;
}

// ランダムモードでの回答結果を処理する関数
function handleRandomResult(data) {
    const { problemId, choice } = data;

    if (choice.evaluation === '〇') {
        correctAnswersCount++;
        // ↓↓↓ 修正箇所 ↓↓↓
        // 正解した場合、復習リストから問題を削除
        const index = incorrectProblems.indexOf(problemId);
        if (index > -1) {
            incorrectProblems.splice(index, 1);
            saveIncorrectProblems();
        }
        // ↑↑↑ 修正箇所 ↑↑↑
    } else {
        // 正解しなかった場合、問題IDを履歴に追加
        if (!incorrectProblems.includes(problemId)) {
            incorrectProblems.push(problemId);
            saveIncorrectProblems();
        }
    }
    
    gameData.trophies.forEach(trophy => {
        if (correctAnswersCount >= trophy.correctAnswersNeeded && !trophy.unlocked) {
            trophy.unlocked = true;
        }
    });
    saveGameState();
    
    showPage('result-page');
    
    resultPageDiv.querySelector('h2').textContent = '結果';
    resultPageDiv.querySelector('.scenario-image').src = `images/${choice.resultImage}`;
    resultPageDiv.querySelector('.scenario-image').style.display = 'block';

    let evaluationLabel = '';
    switch (choice.evaluation) {
        case '〇':
            evaluationLabel = '✨ 〇（大正解）✨';
            break;
        case '△':
            evaluationLabel = '🤔 △（まあまあ）';
            break;
        case '×':
            evaluationLabel = '❌ ×（残念）';
            break;
    }
    
    // `evaluation-label` と `scenario-text` にテキストを挿入
    resultPageDiv.querySelector('.evaluation-label').textContent = evaluationLabel;
    resultPageDiv.querySelector('.scenario-text').textContent = choice.result;
    resultPageDiv.querySelector('.final-result-text').textContent = ''; // 最終結果テキストをクリア

    const returnButton = resultPageDiv.querySelector('.return-button');
    if (currentRandomProblemIndex < NUM_RANDOM_PROBLEMS - 1) {
        returnButton.textContent = '次の問題へ';
        returnButton.onclick = () => {
            currentRandomProblemIndex++;
            showRandomProblem();
        };
    } else {
        returnButton.textContent = '最終結果へ';
        returnButton.onclick = showFinalResult;
    }
}

// 最終結果を表示する関数
function showFinalResult() {
    showPage('result-page');
    
    resultPageDiv.querySelector('h2').textContent = '最終結果';
    resultPageDiv.querySelector('.evaluation-label').textContent = ''; // 評価ラベルをクリア
    resultPageDiv.querySelector('.scenario-image').style.display = 'none'; // 画像を非表示にする
    
    // 最終結果テキストを表示
    resultPageDiv.querySelector('.final-result-text').textContent = `${NUM_RANDOM_PROBLEMS}問中、${correctAnswersCount}問正解しました！`;
    resultPageDiv.querySelector('.scenario-text').textContent = ''; // 各問題の解説をクリア

    resultPageDiv.querySelector('.return-button').textContent = 'トロフィーを見る';
    resultPageDiv.querySelector('.return-button').onclick = () => showPage('trophy-page');
}

// 復習問題リストを表示する関数
function showReviewProblemList() {
    loadIncorrectProblems(); // 最新の履歴を読み込む

    if (incorrectProblems.length === 0) {
        alert('復習する問題がありません！まずは通常の問題に挑戦してね。');
        return;
    }

    // ホーム画面の説明文を非表示に
    document.querySelector('.intro-container').style.display = 'none';
    // ホーム画面の二分割レイアウトを非表示に
    document.querySelector('.home-layout-container').style.display = 'none';

    // 復習リストのセクションを表示
    const reviewListSection = document.querySelector('.review-problem-list');
    reviewListSection.style.display = 'block';

    const reviewListContainer = document.getElementById('review-list-container');
    reviewListContainer.innerHTML = '';

    const reviewProblemsData = gameData.scenarios.filter(s => incorrectProblems.includes(s.id));

    let reviewListHtml = '';
    reviewProblemsData.forEach(scenario => {
        // 問題リストから直接問題を選べるように
        reviewListHtml += `<button onclick="showProblem('${scenario.id}')">${scenario.title}</button>`;
    });
    reviewListContainer.innerHTML = reviewListHtml;
}

// トロフィー一覧ページを表示する関数
function showTrophyPage() {
    loadGameState(); // 最新のデータを読み込む
    
    const trophyListContainer = document.getElementById('trophy-list-container');
    let trophyHtml = '';
    
    // トロフィーをHTMLとして生成
    gameData.trophies.forEach(trophy => {
        const isUnlocked = trophy.unlocked;
        const trophyClass = isUnlocked ? 'trophy unlocked' : 'trophy locked';
        const trophyIcon = isUnlocked ? '🏆' : '？';
        
        // 達成項目と説明文をHTMLに組み込む
        trophyHtml += `
            <div class="${trophyClass}">
                <div class="trophy-icon">${trophyIcon}</div>
                <div class="trophy-info">
                    <p class="trophy-title">${trophy.title}</p>
                    <p class="trophy-description">${isUnlocked ? trophy.description : 'まだ獲得していません'}</p>
                </div>
            </div>
        `;
    });
    trophyListContainer.innerHTML = trophyHtml;
}

// 用語集を生成・表示する関数
function showGlossaryPage() {
    const glossaryListContainer = document.getElementById('glossary-list-container');
    let glossaryHtml = '';

    gameData.glossaryTerms.forEach(item => {
        glossaryHtml += `
            <div class="glossary-item">
                <h3 class="glossary-term">${item.term}</h3>
                <p class="glossary-description">${item.description}</p>
            </div>
        `;
    });
    
    glossaryListContainer.innerHTML = glossaryHtml;
}

// ゲームデータをlocalStorageから完全に削除する関数
function confirmReset() {
    // ユーザーに確認ダイアログを表示
    const isConfirmed = confirm('本当にゲームの記録をすべてリセットしますか？この操作は元に戻せません。');
    
    // ユーザーが「OK」を押した場合のみ、resetGameData()関数を呼び出す
    if (isConfirmed) {
        resetGameData();
    }
}

// ゲームデータをlocalStorageから完全に削除する関数
function resetGameData() {
    localStorage.removeItem('gameData');
    localStorage.removeItem('incorrectProblems');
    
    gameData.trophies.forEach(trophy => {
        trophy.unlocked = false;
    });
    correctAnswersCount = 0;
    
    window.location.reload(); 
    
    alert('ゲームの記録がリセットされました！');
}

// サイドメニューを開閉する関数
function toggleMenu() {
    const sideMenu = document.querySelector('.side-menu');
    sideMenu.classList.toggle('open');
}

function toggleSubMenu(menuId) {
    const subMenuText = document.getElementById(`${menuId}-text`);
    if (subMenuText) {
        subMenuText.classList.toggle('visible');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadGameState(); // ページ読み込み時にゲーム状態をロード
    loadIncorrectProblems(); // 間違えた問題リストをロード
    showPage('home-page'); // 初めにホーム画面を表示
});
