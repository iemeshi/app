import React from "react";
import Map from "./Map"

type Props = {
  data: Pwamap.ShopData[];
}

const Content = (props: Props) => {
  return (
    <><Map data={props.data} /></>
  );
};

export default Content;
