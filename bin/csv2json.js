const axios = require("axios");
const parse = require("csv-parse");
const fs = require('fs')

const DATA_URL = process.env.REACT_APP_DATA_URL;
const reservedColumns = [
  "緯度",
  "経度",
  "店名",
  "住所",
  "電話番号",
  "営業時間",
  "ジャンル",
  "価格帯",
  "支払い方法",
  "Instagram",
  "Twitter",
  "LINE",
  "Facebook",
  "公式サイト",
];

const dataFilePath = `${process.cwd()}/public/data.geojson`

const main = async () => {
  let csvText;
  try {
    csvText = (await axios(DATA_URL)).data;
  } catch (error) {
    console.error(
      `CSV の取得に失敗しました。${DATA_URL} から正しいレスポンスが得られませんでした。`
    );
    console.error(error);
    process.exit(1);
  }

  parse(csvText, (error, data) => {
    if (error) {
      console.error("CSV のパースに失敗しました。");
      console.error(error);
      process.exit(2);
    }
    const [header, ...records] = data;

    const features = records.map((record) => {
      const properties = reservedColumns.reduce((prev, column) => {
        const value = record[header.indexOf(column)];
        if (value) {
          prev[column] = value;
        } else {
          console.warn(`${record[header.indexOf('店名')]} の　${column}　の値が得られませんでした。`)
        }
        return prev;
      }, {});
      const lat = parseFloat(properties["緯度"]);
      const lng = parseFloat(properties["経度"]);

      delete properties["緯度"];
      delete properties["経度"];

      if (!lat || !lng) {
        console.warn(`${properties['店名']} の緯度経度の値が不正です。緯度: ${lat}, 経度: ${lng}`)
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
    process.exit(0);
  });
};

main();
