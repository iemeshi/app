/**
 * @file YAML 形式の設定ファイルをパースし、スプレッドシートIDを取得。データをダウンロードする。
 */

const fs = require("fs");
const path = require("path")

const GITHUB = process.argv[2].split('/')
const GITHUB_USERNAME = GITHUB[0]
const GITHUB_REPOSITORY = GITHUB[1]

const filePath = path.join(process.cwd(), "package.json");

let config;
try {
  config = JSON.parse(fs.readFileSync(filePath));
} catch (error) {
  process.stderr.write(`${filePath} が存在しません。\n`);
  process.exit(1);
}

if (!config.homepage) {
  process.stderr.write(
    `package.json の homepage を指定して下さい。\n`
  );
  process.exit(2);
}

config.homepage = `https://${GITHUB_USERNAME}.github.io/${GITHUB_REPOSITORY}/`

fs.writeFileSync(filePath, JSON.stringify(config, null, 2));

process.exit(0);
