import React from "react";
import data from '../data.json'
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

    console.log(data)

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
