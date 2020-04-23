import React from "react";
import Links from './Links'
import { BsChevronCompactRight } from 'react-icons/bs'

type ShopData = {
  [key: string]: string;
}

type Props = {
  data: ShopData;
  index: number;
};

const Content = (props: Props) => {

  return (
    <>
      <a className="shop-link" href={`#/shop/${props.index}`}>
        <h2>{props.data['店名']}</h2>
        <div className="description">{props.data['紹介文']}</div>
        {props.data['営業時間']?<div className="hours">営業時間: {props.data['営業時間']}</div>:''}
        <div className="right"><BsChevronCompactRight size="40px" color="#CCCCCC" /></div>
      </a>
      <Links data={props.data} />
    </>
  );
};

export default Content;
