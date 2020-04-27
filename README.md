# iemeshi (イエメシ)

## iemeshi について

iemeshi はテイクアウトメニューを提供するお店を探すアプリです。

## 開発

```shell
$ git clone git@github.com:iemeshi/app.git
$ cd app
$ npm install
$ npm start
```

## 他の地域のイエメシの作り方

このアプリのライセンスは MIT です。ご自由にフォークしてご利用ください。

### サイト全体の設定

`config.yml` を書き換えることでサイト全体の設定を変更できます。

設定の例:

```yaml
title: 和歌山県串本町
description: 和歌山県串本町内でテイクアウトできるお店
data_url: https://example.com/path/to/csv
```

### 店舗データについて

店舗データは CSV 以下のいずれかの方法で店舗ファイルを作成して、`config.yml` にその CSV までの URL を設定してください。

#### CSV の列について

以下の Google スプレッドシートと同じ列の CSV を作ってください。

https://docs.google.com/spreadsheets/d/1zyZQcaK3sREB59gv34aPAvk6NOktLe4P5gM42XmKmAc/edit#gid=0

`緯度`、`経度`、`店名` のみが必須で、これらのどれか一つでも入力されていないとアプリ上には表示されません。

なお、データは AJAX で常時読み込んでいますので、CSV が編集されるとほぼ同時にアプリ側にも反映されると考えてください。（キャッシュで多少タイムラグがあります。）

#### Google スプレッドシートを使う方法

上述の Google スプレッドシートをコピーして、データを追加してください。

Google スプレッドシート の URL は通常、以下のようなフォーマットの URL 担っています。

```
https://docs.google.com/spreadsheets/d/<:id>/edit#gid=<:gid>
```

これを以下のように置き換えることで、CSV フォーマットでアクセスできます。

```
https://docs.google.com/spreadsheets/d/<:id>/export?format=csv&gid=<:gid>
```

この URL を、`config.yml` に記述することで、データを読み込むことができます。

例:

* https://docs.google.com/spreadsheets/d/1zyZQcaK3sREB59gv34aPAvk6NOktLe4P5gM42XmKmAc/edit#gid=0
* https://docs.google.com/spreadsheets/d/1zyZQcaK3sREB59gv34aPAvk6NOktLe4P5gM42XmKmAc/export?format=csv&gid=0

#### GitHub を使用する方法

GitHub 上の任意のリポジトリに、以下の行で始まる CSV フォーマットのファイルをコミットしてください。

```
緯度,経度,店名,紹介文,住所,電話番号,営業時間,テイクアウト営業時間,ジャンル,価格帯,支払い方法,Instagram,Twitter,公式サイト
```

次に、CSV ファイルへの URL を以下のスクリーンショットの要領で取得して、`config.yml` にペーストしてください。

![](https://www.evernote.com/l/ABUG24eSZOxPpqjYbKB0h2LNO-PjcQoDsLUB/image.png)

サンプルリポジトリは以下のとおりです。

https://github.com/iemeshi/sample-csv

### アプリの公開について


このアプリは GitHub Pages か Netlify で公開されることを想定しています。

GitHub Pages を使用するには、GitHub Actions や Circle CI でビルドを行う必要がありますので、Netlify が簡単だと思います。

#### ドメインについて

このアプリでは [Geolonia](https://geolonia.com/) の地図を使用していますが、API キーによる制限により、以下のドメイン名でのみ利用可能です。

* https://*.github.io/
* https://*.iemeshi.jp/

`https://*.iemeshi.jp` ドメインについては、無償で提供いたしますので、以下のリポジトリの `apps.json` にご希望のサブドメインを記述してプルリクエストを送ってください。

https://github.com/iemeshi/registry
