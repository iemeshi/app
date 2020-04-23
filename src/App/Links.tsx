import React from "react";
import { FaPhone, FaTwitter, FaInstagram, FaHome } from 'react-icons/fa';

import './Links.scss'

type ShopData = {
  [key: string]: string;
}

type Props = {
  data: ShopData;
};

const Content = (props: Props) => {

  return (
    <div className="links">
      {props.data['電話番号']?<div className="link"><a href={`tel:${props.data['電話番号']}`}><FaPhone size="20px" /></a></div>:''}
      {props.data['Instagram']?<div className="link"><a href={`https://instagram.com/${props.data['Instagram']}`}><FaInstagram size="20px" /></a></div>:''}
      {props.data['Twitter']?<div className="link"><a href={`https://twitter.com/${props.data['Twitter']}`}><FaTwitter size="20px" /></a></div>:''}
      {props.data['公式サイト']?<div className="link"><a href={props.data['公式サイト']}><FaHome size="20px" /></a></div>:''}
    </div>
  );
};

export default Content;
