import React from "react";
import './About.scss'
import Qrcode from './Qrcode'
import Share from './App/Share'
import config from './config.json'

const Content = () => {

  const logoUrl = config.logo_image_url || `${process.env.PUBLIC_URL}/logo.svg`

  return (
    <div className="about">
      <div className="branding">
        <img className="image" src={logoUrl} alt=""/>
      </div>

      <div className="description">{config.description}</div>
      <div className="qrcode"><Qrcode url={window.location.href}/></div>
      <Share />
    </div>
  );
};

export default Content;
