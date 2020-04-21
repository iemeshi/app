import React from "react";
import data from '../data.json'
import config from '../config.json'

type Props = {
};

const CSS: React.CSSProperties = {
  width: '100%',
  height: '100%',
}

const isDayTime = () => {
  const hours = new Date().getHours()
  return hours >= 5 && hours < 19
}

class Map extends React.Component<Props> {
  container = React.createRef<HTMLDivElement>();

  componentDidMount() {
    // @ts-ignore
    const { geolonia } = window;

    console.log(data)

    let style = 'geolonia/basic'
    if (!isDayTime()) {
      style = 'geolonia/midnight'
    }

    const map = new geolonia.Map({
      container: this.container.current,
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
  }

  render() {
    return (
      <div
        className="map"
        style={CSS}
        ref={this.container}
        data-geolocate-control="on"
        data-lat={config.map.lat}
        data-lng={config.map.lng}
        data-zoom={config.map.zoom}
        data-marker="off"
        data-gesture-handling="off"
      ></div>
    );
  }
}

export default Map;
