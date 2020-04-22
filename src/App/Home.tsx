import React from "react";
import Map from "./Map"

type Data = {
  [key: string]: string;
}

type Props = {
  data: Data | undefined;
};

const Content = (props: Props) => {
  const [ orientation, setOrientation] = React.useState<any>(window.orientation)

  React.useEffect(() => {
    window.addEventListener('orientationchange', () => {
      setOrientation(window.orientation)
    })
  }, [])

  return (
    <><Map orientation={orientation} data={props.data} /></>
  );
};

export default Content;
