import React from "react";
import './ShopMeta.scss'

type Props = {
  shop: Iemeshi.ShopData;
}

const Content = (props: Props) => {
  const { shop } = props

  return (
    <table className="shop-meta-table">
      <tbody>
        <tr><th>定休日</th><td>{shop['定休日']}</td></tr>
        <tr><th>営業時間</th><td>{shop['営業時間']}</td></tr>
        <tr><th>テイクアウト営業時間</th><td>{shop['テイクアウト営業時間']}</td></tr>
        <tr><th>価格帯</th><td>{shop['価格帯']}</td></tr>
        <tr><th>支払い方法</th><td>{shop['支払い方法']}</td></tr>
      </tbody>
    </table>
  );
};

export default Content;
