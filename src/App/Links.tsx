import React from "react";
import { FaTwitter, FaInstagram, FaHome, FaFacebook } from 'react-icons/fa';

import './Links.scss'

type Props = {
  data: Pwamap.ShopData;
};

const noop = (e: React.MouseEvent) => {
  e.stopPropagation()
}

const Content = (props: Props) => {

  return (
    <div className="links">
      {props.data['Instagram']?<div className="link"><a href={`https://instagram.com/${props.data['Instagram']}`}><FaInstagram onClick={noop} size="20px" /></a></div>:''}
      {props.data['Twitter']?<div className="link"><a href={`https://twitter.com/${props.data['Twitter']}`}><FaTwitter onClick={noop} size="20px" /></a></div>:''}
      {props.data['Facebook']?<div className="link"><a href={`https://www.facebook.com/${props.data['Facebook']}`}><FaFacebook onClick={noop} size="20px" /></a></div>:''}
      {props.data['公式サイト']?<div className="link"><a href={props.data['公式サイト']}><FaHome onClick={noop} size="20px" /></a></div>:''}
    </div>
  );
};

export default Content;
