import React from "react";
import data from '../data.json'
import config from '../config.json'

type Props = {
};

const CSS: React.CSSProperties = {
  width: '100%',
  height: '100%',
}

class Map extends React.Component<Props> {
  container = React.createRef<HTMLDivElement>();

  componentDidMount() {
    // @ts-ignore
    const { geolonia } = window;

    console.log(data)

    const map = new geolonia.Map(this.container.current);

    document.addEventListener('visibilitychange', () => {
      if ('visible' === document.visibilityState) {
        const hours = new Date().getHours()
        const isDayTime = hours > 6 && hours < 19
        if (isDayTime) {
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
        data-style="geolonia/basic"
      ></div>
    );
  }
}

export default Map;
