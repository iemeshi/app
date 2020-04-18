import React from "react";

type Props = {
};

class Map extends React.Component<Props> {
  container = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    // @ts-ignore
    const { geolonia } = window;
    const map = new geolonia.Map(this.container.current);
  }

  render() {
    return (
      <div
        className="map"
        ref={this.container}
        data-geolocate-control="ON"
      />
    );
  }
}

export default Map;
