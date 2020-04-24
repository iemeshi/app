import React from "react";
import ShopListItem from './ShopListItem'
import Shop from './Shop'
import './List.scss'

type Props = {
  data: Iemeshi.ShopData[];
}

const Content = (props: Props) => {
  const [ shop, setShop  ] = React.useState<Iemeshi.ShopData | undefined>()
  const { data } = props

  const popupHandler = (shop: Iemeshi.ShopData) => {
    if (shop) {
      setShop(shop)
    }
  }

  const closeHandler = () => {
    setShop(undefined)
  }

  return (
    <div className="shop-list">
      {
        data.map((shop) => <div key={shop.index} className="shop">
          <ShopListItem
            data={shop}
            popupHandler={popupHandler}
          />
        </div>)
      }
      {shop?
        <Shop shop={shop} close={closeHandler} />
        :
        <></>
      }
    </div>
  );
};

export default Content;
