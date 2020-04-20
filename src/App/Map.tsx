import React from "react";

import config from '../config.json'

type Props = {
};

const mapStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
}

class Map extends React.Component<Props> {
  container = React.createRef<HTMLDivElement>();

  componentDidMount() {
    // @ts-ignore
    const { geolonia } = window;
    const map = new geolonia.Map(this.container.current);
    window.addEventListener('resize', () => {
      map.resize()
    })
  }

  render() {
    return (
      <div
        className="map"
        style={mapStyle}
        ref={this.container}
        data-geolocate-control="on"
        data-lat={config.lat}
        data-lng={config.lng}
        data-zoom={config.zoom}
        data-marker="off"
        data-gesture-handling="off"
        data-geojson="/data.geojson"
      ></div>
    );
  }
}

export default Map;
