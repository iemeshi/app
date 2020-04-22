import React from "react";
import data from '../data.json'
import config from '../config.json'
// @ts-ignore
import geojsonExtent from '@mapbox/geojson-extent'
import toGeoJson from './toGeoJson'

type Props = {
  orientation: any;
};

const CSS: React.CSSProperties = {
  width: '100%',
  height: '100%',
}

const setCluster = (map: any) => {
  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'shops',
    filter: ['has', 'point_count'],
    paint: {
      'circle-radius': 20,
      'circle-color': '#FF0000',
      'circle-opacity': 1.0,
    },
  })

  map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'shops',
    filter: ['has', 'point_count'],
    paint: {
      'text-color': '#FFFFFF',
    },
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-size': 14,
      'text-font': ['Noto Sans Regular'],
    },
  })

  map.on('click', 'clusters', (e: any) => {
    const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] })
    const clusterId = features[0].properties.cluster_id
    map.getSource('shops').getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
      if (err)
        return

      map.easeTo({
        center: features[0].geometry.coordinates,
        zoom: zoom,
      })
    })
  })

  map.on('mouseenter', 'clusters', function () {
    map.getCanvas().style.cursor = 'pointer'
  })

  map.on('mouseleave', 'clusters', function () {
    map.getCanvas().style.cursor = ''
  })
}

const Content = (props: Props) => {
  const mapNode = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!mapNode.current) {
      return
    }

    // @ts-ignore
    const { geolonia } = window;

    const style = 'geolonia/basic'

    const container = document.createElement('div')
    container.dataset.geolocateControl = 'on'
    container.dataset.lat = `${config.map.lat}`
    container.dataset.lng = `${config.map.lng}`
    container.dataset.zoom = `${config.map.zoom}`
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

    const textColor = '#000000'
    const textHaloColor = '#FFFFFF'

    map.on('load', () => {
      map.setLayoutProperty('building', 'visibility', 'none')
      map.setLayoutProperty('poi', 'visibility', 'none')
      map.setLayoutProperty('poi-primary', 'visibility', 'none')

      const geojson = toGeoJson(data)
      const bounds = geojsonExtent(geojson)
      map.fitBounds(bounds, {
        duration: 0,
        padding: 100,
      })

      map.addSource('shops', {
        type: 'geojson',
        data: geojson,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      })

      map.addLayer({
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

      map.on('mouseenter', 'shop-points', function () {
        map.getCanvas().style.cursor = 'pointer'
      })

      map.on('mouseleave', 'shop-points', function () {
        map.getCanvas().style.cursor = ''
      })

      map.addLayer({
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

      setCluster(map)
    })

  }, [mapNode, props.orientation])

  return (
    <div ref={mapNode} style={CSS}></div>
  );
};

export default Content;
