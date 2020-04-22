import React from "react";

type ShopData = {
  [key: string]: string;
}

type Props = {
  data: ShopData
};

const Content = (props: Props) => {

  return (
    <div>
      <h2>{props.data['店名']}</h2>
      <div>{props.data['紹介文']}</div>
    </div>
  );
};

export default Content;
