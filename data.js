// data.js

// 問題のデータ
const scenarios = [
    {
        id: 'online-game-incident',
        title: 'オンラインゲームの危険な約束',
        text: 'オンラインゲームで知らない人から「レアアイテムをあげるから、パスワードを教えて」と言われた。どうする？',
        image: 'kenta-normal.png',
        choices: [
            { text: 'パスワードを教える', result: 'アカウントが乗っ取られてしまった。残念！', isCorrect: false, resultImage: 'kenta-sad.png' },
            { text: '教えずに親に相談する', result: '大正解！知らない人に個人情報を教えてはいけません。親に相談することで、トラブルを未然に防ぐことができます。', isCorrect: true, resultImage: 'kenta-normal.png' }
        ]
    },
    {
        id: 'phishing-email-scam',
        title: 'フィッシング詐欺メール',
        text: '親友を名乗る人から、「お金が必要だから、電子マネーを買ってくれないか？」とメールが来た。どうする？',
        image: 'yuuki-confused.png',
        choices: [
            { text: 'すぐに買う', result: '詐欺に遭ってしまった。', isCorrect: false, resultImage: 'kenta-sad.png' },
            { text: '本人に直接連絡して確認する', result: '大正解！メールの送り主が本人か必ず確認しましょう。', isCorrect: true, resultImage: 'yuuki-confused.png' }
        ]
    }
];
    
// パネルの状態を管理 (初期値)
const panels = {
    'online-game-incident': false,
    'phishing-email-scam': false
};