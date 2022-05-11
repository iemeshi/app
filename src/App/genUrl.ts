type ShopData = {
  [key: string]: string;
}

const genUrl = async (shop: ShopData) => {
  const str = `${shop['緯度']}${shop['経度']}${shop['スポット名']}`
  const msgUint8 = new TextEncoder().encode(str);
  const digest = await crypto.subtle.digest('SHA-256', msgUint8)
  const hashArray = Array.from(new Uint8Array(digest));
  return hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
}

export default genUrl
