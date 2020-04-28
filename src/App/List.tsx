import React from "react";
import ShopListItem from './ShopListItem'
import Shop from './Shop'
import './List.scss'
import { askGeolocationPermission } from '../geolocation'
import * as turf from "@turf/turf"

type Props = {
  data: Iemeshi.ShopData[];
}

const sortShopList = async (shopList: Iemeshi.ShopData[]) => {
  const currentPosition = await askGeolocationPermission()
  if(currentPosition) {
    const from = turf.point(currentPosition);
    const sortingShopList = shopList.map((shop) => {
      const lng = parseFloat(shop['経度'])
      const lat = parseFloat(shop['緯度'])
      if(Number.isNaN(lng) || Number.isNaN(lat)) {
        return shop
      } else {
        const to = turf.point([lng, lat])
        const distance = turf.distance(from, to, {units: 'meters' as 'meters'});
        return { ...shop, distance }
      }
    })
    sortingShopList.sort((a,b) => {
      if(typeof a.distance !== 'number' || Number.isNaN(a.distance)) {
        return 1
      } else if (typeof b.distance !== 'number' || Number.isNaN(b.distance)) {
        return -1
      } else {
        return a.distance - b.distance
      }
    })
    return sortingShopList
  } else {
    return shopList
  }
}


const Content = (props: Props) => {
  const [ shop, setShop  ] = React.useState<Iemeshi.ShopData | undefined>()
  const [ data, setData ] = React.useState(props.data)

  React.useEffect(() => {
    let isMounted = true
    sortShopList(props.data)
      .then(sortedData => {
        // prevent memory leak
        if(isMounted) {
          setData(sortedData)
        }
      })
    return () => {
      isMounted = false
    }
  }, [props.data])


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
