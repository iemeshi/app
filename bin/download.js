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

// 引数に Google Sheet API key が指定されてなければ終了。
if (!process.argv[2]) {

  process.stderr.write(
    `引数に Google Sheet API Key を指定して下さい。\n`
  );

  process.exit(4);
}

if (!config.data_url) {
  process.stderr.write(
    `config.yml の data_url を指定して下さい。\n`
  );
  process.exit(5);
}

const distDataFilePath = path.join(process.cwd(), "/public/data.json");
const GOOGLE_SHEET_API_KEY = process.argv[2] // 引数で指定した Google Sheet API key を取得する
const GOOGLE_SHEET_ID = config.data_url.replace('https://docs.google.com/spreadsheets/d/', '').replace('/edit?usp=sharing', '')

// スプレッドシートのデータをダウンロードする
fetch(`https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/フォームの回答 1!A1:K?key=${GOOGLE_SHEET_API_KEY}`)
  .then(res => res.json())
  .then(json => {

    fs.writeFileSync(distDataFilePath, JSON.stringify(json, null, 2));
    process.exit(0);

  })
  .catch(err => {

    console.log(err)
    process.stderr.write(
      `スプレッドシートのダウンロードに失敗しました。URLとAPIキー、閲覧権限が正しく設定されている事を確認して下さい。\n`
    );
    process.exit(6);

  })

