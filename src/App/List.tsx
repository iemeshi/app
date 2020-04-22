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
    <li key={key}><ShopListItem data={shop} /></li>
  )

  return (
    <div className="shop-list">
      <ul>{shops}</ul>
    </div>
  );
};

export default Content;
