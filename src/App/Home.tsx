import React from "react";
import Map from "./Map"
import { useHistory } from "react-router-dom";

type ShopData = {
  [key: string]: string;
}

type Props = {
  data: ShopData[];
};

const Content = (props: Props) => {
  const history = useHistory()
  const [ orientation, setOrientation] = React.useState<any>(window.orientation)

  React.useEffect(() => {
    history.push("/")
  }, [history])

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
