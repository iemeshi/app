declare namespace Iemeshi {
  type ShopData = {
    index: number;
    distance?: number;
    '緯度': string;
    '経度': string;
    '店名': string;
    'ジャンル': string;
    '紹介文': string;
    '定休日': string;
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
