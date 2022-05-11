/**
 * @file YAML 形式の設定ファイルをパースし、スプレッドシートIDを取得。データをダウンロードする。
 */

const fs = require("fs");
const YAML = require("yaml");
const path = require("path")
const fetch = require("node-fetch")


const srcConfigFilePath = path.join(process.cwd(), "/config.yml");

let yamlText;
try {
  yamlText = fs.readFileSync(srcConfigFilePath).toString();
} catch (error) {
  process.stderr.write(`${srcConfigFilePath} が存在しません。\n`);
  process.exit(1);
}

let config;
try {
  config = YAML.parse(yamlText);
} catch (error) {
  process.stderr.write(
    `${srcConfigFilePath} は正しい YAML 形式である必要があります。\n`
  );
  process.exit(2);
}

if (!config) {
  process.stderr.write(
    `${srcConfigFilePath} は正しい YAML 形式である必要があります。\n`
  );
  process.exit(3);
}

if (!config.logo_image_url) {
  process.stderr.write(
    `config.yml の logo_image_url を指定して下さい。\n`
  );
  process.exit(5);
}

if (config.logo_image_url && config.logo_image_url.match(/^https:\/\/www.dropbox.com\/s\//)) {

  // Dropbox の共有 URL から　直 URL に変換
  config.logo_image_url = config.logo_image_url.replace(/dl=\d+$/, 'raw=1')
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
    process.exit(6);

  })

