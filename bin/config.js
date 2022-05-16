const fs = require("fs");
const path = require("path")
const srcConfigFilePath = path.join(process.cwd(), "/src/config.json");

let config;
try {
  config = JSON.parse(fs.readFileSync(srcConfigFilePath));

  const envText =
    Object.keys(config)
      // オブジェクト等は環境変数として出力しない
      .filter((key) => typeof config[key] === "string" || typeof config[key] === "number")
      .map((key) => `REACT_APP_${key.toUpperCase()}="${config[key]}"`)
      .join("\n") + "\nSKIP_PREFLIGHT_CHECK=true\n";

  fs.writeFileSync(path.join(process.cwd(), '.env'), envText)

} catch (error) {
  process.stderr.write(`${srcConfigFilePath} が存在しません。\n`);
  process.exit(1);
}



