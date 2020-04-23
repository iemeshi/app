import React from "react";
import ShopListItem from './ShopListItem'

import './List.scss'

type ShopData = {
  [key: string]: string;
}

type Props = {
  data: ShopData[];
};

const Content = (props: Props) => {

  const shops = props.data.map((shop, key) =>
    <div key={key} className="shop"><ShopListItem index={key} data={shop} /></div>
  )

  return (
    <div className="shop-list">{shops}</div>
  );
};

export default Content;
