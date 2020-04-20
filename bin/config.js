/**
 * @file YAML 形式の設定ファイルをパースし 環境変数として react-scripts に読み込ませる
 */

const fs = require("fs");
const YAML = require("yaml");

// 例外的にプレフィックス無しで環境変数に展開する属性
//　https://create-react-app.dev/docs/adding-custom-environment-variables/#referencing-environment-variables-in-the-html
const exceptions = ["PUBLIC_URL", "NODE_ENV"];

const configFilePath = process.cwd() + "/config.yml";

let yamlText;
try {
  yamlText = fs.readFileSync(configFilePath).toString();
} catch (error) {
  console.error(`[error] ${configFilePath} が存在しません。`);
  process.exit(1);
}

let config;
try {
  config = YAML.parse(yamlText);
} catch (error) {
  console.error(
    `[error] ${configFilePath} は正しい YAML 形式である必要があります。`
  );
  process.exit(2);
}

if (!config) {
  console.error(
    `[error] ${configFilePath} は正しい YAML 形式である必要があります。`
  );
  process.exit(3);
}

const envText =
  Object.keys(config)
    .map((key) => {
      const upperCasedKey = key.toUpperCase();
      if (exceptions.includes(upperCasedKey)) {
        return `export ${upperCasedKey}=${config[key]}`;
      } else {
        return `export REACT_APP_${upperCasedKey}=${config[key]}`;
      }
    })
    .join("\n") + "\n";

process.stdout.write(envText);
process.exit(0);
