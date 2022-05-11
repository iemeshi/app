declare namespace Iemeshi {
  type ShopData = {
    index: number;
    distance?: number;
    'タイムスタンプ': string;
    '緯度': string;
    '経度': string;
    'スポット名': string;
    'カテゴリ': string;
    '紹介文': string;
    '画像': string;
    'URL': string;
    '推しレベル': string;
    '作成者または紹介者': string;
    '学籍番号': string;
    '営業時間': string;
    'テイクアウト営業時間': string;
    '価格帯': string;
    '支払い方法': string;
    '電話番号': string;
    'Instagram': string;
    'Twitter': string;
    '公式サイト': string
  }

  type LngLat = [number, number]
}
