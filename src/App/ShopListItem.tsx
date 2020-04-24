import React from "react";
import Links from './Links'
import { BsChevronCompactRight } from 'react-icons/bs'

import './ShopListItem.scss'

type ShopData = {
  [key: string]: string;
}

type Props = {
  data: ShopData;
  index: string;
  popupHandler: Function;
  distance?: number;
};

const Content = (props: Props) => {
  const clickHandler = () => {
    console.log(props.index)
    props.popupHandler(props.index)
  }
  console.log(props.distance)
  return (
    <>
      <button className="shop-link" onClick={clickHandler}>
        <h2>{props.data['店名']} <sup>{props.data['ジャンル']}</sup></h2>
        {props.data['営業時間']?<div>営業時間: {props.data['営業時間']}</div>:''}
        {props.data['価格帯']?<div>価格帯: {props.data['価格帯']}</div>:''}
        <div className="right"><BsChevronCompactRight size="40px" color="#CCCCCC" /></div>
        <Links data={props.data} />
      </button>
    </>
  );
};

export default Content;
