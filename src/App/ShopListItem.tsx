import React from "react";
import Links from './Links'
import { BsChevronCompactRight } from 'react-icons/bs'
import { makeDistanceLabelText } from './distance-label'
import ShopMeta from './ShopMeta'
import './ShopListItem.scss'

type Props = {
  data: Iemeshi.ShopData;
  popupHandler: Function;
};

const Content = (props: Props) => {
  const clickHandler = () => {
    props.popupHandler(props.data)
  }

  const distanceTipText = makeDistanceLabelText(props.data.distance)

  return (
    <>
      <button className="shop-link" onClick={clickHandler}>
        <h2>{props.data['店名']}</h2>
        <div>
          <span className="nowrap"><span className="category">{props.data['ジャンル']}</span></span>
          <span className="nowrap">{distanceTipText && <span className="distance">現在位置から {distanceTipText}</span> }</span>
        </div>

        <Links data={props.data} />

        <div style={{margin: "16px 0"}}><ShopMeta shop={props.data} /></div>

        <div className="right"><BsChevronCompactRight size="40px" color="#CCCCCC" /></div>
      </button>
    </>
  );
};

export default Content;
