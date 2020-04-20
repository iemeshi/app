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

## カスタマイズ

### サイト全体の設定

config.yml を書き換えることでサイト全体の設定を変更できます。

設定の例:

```yaml
title: 和歌山県串本町
description: 和歌山県串本町内でテイクアウトできるお店
data_url: https://example.com/path/to/csv

map:
  lng: 135.7815
  lat: 33.4725
  zoom: 14
```
