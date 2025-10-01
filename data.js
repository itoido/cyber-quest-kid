// data.js

// 問題のデータ（scenarios）
const scenarios = [
    // 最初の問題
    {
        id: 'online-game-incident',
        title: 'オンラインゲームの危険な約束',
        text: 'オンラインゲームで知らない人から「レアアイテムをあげるから、パスワードを教えて」と言われた。どうする？',
        image: 'kenta-normal.png',
        choices: [
            {
                text: 'パスワードを教えずに、相手をブロックして話さないようにする',
                result: '大正解！自分の情報を守るだけでなく、運営に通報することでトラブルの拡大を防ぐことができます。',
                isCorrect: true,
                resultImage: 'kenta-normal.png',
                evaluation: '〇'
            },
            {
                text: 'パスワードは教えずに、相手をただ無視して放っておく',
                result: '放っておくのも1つの手ですが、相手があなたに粘質に付きまとってくるかもしれません。あと1歩。',
                isCorrect: false,
                resultImage: 'kenta-confused.png',
                evaluation: '△'
            },
            {
                text: 'レアアイテムが欲しいので、相手にパスワードを教える',
                result: 'アカウントが乗っ取られてしまった。残念！',
                isCorrect: false,
                resultImage: 'kenta-sad.png',
                evaluation: '×'
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
                resultImage: 'kenta-sad.png',
                evaluation: '×'
            },
            {
                text: '本人に直接連絡して確認する',
                result: '大正解！メールの送り主が本人か必ず確認しましょう。',
                isCorrect: true,
                resultImage: 'yuuki-confused.png',
                evaluation: '〇'
            }
        ]
    },
    {
        id: 'how-to-create-strong-password',
        title: '強力なパスワードの作り方',
        text: '他の人に推測されないような、強いパスワードの作り方として正しいのはどれ？',
        image: 'aaa.png',
        choices: [
            {
                text: 'あなたの誕生日',
                result: 'あなたの誕生日は、他の人にバレている可能性がとても高い！パスワードにするのはやめておこう。',
                isCorrect: false,
                resultImage: 'kenta-sad.png',
                evaluation: '×'
            },
            {
                text: '長くてランダムな文字',
                result: '正解！ランダムな文字の方がバレない可能性が高いね。文字数は12文字以上がおすすめ！',
                isCorrect: true,
                resultImage: 'yuuki-confused.png',
                evaluation: '〇'
            },
            {
                text: '123456の数字列',
                result: '残念！自分に関係ない数字だけど、連続しているとバレやすいよ。',
                isCorrect: false,
                resultImage: 'yuuki-confused.png',
                evaluation: '△'
            }
        ]
    },
    {
        id: 'File-extension',
        title: 'ファイルの「拡張子」',
        text: 'パソコンにダウンロードしたファイルの内、開いたら危険かもしれないのはどれ？',
        image: 'b.png',
        choices: [
            {
                text: 'kid.exe',
                result: '正解！「～～.exe」は、何かの実行ファイルなのでウイルスに感染する可能性があるよ！',
                isCorrect: true,
                resultImage: 'kenta-sad.png',
                evaluation: '〇'
            },
            {
                text: 'cyber.txt',
                result: '残念！「～～.txt」はテキストファイルだから、危険性は低い。それでも、まったくない訳じゃないことに注意だ！',
                isCorrect: false,
                resultImage: 'yuuki-confused.png',
                evaluation: '×'
            },
            {
                text: 'quest.jpg',
                result: '残念！「～～.jpg」は画像ファイルだから、危険性は低い。それでも、まったくない訳じゃないことに注意だ！',
                isCorrect: false,
                resultImage: 'yuuki-confused.png',
                evaluation: '×'
            }
        ]
    },
    {
        id: 'SocialMedia-Privacy',
        title: 'SNSへの動画投稿',
        text: 'TikTokなど自分が撮影した動画を投稿するとき、何に注意する必要があるかな？',
        image: 'c.png',
        choices: [
            {
                text: '映り込む人の顔',
                result: '確かに人の顔を映さないように注意するのは大事だね。だけど本当にこれだけだったかな？',
                isCorrect: false,
                resultImage: 'kenta-sad.png',
                evaluation: '△'
            },
            {
                text: '撮影している場所',
                result: '自分が住んでいる場所がバレてしまうよね。だけど本当にこれだけだったかな？',
                isCorrect: false,
                resultImage: 'yuuki-confused.png',
                evaluation: '△'
            },
            {
                text: '来ている制服',
                result: '自分が通っている学校が分かっちゃうね。だけど本当にこれだけだったかな？',
                isCorrect: false,
                resultImage: 'yuuki-confused.png',
                evaluation: '△'
            },
            {
                text: '全部！',
                result: '大正解！自分だけじゃなく他の人も含めて、個人情報が見つかっちゃうものは全て気をつけよう！',
                isCorrect: true,
                resultImage: 'yuuki-confused.png',
                evaluation: '〇'
            }
        ]
    },
    {
        id: 'QRcode-reader',
        title: 'QRコードの読み取り',
        text: '外に出かけた時、QRコードを読み取るときの行動で正しいのはどれ？',
        image: 'b.png',
        choices: [
            {
                text: '他の人に読みとってもらう',
                result: '自分に危険はないかもしれないけど、他の人が危なくなるかもしれない。判断は自分でしよう。',
                isCorrect: false,
                resultImage: 'kenta-sad.png',
                evaluation: '△'
            },
            {
                text: '出所が分からないQRコードは読み取らない',
                result: '大正解！お店にあるものなら安全かもしれないけど、謎のQRコードは読み取ると危険かもしれないぞ、気をつけよう！',
                isCorrect: true,
                resultImage: 'yuuki-confused.png',
                evaluation: '〇'
            },
            {
                text: 'なんでも読みとる',
                result: '残念！QRコードの中には、フィッシング詐欺につながるものもあるぞ。ちゃんと確認をしてから読み取ろう！',
                isCorrect: false,
                resultImage: 'yuuki-confused.png',
                evaluation: '×'
            }
        ]
    },
    {
        id: 'Dropped-USB',
        title: '落ちていたUSB',
        text: '自分のものでないUSBメモリを拾ったよ。これをどうしたらいいかな？',
        image: 'b.png',
        choices: [
            {
                text: '拾わない、もしくは落とし物としてどこかに届ける',
                result: '大正解！USBメモリはどんなデータが入っているかわからないから、誰のものか分からないなら拾わないようにしよう！',
                isCorrect: true,
                resultImage: 'kenta-sad.png',
                evaluation: '〇'
            },
            {
                text: 'PCにつないで中身を確認する',
                result: '残念！USBにウイルスが入っていたら、PCが感染してしまう。出所が分からないものは絶対にやめておこう！',
                isCorrect: false,
                resultImage: 'yuuki-confused.png',
                evaluation: '×'
            },
            {
                text: 'そのまま持ち帰る',
                result: '持ち帰って時間が経ったら、拾ったことも忘れてしまうかもしれないよ。',
                isCorrect: false,
                resultImage: 'yuuki-confused.png',
                evaluation: '△'
            }
        ]
    }
];

// トロフィーのデータ（trophies）
const trophies = [
    {
        id: 'trophy-01',
        correctAnswersNeeded: 1, // 正解数1で達成
        title: '最初の1問！',
        description: '初めての問題に正解した証'
    },
    {
        id: 'trophy-02',
        correctAnswersNeeded: 2, // 正解数2で達成
        title: '全問正解！',
        description: 'ランダムクイズを全問正解した者に与えられるトロフィー'
    },
    {
        id: 'trophy-03',
        correctAnswersNeeded: 0, // 正解数2で達成
        title: 'aaaa',
        description: 'aaaaaaaaaaaaaaaa'
    }
];

// 用語集のデータ（glossaryTerms）
const glossaryTerms = [
    {
        term: 'フィッシング詐欺',
        description: 'メールやSNSを使って、本物の会社や友達になりすまし、パスワードやクレジットカードの番号を盗もうとする悪いことです。'
    },
    {
        term: 'パスワード',
        description: '秘密の合言葉。アカウントを守るために、他の人には絶対に教えちゃいけないよ。長くて、他の人にわかりにくいものにしよう。'
    },
    {
        term: 'アカウント乗っ取り',
        description: '自分のアカウントを悪い人に使われてしまうこと。パスワードを盗まれたり、知らないうちに他のサービスに登録されたりするよ。'
    },
    {
        term: '個人情報',
        description: '名前、住所、電話番号など、君だけの秘密の情報だよ。インターネットで教えるときは、本当に信頼できる相手かよく確認しよう。'
    },
    {
        term: '二要素認証',
        description: '文字のパスワードだけじゃなく、顔や指紋を使った認証を組み合わせた認証のこと。2つの認証を使うことで、セキュリティを強化するよ！'
    },
    {
        term: 'ファイルの拡張子',
        description: 'ファイルの名前の一番後ろについている「.(ドット)」の後に続くアルファベットのこと。例えば「.txt」や「.exe」等があるよ。拡張子を見るだけで、そのファイルが何を開くかが分かるんだ。'
    },
    {
        term: 'QRコード',
        description: '白黒の四角いマークを見たことがあるかな？あのマークの中にウェブサイトのリンクや、文字のメッセージ、写真といった沢山のデータを含めることができるんだ！'
    }
];
