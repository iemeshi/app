import React from "react";
import { FaPhone, FaTwitter, FaInstagram, FaHome } from 'react-icons/fa';
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
      <div className="links">
        {props.data['電話番号']?<div className="link"><a href={`tel:${props.data['電話番号']}`}><FaPhone size="20px" /></a></div>:''}
        {props.data['Instagram']?<div className="link"><a href={`https://instagram.com/${props.data['Instagram']}`}><FaInstagram size="20px" /></a></div>:''}
        {props.data['Twitter']?<div className="link"><a href={`https://twitter.com/${props.data['Twitter']}`}><FaTwitter size="20px" /></a></div>:''}
        {props.data['公式サイト']?<div className="link"><a href={props.data['公式サイト']}><FaHome size="20px" /></a></div>:''}
      </div>
    </>
  );
};

export default Content;
