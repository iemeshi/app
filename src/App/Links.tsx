import React from "react";
import { FaPhone, FaTwitter, FaInstagram, FaHome } from 'react-icons/fa';

import './Links.scss'

type Props = {
  data: Iemeshi.ShopData;
};

const noop = (e: React.MouseEvent) => {
  e.stopPropagation()
}

const Content = (props: Props) => {

  return (
    <div className="links">
      {props.data['電話番号']?<div className="link"><a href={`tel:${props.data['電話番号']}`}><FaPhone onClick={noop} size="20px" /></a></div>:''}
      {props.data['Instagram']?<div className="link"><a href={`https://instagram.com/${props.data['Instagram']}`}><FaInstagram onClick={noop} size="20px" /></a></div>:''}
      {props.data['Twitter']?<div className="link"><a href={`https://twitter.com/${props.data['Twitter']}`}><FaTwitter onClick={noop} size="20px" /></a></div>:''}
      {props.data['公式サイト']?<div className="link"><a href={props.data['公式サイト']}><FaHome onClick={noop} size="20px" /></a></div>:''}
    </div>
  );
};

export default Content;
