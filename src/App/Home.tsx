import React from "react";
import Map from "./Map"

const Content = () => {
  const [ orientation, setOrientation] = React.useState<any>(window.orientation)

  React.useEffect(() => {
    window.addEventListener('orientationchange', () => {
      setOrientation(window.orientation)
    })
  }, [])

  return (
    <><Map orientation={orientation} /></>
  );
};

export default Content;
