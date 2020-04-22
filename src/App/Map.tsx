import React from "react";
// import data from '../data.json'
import config from '../config.json'
// @ts-ignore
import geojsonExtent from '@mapbox/geojson-extent'
import toGeoJson from './toGeoJson'
import setCluster from './setCluster'
import csvParser from 'csv-parse'

type Data = {
  [key: string]: string;
}

type Props = {
  orientation: any;
};

const CSS: React.CSSProperties = {
  width: '100%',
  height: '100%',
}

const Content = (props: Props) => {
  const mapNode = React.useRef<HTMLDivElement>(null);
  const [ mapObject, setMapObject ] = React.useState<any>()
  const [ data, setData ] = React.useState<Data | undefined>()

  React.useEffect(() => {
    fetch(config.data_url)
    .then((response) => {
      return response.ok ? response.text() : Promise.reject(response.status);
    })
    .then((data) => {
      csvParser(data, (error, data) => {
        const [header, ...records] = data;

        const features = records.map((record: string) => {
          const properties = header.reduce((prev: any, column: any) => {
            const value = record[header.indexOf(column)];
            if (value) {
              prev[column] = value;
            }
            return prev;
          }, {});

          return properties;
        });

        setData(features)
      });
    });
  }, [])

  React.useEffect(() => {
    if (!mapObject || !data) {
      return
    }

    const textColor = '#000000'
    const textHaloColor = '#FFFFFF'

    const geojson = toGeoJson(data)
    const bounds = geojsonExtent(geojson)
    mapObject.fitBounds(bounds, {
      duration: 0,
      padding: 100,
    })

    mapObject.addSource('shops', {
      type: 'geojson',
      data: geojson,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
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

    mapObject.on('mouseenter', 'shop-points', function () {
      mapObject.getCanvas().style.cursor = 'pointer'
    })

    mapObject.on('mouseleave', 'shop-points', function () {
      mapObject.getCanvas().style.cursor = ''
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
        'text-size': 12,
        'text-anchor': 'top',
        'text-max-width': 12,
        'text-offset': [0, 1.2],
        'text-allow-overlap': false,
      },
    })

    setCluster(mapObject)
  }, [mapObject, data])

  React.useEffect(() => {
    if (!mapNode.current) {
      return
    }

    // @ts-ignore
    const { geolonia } = window;

    const style = 'geolonia/basic'

    const container = document.createElement('div')
    container.dataset.geolocateControl = 'on'
    container.dataset.marker = 'off'
    container.dataset.gestureHandling = 'off'
    container.style.width = '100%'
    container.style.height = '100%'

    mapNode.current.innerHTML = ''
    mapNode.current.appendChild(container)

    const map = new geolonia.Map({
      container: container,
      style: style,
    });

    map.on('load', () => {
      map.setLayoutProperty('building', 'visibility', 'none')
      map.setLayoutProperty('poi', 'visibility', 'none')
      map.setLayoutProperty('poi-primary', 'visibility', 'none')

      setMapObject(map)
    })

  }, [mapNode, props.orientation])

  return (
    <div ref={mapNode} style={CSS}></div>
  );
};

export default Content;
