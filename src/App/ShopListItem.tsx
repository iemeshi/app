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
};

const Content = (props: Props) => {
  const clickHandler = () => {
    console.log(props.index)
    props.popupHandler(props.index)
  }

  return (
    <>
      <button className="shop-link" onClick={clickHandler}>
        <h2>{props.data['店名']} <sup>{props.data['ジャンル']}</sup></h2>
        {props.data['営業時間']?<div className="hours">営業時間: {props.data['営業時間']}</div>:''}
        <div className="right"><BsChevronCompactRight size="40px" color="#CCCCCC" /></div>
        <Links data={props.data} />
      </button>
    </>
  );
};

export default Content;
