import React from "react";
import Links from './Links'
import { BsChevronCompactRight } from 'react-icons/bs'
import { makeDistanceLabelText } from './distance-label'

import './ShopListItem.scss'

type Props = {
  data: Iemeshi.ShopData;
  index: number;
  popupHandler: Function;
};

const Content = (props: Props) => {
  const clickHandler = () => {
    props.popupHandler(props.index)
  }

  const distanceTipText = makeDistanceLabelText(props.data.distance)

  return (
    <>
      <button className="shop-link" onClick={clickHandler}>
        <h2>
          {props.data['店名']}
          {' '}
          <sup className="category">{props.data['ジャンル']}</sup>
          {distanceTipText && <sup className="distance">{distanceTipText}</sup> }
        </h2>
        {props.data['営業時間']?<div>営業時間: {props.data['営業時間']}</div>:''}
        {props.data['テイクアウト営業時間']?<div>テイクアウト営業時間: {props.data['テイクアウト営業時間']}</div>:''}
        {props.data['価格帯']?<div>価格帯: {props.data['価格帯']}</div>:''}
        <div className="right"><BsChevronCompactRight size="40px" color="#CCCCCC" /></div>
        <Links data={props.data} />
      </button>
    </>
  );
};

export default Content;
