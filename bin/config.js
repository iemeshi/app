// config parser

const fs = require('fs')
const YAML = require('yaml')

const configFilePath = process.cwd() + '/config.yml'

let yamlText
try {
  yamlText = fs.readFileSync(configFilePath).toString()
} catch (error) {
  console.error(`[error] ${configFilePath} が存在しません。`)
  process.exit(1)
}

let config
try {
  config = YAML.parse(yamlText)
} catch (error) {
  console.error(`[error] ${configFilePath} は正しい YAML 形式である必要があります。`)
  process.exit(2)
}

if(!config) {
  console.error(`[error] ${configFilePath} は正しい YAML 形式である必要があります。`)
  process.exit(3)
}

const envText = Object.keys(config)
  .map(key => `export REACT_APP_${key.toUpperCase()}=${config[key]}`)
  .join('\n') + '\n'

process.stdout.write(envText)
process.exit(0)
