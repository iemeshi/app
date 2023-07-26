declare namespace Pwamap {
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
    'Instagram': string;
    'Twitter': string;
    'Facebook': string;
    '公式サイト': string
  }

  type LngLat = [number, number]
}
