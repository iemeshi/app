/**
 * @file YAML 形式の設定ファイルをパースし、スプレッドシートIDを取得。データをダウンロードする。
 */

const fs = require("fs");
const path = require("path")
const fetch = require("node-fetch")

const srcConfigFilePath = path.join(process.cwd(), "/src/config.json");

let config;
try {
  config = JSON.parse(fs.readFileSync(srcConfigFilePath));
} catch (error) {
  process.stderr.write(`${srcConfigFilePath} が存在しません。\n`);
  process.exit(1);
}

if (!config.logo_image_url) {
  process.stderr.write(
    `config.yml の logo_image_url を指定して下さい。\n`
  );
  process.exit(2);
}

const distLogoFilePath = path.join(process.cwd(), "/public/logo.svg");

// スプレッドシートのデータをダウンロードする
fetch(config.logo_image_url)
  .then(res => res.text())
  .then(text => {

    fs.writeFileSync(distLogoFilePath, text);
    process.exit(0);

  })
  .catch(err => {

    console.log(err)
    process.stderr.write(
      `ロゴ画像のダウンロードに失敗しました。正しいURLか確認して下さい。\n`
    );
    process.exit(3);

  })

