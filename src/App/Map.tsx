import React from "react";
import data from '../data.json'
import config from '../config.json'

import toGeoJson from './toGeoJson'

type Props = {
  orientation: any;
};

const CSS: React.CSSProperties = {
  width: '100%',
  height: '100%',
}

const isDayTime = () => {
  const hours = new Date().getHours()
  return hours >= 5 && hours < 19
}

const Content = (props: Props) => {
  const mapNode = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!mapNode.current) {
      return
    }

    const geojson = toGeoJson(data)

    // @ts-ignore
    const { geolonia } = window;

    let style = 'geolonia/basic'
    if (!isDayTime()) {
      style = 'geolonia/midnight'
    }

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

    document.addEventListener('visibilitychange', () => {
      if ('visible' === document.visibilityState) {
        if (isDayTime()) {
          map.setStyle('geolonia/basic')
        } else {
          map.setStyle('geolonia/midnight')
        }
      }
    })
  }, [mapNode, props.orientation])

  return (
    <div ref={mapNode} style={CSS}></div>
  );
};

export default Content;
