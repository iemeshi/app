/**
 * @file YAML 形式の設定ファイルをパースし 環境変数として react-scripts に読み込ませる
 */

const fs = require("fs");
const YAML = require("yaml");
const path = require("path")

const srcConfigFilePath = path.join(process.cwd(), "/config.yml");
const distConfigFilePath = path.join(process.cwd(), "/src/config.json");

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

const envText =
  Object.keys(config)
    // オブジェクト等は環境変数として出力しない
    .filter((key) => typeof config[key] === "string" || typeof config[key] === "number")
    .map((key) => `export REACT_APP_${key.toUpperCase()}="${config[key]}"`)
    .join("\n") + "\n";

// 全ての設定は src/config.json として出力する
fs.writeFileSync(distConfigFilePath, JSON.stringify(config, null, 2));

fs.writeFileSync(path.join(process.cwd() , '.env'), envText)
process.exit(0);
