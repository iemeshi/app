import React from "react";
import ShopListItem from './ShopListItem'
import Shop from './Shop'
import './List.scss'

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
  const [ id, setId ] = React.useState<string>('')

  const popupHandler = (id: string) => {
    setId(id)
  }

  const closeHandler = () => {
    setId('')
  }

  const shops = []
  for (const key in props.data) {
    shops.push(<div key={key} className="shop"><ShopListItem index={key} data={props.data[key]} popupHandler={popupHandler} /></div>)
  }

  return (
    <div className="shop-list">
      {shops}
      {id?
        <Shop data={props.data} shopId={id} close={closeHandler} />
        :
        <></>
      }
    </div>
  );
};

export default Content;
