/**
 * @file CSV 読み込み
 */

const axios = require("axios");
const parse = require("csv-parse");
const fs = require("fs");
const chalk = require("chalk");

const DATA_URL = process.env.REACT_APP_DATA_URL;

const ERROR = `[${chalk.stderr.red("error")}]`;
const SUCCESS = `[${chalk.green("success")}]`;

const dataFilePath = `${process.cwd()}/src/data.json`;

const main = async () => {
  let csvText;
  try {
    csvText = (await axios(DATA_URL)).data;
  } catch (error) {
    process.stderr.write(`${ERROR} CSV の取得に失敗しました。\n`);
    process.exit(1);
  }

  parse(csvText, (error, data) => {
    if (error) {
      process.stderr.write(`${ERROR} CSV のパースに失敗しました。\n`);
      process.exit(2);
    }
    const [header, ...records] = data;

    const features = records.map((record) => {
      const properties = header.reduce((prev, column) => {
        const value = record[header.indexOf(column)];
        if (value) {
          prev[column] = value;
        }
        return prev;
      }, {});

      return properties;
    });

    fs.writeFileSync(dataFilePath, JSON.stringify(features, null, 2));

    process.stdout.write(`${SUCCESS} データの生成に成功しました。\n`);
    process.exit(0);
  });
};

main();
