# Geolonia PWA

## Geolonia PWA について

Geolonia PWA は、GitHub と Google Sheets を使って、素早く PWA の地図アプリが作れるテンプレートです。

## 使い方

* [Use this template](https://github.com/geoloniamaps/pwa/generate) ボタンでこのリポジトリをコピー。

リポジトリ名を入力し、「Create repository from template」でリポジトリを作成。（この時に必ず「Include all branches」にチェックを入れる）

![スクリーンショット 2022-05-12 2 20 47](https://user-images.githubusercontent.com/8760841/167909365-eebb1d3e-ecad-4cb0-bd3b-ea67625a7b39.png)

Settings > Secrets > Action > 「New repository secret」ボタンから、スプレッドシートのAPIキー を 'GOOGLE_SHEET_API_KEY'、スプレッドシートの共有URLを（共有設定を一般読み取りに設定）、'GOOGLE_SHEET_URL'という値で、GitHub のシークレットに設定。 

　![スクリーンショット 2022-05-12 2 01 28](https://user-images.githubusercontent.com/8760841/167909825-43c819dd-12cf-447b-a5cf-7ed44ae43d59.png)

Settings > Action >General から Workflow permissions の権限を、「Read and write permissions」に変更。保存する。

![スクリーンショット 2022-05-12 1 52 21](https://user-images.githubusercontent.com/8760841/167910678-ecc5d7c5-d6bb-47de-b442-1907c8cb14ef.png)

その後、手動でワークフローを実行し、「build」 と「page-build-deployment」が緑になっているのを確認。
![スクリーンショット 2022-05-12 2 19 03](https://user-images.githubusercontent.com/8760841/167910753-eb9507f0-b366-4c6f-8245-4bf27c36cff0.png)

下の形式のURLをクリックすると、地図アプリページに移動できる。

`https://あなたのユーザー名.github.io/アプリ名/`

## 開発

```shell
$ git clone git@github.com:geoloniamaps/pwa.git
$ cd pwa
$ npm install
$ npm start
```
