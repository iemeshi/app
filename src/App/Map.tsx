import React from "react";
// @ts-ignore
import geojsonExtent from '@mapbox/geojson-extent'
import toGeoJson from './toGeoJson'
import setCluster from './setCluster'
import Shop from './Shop'

type Props = {
  data: Iemeshi.ShopData[];
};

const CSS: React.CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
}

const Content = (props: Props) => {
  const mapNode = React.useRef<HTMLDivElement>(null);
  const [ mapObject, setMapObject ] = React.useState<any>()
  const [ shop, setShop ] = React.useState<Iemeshi.ShopData | undefined>(undefined)

  React.useEffect(() => {
    if (!mapObject || !props.data) {
      return
    }

    // nothing to do if shops exists.
    if (mapObject.getSource('shops')) {
      return
    }

    const textColor = '#000000'
    const textHaloColor = '#FFFFFF'

    const geojson = toGeoJson(props.data)

    mapObject.addSource('shops', {
      type: 'geojson',
      data: geojson,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 25,
    })

    mapObject.addLayer({
      id: 'shop-points',
      type: 'circle',
      source: 'shops',
      filter: ['all',
        ['==', '$type', 'Point'],
      ],
      paint: {
        'circle-radius': 13,
        'circle-color': '#FF0000',
        'circle-opacity': 0.4,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#FFFFFF',
        'circle-stroke-opacity': 1,
      },
    })

    mapObject.addLayer({
      id: 'shop-symbol',
      type: 'symbol',
      source: 'shops',
      filter: ['all',
        ['==', '$type', 'Point'],
      ],
      paint: {
        'text-color': textColor,
        'text-halo-color': textHaloColor,
        'text-halo-width': 2,
      },
      layout: {
        'text-field': "{店名}",
        'text-font': ['Noto Sans Regular'],
        'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
        'text-radial-offset': 0.5,
        'text-justify': 'auto',
        'text-size': 12,
        'text-anchor': 'top',
        'text-max-width': 12,
        'text-allow-overlap': false,
      },
    })

    mapObject.on('mouseenter', 'shop-points', () => {
      mapObject.getCanvas().style.cursor = 'pointer'
    })

    mapObject.on('mouseleave', 'shop-points', () => {
      mapObject.getCanvas().style.cursor = ''
    })

    mapObject.on('mouseenter', 'shop-symbol', () => {
      mapObject.getCanvas().style.cursor = 'pointer'
    })

    mapObject.on('mouseleave', 'shop-symbol', () => {
      mapObject.getCanvas().style.cursor = ''
    })

    mapObject.on('click', 'shop-points', (event: any) => {
      if (!event.features[0].properties.cluster) {
        setShop(event.features[0].properties)
      }
    })

    mapObject.on('click', 'shop-symbol', (event: any) => {
      if (!event.features[0].properties.cluster) {
        setShop(event.features[0].properties)
      }
    })

    setCluster(mapObject)
  }, [mapObject, props.data])

  React.useEffect(() => {
    // Only once reder the map.
    if (!mapNode.current || mapObject) {
      return
    }

    // @ts-ignore
    const { geolonia } = window;

    const style = 'geolonia/gsi'

    const geojson = toGeoJson(props.data)
    const bounds = geojsonExtent(geojson)

    const map = new geolonia.Map({
      container: mapNode.current,
      style: style,
      bounds: bounds,
      fitBoundsOptions: {padding: 50}
    });

    const onMapLoad = () => {
      map.setLayoutProperty('poi', 'visibility', 'none')
      map.setLayoutProperty('poi-primary', 'visibility', 'none')
      setMapObject(map)
    }

    const orienteationchangeHandler = () => {
      map.resize()
    }

    // attach
    map.on('load', onMapLoad)

    window.addEventListener('orientationchange', orienteationchangeHandler)

    return () => {
      // detach to prevent memory leak
      window.removeEventListener('orientationchange', orienteationchangeHandler)
      map.off('load', onMapLoad)
    }
  }, [mapNode, mapObject, props.data])

  const closeHandler = () => {
    setShop(undefined)
  }

  return (
    <div style={CSS}>
      <div
        ref={mapNode}
        style={CSS}
        data-geolocate-control="on"
        data-marker="off"
        data-gesture-handling="off"
      ></div>
      {shop?
        <Shop shop={shop} close={closeHandler} />
        :
        <></>
      }
    </div>
  );
};

export default Content;
