# Geolonia PWAマップ

## Geolonia PWAマップ について

Geolonia PWA は、GitHub と Google Sheets を使って、素早く PWA の地図アプリが作れるテンプレートです。

利用方法はこちらのマニュアルをご覧ください。

[Geolonia PWA マップ ユーザーマニュアル](https://blog.geolonia.com/2022/05/17/pwamap-manual-setup.html) 

## 注意事項
このプログラムは自由にカスタマイズ可能ですが、利用についてはサポート対象外となります。

## 開発

[Geolonia PWA マップ ユーザーマニュアル](https://blog.geolonia.com/2022/05/17/pwamap-manual-setup.html) の手順を実行、その後以下のコマンドを実行して下さい。

```shell
$ git clone git@github.com:geoloniamaps/pwa.git
$ cd pwa
$ npm install
$ npm start
```

下の URL にアクセスして下さい。開発サーバーが立ち上がります。

`http://localhost:3000/<あなたのリポジトリ名>/#/`

## データの更新

Geolonia PWA では、GitHub Actions を利用して、定期的に Google Sheets のデータをダウンロードしています。
ローカル環境で開発時にデータの更新をする際は、`git pull origin master` を実行して最新のデータをダウンロードして下さい。

- GitHub Actions は10分毎のスケジュールですが、GitHub の仕様により大幅に遅れる可能性があります。
- リポジトリが60日間使用されないと、GitHub Actions は自動的に無効になります。ご注意ください。
