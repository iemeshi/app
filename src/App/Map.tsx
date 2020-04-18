import React from "react";

import config from '../config.json'

type Props = {
};

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
        ref={this.container}
        data-geolocate-control="on"
        data-lat={config.lat}
        data-lng={config.lng}
        data-zoom={config.zoom}
        data-marker="off"
      />
    );
  }
}

export default Map;
