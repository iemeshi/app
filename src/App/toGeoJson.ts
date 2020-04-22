type Geometry = {
  type: string;
  coordinates: number[]
}

type featureProperties = {
  [key: string]: string;
}

type Feature = {
  type: string;
  geometry: Geometry;
  properties: featureProperties
}

type itemObject = {
  [key: string]: any;
}

type GeoJSON = {
  type: string;
  features: Feature[]
}

const toGeoJson = (data: object[]) => {
  const geojson = {
    type: "FeatureCollection",
    features: []
  } as GeoJSON

  data.forEach((item: itemObject) => {
    const feature = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [Number(item['経度']), Number(item['緯度'])]
      },
      properties: {}
    } as Feature

    Object.keys(item).forEach((key) => {
      feature.properties[key] = item[key]
    })

    geojson.features.push(feature)
  })

  return geojson
}

export default toGeoJson;
