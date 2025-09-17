// data.js

// 問題のデータ（scenarios）
// ゲームで使うすべての問題がこの配列にまとめられている
const scenarios = [
    // 最初の問題
    {
        // 問題を識別するためのユニークなID
        id: 'online-game-incident',
        // ホーム画面に表示される問題のタイトル
        title: 'オンラインゲームの危険な約束',
        // 問題ページに表示される本文
        text: 'オンラインゲームで知らない人から「レアアイテムをあげるから、パスワードを教えて」と言われた。どうする？',
        // 問題ページに表示されるキャラクターの画像ファイル名
        image: 'kenta-normal.png',
        // 選択肢の配列
        choices: [
            { 
                text: 'パスワードを教える', // ボタンに表示されるテキスト
                result: 'アカウントが乗っ取られてしまった。残念！', // 選択後の結果テキスト
                isCorrect: false, // 正解かどうか（パネル開放の判定に使う）
                resultImage: 'kenta-sad.png' // 結果ページに表示される画像。今はない
            },
            { 
                text: '教えずに親に相談する',
                result: '大正解！知らない人に個人情報を教えてはいけません。親に相談することで、トラブルを未然に防ぐことができます。',
                isCorrect: true,
                resultImage: 'kenta-normal.png' 
            }
        ]
    },
    // 2番目の問題
    {
        id: 'phishing-email-scam',
        title: 'フィッシング詐欺メール',
        text: '親友を名乗る人から、「お金が必要だから、電子マネーを買ってくれないか？」とメールが来た。どうする？',
        image: 'yuuki-confused.png',
        choices: [
            { 
                text: 'すぐに買う',
                result: '詐欺に遭ってしまった。',
                isCorrect: false,
                resultImage: 'kenta-sad.png' 
            },
            { 
                text: '本人に直接連絡して確認する',
                result: '大正解！メールの送り主が本人か必ず確認しましょう。',
                isCorrect: true,
                resultImage: 'yuuki-confused.png' 
            }
        ]
    }
];
    
// パネルの状態を管理 (panels)
// このオブジェクトが、各問題のパネルが解放されているかどうかの初期状態を保持する
// localStorageにデータがない場合に、この初期値が使われる。初期値falseで設定。
const panels = {
    'online-game-incident': false,
    'phishing-email-scam': false
};

//aaaaabbbbbbb