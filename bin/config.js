const fs = require("fs");
const path = require("path")
const srcConfigFilePath = path.join(process.cwd(), "/src/config.json");

let config;
let isCI = process.argv.length === 3;

try {
  config = JSON.parse(fs.readFileSync(srcConfigFilePath));

  if (isCI) {
    const GITHUB = process.argv[2].split('/')
    const GITHUB_USERNAME = GITHUB[0]
    const GITHUB_REPOSITORY = GITHUB[1]
    config.homepage_url = `https://${GITHUB_USERNAME}.github.io/${GITHUB_REPOSITORY}/`
  }

  const envText =
    Object.keys(config)
      // オブジェクト等は環境変数として出力しない
      .filter((key) => typeof config[key] === "string" || typeof config[key] === "number")
      .map((key) => `REACT_APP_${key.toUpperCase()}="${config[key]}"`)
      .join("\n");

  fs.writeFileSync(path.join(process.cwd(), '.env'), envText)

} catch (error) {
  process.stderr.write(`${srcConfigFilePath} が存在しません。\n`);
  process.exit(1);
}
