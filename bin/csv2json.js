/**
 * @file CSV 読み込み
 */

const axios = require("axios");
const parse = require("csv-parse");
const fs = require("fs");
const chalk = require("chalk");

const DATA_URL = process.env.REACT_APP_DATA_URL;

const ERROR = `[${chalk.stderr.red("error")}]`;
const WARN = `[${chalk.stderr.yellow("warn")}]`;
const SUCCESS = `[${chalk.green("success")}]`;

const dataFilePath = `${process.cwd()}/public/data.geojson`;

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
      const lat = parseFloat(properties["緯度"]);
      const lng = parseFloat(properties["経度"]);

      delete properties["緯度"];
      delete properties["経度"];

      if (!lat || !lng) {
        process.stderr.write(
          `${WARN} 店名「${properties["店名"]}」の緯度または経度の値が正しくありません。このデータは除外されます。緯度: ${lat}, 経度: ${lng}\n`
        );
        return null;
      } else {
        return {
          type: "Feature",
          properties,
          geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
        };
      }
    });

    const geojson = {
      type: "FeatureCollection",
      features: features.filter((feature) => !!feature),
    };

    fs.writeFileSync(dataFilePath, JSON.stringify(geojson, null, 2));

    process.stdout.write(`${SUCCESS} データの生成に成功しました。\n`);
    process.exit(0);
  });
};

main();
