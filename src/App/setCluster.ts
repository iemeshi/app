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
      'text-field': '{point_count_abbreviated} 件',
      'text-size': 12,
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

export default setCluster;
