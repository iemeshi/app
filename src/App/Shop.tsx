import React from "react";

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
  const [ shop, setShop ] = React.useState<ShopData>({})

  React.useEffect(() => {
    if (props.shopId) {
      setShop(props.data[props.shopId])
    }
  }, [props.shopId, props.data])

  const clickHandler = () => {
    props.close()
  }

  return (
    <div className="shop-single">
      <div className="head">
        <button onClick={clickHandler}><AiOutlineClose size="20px" color="#FFFFFF" /></button>
      </div>
      <div className="container">
        {shop?
          <>
            <h2>{shop['店名']}</h2>
          </>
          :
          <></>
        }
      </div>
    </div>
  );
};

export default Content;
