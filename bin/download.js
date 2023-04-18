/**
 * @file Google スプレッドシートのデータをダウンロードする
 */

const fs = require("fs");
const path = require("path")
const fetch = require("node-fetch")

const GOOGLE_SHEET_URL = process.argv[2]
const GOOGLE_SHEET_API_KEY = process.argv[3]

const zen2han = (str) => {
  return str.replace(/[！-～]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  }).replace(/　/g, ' ');
}

const table2json = (table) => {

  const header = table.values[0]
  let records = table.values.slice(1)

  // データが空の時に、空の配列を返す
  if (records.length === 0) {
    records = Array(header.length).fill('');
  }

  const features = records.map((record) => {

    const properties = header.reduce((prev, column) => {
      const value = record[header.indexOf(column)] || '';
      prev[column] = zen2han(value || '');
      return prev;
    }, {});
    return properties;
  });

  return features[0]
}

const fetchDataSetEnv = async () => {

  // 引数に Google Sheet API key が指定されてなければ終了。
  if (!GOOGLE_SHEET_URL || !GOOGLE_SHEET_API_KEY) {

    process.stderr.write(
      `引数に スプレッドシートの URL と API キーを指定して下さい。\n`
    );

    process.exit(1);
  }

  const GOOGLE_SHEET_ID = GOOGLE_SHEET_URL.replace('https://docs.google.com/spreadsheets/d/', '').replace('/edit?usp=sharing', '')

  const sheetList = [
    {
      name: "スポットデータ",
      exportFilePath: "/public/data.json"
    },
    {
      name: "基本データ",
      exportFilePath: "/src/config.json"
    },
  ]

  let config;

  for (let i = 0; i < sheetList.length; i++) {
    const sheet = sheetList[i];

    try {
      // スプレッドシートのデータをダウンロードする
      const sheet_url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${sheet.name}!A1:J?key=${GOOGLE_SHEET_API_KEY}`
      const res = await fetch(sheet_url);
      config = await res.json();

      if (sheet.name === "基本データ") {
        // ヘッダーをキーとしたJSONに変換する
        config = table2json(config);
      }

    } catch (error) {

      console.log(error)
      process.stderr.write(
        `スプレッドシートのダウンロードに失敗しました。URLとAPIキー、閲覧権限が正しく設定されている事を確認して下さい。\n`
      );
      process.exit(1);
    }

    fs.writeFileSync(path.join(process.cwd(), sheet.exportFilePath), JSON.stringify(config, null, 2));

  }

  process.exit(0);

}

fetchDataSetEnv();
