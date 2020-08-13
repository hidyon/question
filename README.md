# What's this ?

 - アンケートアプリケーション
 - 開発技術を学習する為に作成
 - COBOの導入時のアンケートに活用したい
 

### Features

 WEBアンケート機能を提供

 - 新規アンケート作成＆登録 （markdownでもOk）
 - 回答用URLにアクセスすることで即座に回答
 - いつでも結果の自動集計 (データダウンロードも可能）
 - 無記名（匿名）でのアンケートが主なターゲット
 - 回答者を特定するような入力やログ記録は行いません

### Setup & Usage

- internetとgit, docker環境があれば以下の手順で起動できます
```
 $ git clone <this application repositry>
 $ cd question 
 $ docker-compose build 
 $ docker-compose up -d
 
 起動後に http://localhost:80/ にアクセスしてみてください
```

localhost以外から利用する場合は以下のファイルを修正しdockerimageをbuid
- frontend/app/src/config.json // frontend,backend のドメインをlocalhostから変更

question-frontコンテナの以下のファイルを修正してもOK
- /usr/share/nginx/html/js/app*.js // frontend,backendのドメインをlocalhostから変更

- アプリ(コンテナ）の廃棄
```
 $ docker-compose down
```

### Development

- 開発環境は以下の手順で起動
```
 $ git clone <this application repository>
 $ cd question 
 $ docker-compose -f docker-compose.dev.yml up -d
 $ docker exec question-back npm install
 $ docker exec -d question-back npm start
 $ docker exec question-front npm install
 $ docker exec -d question-front npm run serve

 起動後に http://localhost:8080/ にアクセスしてみてください
```
 - データベースのデータを手動で操作したい場合は http://localhost:8081/ にアクセスしてください
 - データベースの中でアンケートは db: test, collection: questions
 - データベースの中で回答は db: test, collection: answers 
 - コードは写経レベルなので理解せずコーディングしている箇所が多い
 - アプリを修正したいときは以下のファイルを修正 (アプリを停止しなくても修正内容は反映され確認できます)
    - frontend/app/src/ 
    - backend/app/ 
 
### Files

```
.
├── README.md
├── backend
│   └── app                         # バックエンドサーバアプリ関連のファイル
├── docker-compose.dev.yml          # 開発用     
├── docker-compose.yml              # 本番用 
├── .env                            # docker-compose.yml用の環境変数定義ファイル
├── frontend
│   ├── app                         # フロントエンドサーバーアプリ関連のファイル
└── mongo
    ├── data                        # DBのデータ
    └── docker-entrypoint-initdb.d  # DBの初期設定スクリプトファイル
```


