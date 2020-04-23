import React from "react";
import ShopListItem from './ShopListItem'
import './List.scss'
import { useHistory } from "react-router-dom";

type ShopData = {
  [key: string]: string;
}

type ShopList = {
  [key: string]: ShopData
}

type Props = {
  data: ShopList;
}

const Content = (props: Props) => {
  const history = useHistory()

  React.useEffect(() => {
    history.push("/list");
  }, [history])

  const shops = []
  for (const key in props.data) {
    shops.push(<div key={key} className="shop"><ShopListItem index={key} data={props.data[key]} /></div>)
  }

  return (
    <div className="shop-list">{shops}</div>
  );
};

export default Content;
