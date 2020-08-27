/**
 * DBの一般ユーザーを登録
 */

const user = {
  user: 'staff',
  pwd: 'staff_password',
  roles: [{
    role: 'readWrite',
    db: 'test'
  }]
};

db.createUser(user);


/**
 * 初期データ登録
 * db : test
 * collection : questions
 */

db.questions.insertMany(
[
    {
        "tags": [
            "dev"
        ],
        "total": 3,
        "status": "実施中",
        "answerCounter": 0,
        "title": "【サンプル】6/1ランチ会事前アンケート",
        "owner": "usr01",
        "purpose": "参加者に配るお弁当などの希望を把握",
        "description": "6/1 12:15-12:50 @いつもの場所　「COBOユーザー会」",
        "isPublicAnswer": true,
        "items": [
            {
                "questionIndex": 1,
                "questionText": "お弁当を選んでください",
                "isMultipleAnswer": false,
                "choiceItems": [
                    {
                        "symbol": "1",
                        "text": "幕の内"
                    },
                    {
                        "symbol": "2",
                        "text": "中華"
                    },
                    {
                        "symbol": "3",
                        "text": "焼き肉"
                    },
                    {
                        "symbol": "4",
                        "text": "唐揚げ"
                    }
                ],
                "isFreeFormAnswer": false
            },
            {
                "questionIndex": 2,
                "questionText": "飲み物を選んでください",
                "isMultipleAnswer": false,
                "choiceItems": [
                    {
                        "symbol": "1",
                        "text": "水"
                    },
                    {
                        "symbol": "2",
                        "text": "お茶"
                    }
                ],
                "isFreeFormAnswer": false
            },
            {
                "questionIndex": 3,
                "questionText": "事前に伝えておきたいことなどあれば自由に記入ください",
                "isMultipleAnswer": false,
                "choiceItems": [
                    {
                        "symbol": "1",
                        "text": ""
                    }
                ],
                "isFreeFormAnswer": true
            }
        ],
        "__v": 0
    },
    {
        "tags": [
            "dev"
        ],
        "total": 5,
        "status": "実施中",
        "answerCounter": 0,
        "title": "【サンプル】6/1ランチ会事後アンケート",
        "owner": "usr01",
        "purpose": "COBOの利用状況と満足度の定期把握",
        "description": "token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJxdWVzdGlvbklkIjoiNWYyNmM0MGZlZTliZDNlMWRhMDQxYjNiIiwiaWF0IjoxNTk4NDM0MDc5fQ.nvLtX0XdFZBGKU5OFMp-1fzsPGY0lOMnhDD_1qB1DhQ",
        "isPublicAnswer": false,
        "items": [
            {
                "questionIndex": 1,
                "questionText": "所属を選択してください",
                "isMultipleAnswer": false,
                "choiceItems": [
                    {
                        "symbol": "1",
                        "text": "Aチーム"
                    },
                    {
                        "symbol": "2",
                        "text": "Bチーム"
                    },
                    {
                        "symbol": "3",
                        "text": "Cチーム"
                    }
                ],
                "isFreeFormAnswer": false
            },
            {
                "questionIndex": 2,
                "questionText": "役割を選択してください",
                "isMultipleAnswer": false,
                "choiceItems": [
                    {
                        "symbol": "1",
                        "text": "設計担当"
                    },
                    {
                        "symbol": "2",
                        "text": "レビューイ"
                    },
                    {
                        "symbol": "3",
                        "text": "プロジェクトリーダー"
                    },
                    {
                        "symbol": "4",
                        "text": "その他"
                    }
                ],
                "isFreeFormAnswer": false
            },
            {
                "questionIndex": 3,
                "questionText": "COBOの利用状況をおしえてくださ",
                "isMultipleAnswer": false,
                "choiceItems": [
                    {
                        "symbol": "1",
                        "text": "利用していない"
                    },
                    {
                        "symbol": "2",
                        "text": "トライアルとして利用"
                    },
                    {
                        "symbol": "3",
                        "text": "通常利用"
                    }
                ],
                "isFreeFormAnswer": false
            },
            {
                "questionIndex": 4,
                "questionText": "COBOの機能で便利と思うものを選択してください（複数可)",
                "isMultipleAnswer": true,
                "choiceItems": [
                    {
                        "symbol": "1",
                        "text": "ソースコンペア"
                    },
                    {
                        "symbol": "2",
                        "text": "プログラム品質チェック"
                    },
                    {
                        "symbol": "3",
                        "text": "GAIAからのソースダウンロード"
                    },
                    {
                        "symbol": "4",
                        "text": "プログラムチェックシート作成"
                    },
                    {
                        "symbol": "5",
                        "text": "その他"
                    }
                ],
                "isFreeFormAnswer": false
            },
            {
                "questionIndex": 5,
                "questionText": "追加してほしい要望を自由に記入ください",
                "isMultipleAnswer": false,
                "choiceItems": [
                    {
                        "symbol": "1",
                        "text": ""
                    }
                ],
                "isFreeFormAnswer": true
            }
        ],
        "__v": 0
    },
    {
        "tags": [
            "dev"
        ],
        "total": 3,
        "status": "実施中",
        "answerCounter": 0,
        "title": "【サンプル】NITUBE　初回利用者アンケート",
        "owner": "usr02",
        "purpose": "初回リリース後のユーザーの感想を把握",
        "description": "6/14までに回答にご協力おねがいします",
        "isPublicAnswer": true,
        "items": [
            {
                "questionIndex": 1,
                "questionText": "動画の視聴は快適でしたか　最も当てはまるものを選択してください",
                "isMultipleAnswer": false,
                "choiceItems": [
                    {
                        "symbol": "1",
                        "text": "快適だった"
                    },
                    {
                        "symbol": "2",
                        "text": "快適ではなかった（理由　通信状態）"
                    },
                    {
                        "symbol": "3",
                        "text": "快適ではなかった（理由　音声が聞きづらい）"
                    },
                    {
                        "symbol": "4",
                        "text": "快適ではなかった（理由　画質が悪い）"
                    }
                ],
                "isFreeFormAnswer": false
            },
            {
                "questionIndex": 2,
                "questionText": "最も追加してほしい機能を選択してください",
                "isMultipleAnswer": false,
                "choiceItems": [
                    {
                        "symbol": "1",
                        "text": "関連文書へのリンク"
                    },
                    {
                        "symbol": "2",
                        "text": "字幕"
                    },
                    {
                        "symbol": "3",
                        "text": "会社携帯からの視聴"
                    }
                ],
                "isFreeFormAnswer": false
            },
            {
                "questionIndex": 3,
                "questionText": "配信動画として追加してほしいものを自由に記入ください",
                "isMultipleAnswer": false,
                "choiceItems": [
                    {
                        "symbol": "1",
                        "text": ""
                    }
                ],
                "isFreeFormAnswer": true
            }
        ],
        "__v": 0
    },
    {
        "tags": [
            "dev"
        ],
        "total": 3,
        "status": "実施中",
        "answerCounter": 0,
        "title": "【サンプル】クイズ",
        "owner": "usr03",
        "purpose": "ひまつぶし",
        "description": "省略",
        "isPublicAnswer": true,
        "items": [
            {
                "questionIndex": 1,
                "questionText": "樋口一葉の代表作　「〇〇くらべ」",
                "isMultipleAnswer": false,
                "choiceItems": [
                    {
                        "symbol": "1",
                        "text": "ちえ"
                    },
                    {
                        "symbol": "2",
                        "text": "たけ"
                    },
                    {
                        "symbol": "3",
                        "text": "がまん"
                    }
                ],
                "isFreeFormAnswer": false
            },
            {
                "questionIndex": 2,
                "questionText": "人類が犬と暮らしはじめたのは",
                "isMultipleAnswer": false,
                "choiceItems": [
                    {
                        "symbol": "1",
                        "text": "2000年前"
                    },
                    {
                        "symbol": "2",
                        "text": "4500年前"
                    },
                    {
                        "symbol": "3",
                        "text": "20000年前"
                    }
                ],
                "isFreeFormAnswer": false
            },
            {
                "questionIndex": 3,
                "questionText": "次の□に記号を入れて、小町算を完成しよう。　1 - 2 □ 3 + 4 × 5 + 6 + 7 + 8 × 9 = 100",
                "isMultipleAnswer": false,
                "choiceItems": [
                    {
                        "symbol": "1",
                        "text": "+"
                    },
                    {
                        "symbol": "2",
                        "text": "-"
                    },
                    {
                        "symbol": "3",
                        "text": "×"
                    },
                    {
                        "symbol": "4",
                        "text": "÷"
                    }
                ],
                "isFreeFormAnswer": false
            }
        ],
        "__v": 0
    },
{
    tags: [
        'dev'
    ],
    total: 1,
    status: '実施中',
    answerCounter: 0,
    title: '【サンプル】オンライン勉強会　日程調整！',
    owner: 'usr01',
    purpose: '日程調整',
    description: '省略',
    isPublicAnswer: true,
    items: [
        {
            questionIndex: 1,
            questionText: '### オンライン勉強会開催　\ndockerの勉強会をオンラインで実施します。参加可能な日時を複数選択ください\n\n---\n### 勉強会の内容\n- docker 勉強会\n   - docker のインストール\n   - docker pull\n   - docker images\n   - docker run\n   - docker ps\n- 時間は３０分を予定\n- 各自自宅などからインターネット経由で参加\n\n',
            isMultipleAnswer: true,
            choiceItems: [
                {
                    symbol: '1',
                    text: '6/10(水) 20:00 - 20:30'
                },
                {
                    symbol: '2',
                    text: '6/10(水) 21:00 - 21:30'
                },
                {
                    symbol: '3',
                    text: '6/11(木) 21:00 - 21:30'
                },
                {
                    symbol: '4',
                    text: '6/12(金) 21:00 - 21:30'
                }
            ],
            isFreeFormAnswer: false
        }
    ],
    __v: 0
}
]
)
