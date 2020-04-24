import React from "react";
import ShopListItem from './ShopListItem'
import Shop from './Shop'
import * as turf from '@turf/turf'
import './List.scss'

type ShopData = {
  [key: string]: string;
}

type ShopList = {
  [key: string]: ShopData
}

type DistanceMap = {
  [id: string]: number
}

type Props = {
  data: ShopList;
}

type LngLat = [number, number]

const Content = (props: Props) => {

  const [currentPosition, setCurrentPosition] = React.useState<LngLat | null>(null)
  const [ id, setId ] = React.useState<string>('')
  const [distanceMap, setDistanceMap] = React.useState<DistanceMap>({})
  const [geolocationReady, setGeolocationReady] = React.useState<boolean>(false)

  const { data } = props

  // Effect to get CurrentPosition
  React.useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        setCurrentPosition([lng, lat])
        setGeolocationReady(true)
      },
      (error) => {
        setGeolocationReady(true)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }, [])

  React.useEffect(() => {
    const shopIds = Object.keys(data)
    if(currentPosition && shopIds.length > 0) {
      const from = turf.point(currentPosition);
      const nextDistanceMap: DistanceMap = {}
      for (const shopId of shopIds) {
        const shop = data[shopId]
        const lat = parseFloat(shop['緯度'])
        const lng = parseFloat(shop['経度'])
        const to = turf.point([lng, lat]);
        const options = {units: 'meters' as 'meters'};
        const distance = turf.distance(from, to, options);
        nextDistanceMap[shopId] = distance
      }
      setDistanceMap(nextDistanceMap)
    }
  }, [currentPosition, data])

  const popupHandler = (id: string) => {
    setId(id)
  }

  const closeHandler = () => {
    setId('')
  }

  const shopMeta = Object
    .keys(props.data)
    .map(key => {
      return {
        key: key,
        distance: distanceMap[key],
        shop: props.data[key],
      }
    })
  shopMeta.sort((a, b) => a.distance - b.distance)

  return (
    <div className="shop-list">
      {
        shopMeta.map((item) => <div key={item.key} className="shop">
          <ShopListItem
            index={item.key}
            data={item.shop}
            popupHandler={popupHandler}
            distance={item.distance}
          />
        </div>)
      }
      {id?
        <Shop data={props.data} shopId={id} close={closeHandler} />
        :
        <></>
      }
    </div>
  );
};

export default Content;
