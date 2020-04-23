import React from "react";
import ShopListItem from './ShopListItem'
import './List.scss'
import { useHistory } from "react-router-dom";

type ShopData = {
  [key: string]: string;
}

type Props = {
  data: ShopData[];
};

const Content = (props: Props) => {
  const history = useHistory()

  React.useEffect(() => {
    history.push("/list");
  }, [history])

  const shops = props.data.map((shop, key) =>
    <div key={key} className="shop"><ShopListItem index={key} data={shop} /></div>
  )

  return (
    <div className="shop-list">{shops}</div>
  );
};

export default Content;
