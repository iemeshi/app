import React from "react";
import Links from './Links'
import './Shop.scss'
import { AiOutlineClose } from 'react-icons/ai'

type ShopData = {
  [key: string]: string;
}

type ShopList = {
  [key: string]: ShopData
}

type Props = {
  data: ShopList;
  shopId: string;
  close: Function;
}

const Content = (props: Props) => {
  const mapNode = React.useRef<HTMLDivElement>(null);
  const [ shop, setShop ] = React.useState<ShopData>({})

  React.useEffect(() => {
    if (props.shopId) {
      setShop(props.data[props.shopId])
    }
  }, [props.shopId, props.data])

  const clickHandler = () => {
    props.close()
  }

  React.useEffect(() => {
    if (!mapNode.current) {
      return
    }

    // @ts-ignore
    new window.geolonia.Map({
      container: mapNode.current,
      interactive: false,
    });
  }, [shop, mapNode])

  return (
    <div className="shop-single">
      <div className="head">
        <button onClick={clickHandler}><AiOutlineClose size="16px" color="#FFFFFF" /> 閉じる</button>
      </div>
      <div className="container">
        {shop?
          <>
            <h2>{shop['店名']}</h2>
            <div><sup>{shop['ジャンル']}</sup></div>

            <div style={{margin: "24px 0"}}><Links data={shop} /></div>

            <p style={{margin: "24px 0"}}>{shop['紹介文']}</p>

            <table className="meta">
              <tbody>
                <tr><th>営業時間</th><td>{shop['営業時間']}</td></tr>
                <tr><th>価格帯</th><td>{shop['価格帯']}</td></tr>
                <tr><th>支払い方法</th><td>{shop['支払い方法']}</td></tr>
              </tbody>
            </table>

            <div
              ref={mapNode}
              style={{width: '100%', height: '200px', marginTop: "24px"}}
              data-lat={shop['緯度']}
              data-lng={shop['経度']}
              data-zoom="14"
              data-navigation-control="off"
            ></div>

            <p><a href={`http://maps.apple.com/?q=${shop['緯度']},${shop['経度']}`}>お店までの道順</a></p>
          </>
          :
          <></>
        }
      </div>
    </div>
  );
};

export default Content;
