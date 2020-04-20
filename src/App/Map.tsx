import React from "react";

// @ts-ignore
const [lng, lat] = process.env.REACT_APP_CENTER
  .split(',')
  .map(value => parseFloat(value))

// @ts-ignore
const zoom = parseFloat(process.env.REACT_APP_ZOOM)

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
        data-lat={lat}
        data-lng={lng}
        data-zoom={zoom}
        data-marker="off"
        data-gesture-handling="off"
      ></div>
    );
  }
}

export default Map;
