import React from "react";
import './About.scss'
import bento from './bento.svg'
import QRCode from 'qrcode.react'
import Share from './App/Share'

const Content = () => {
  const url = window.location.href.replace(/#.+$/, '')

  return (
    <div className="about">
      <div className="branding">
        <div className="image"><img src={bento} alt=""/></div>
        <div className="logo">イエメシ</div>
      </div>

      <h1>{process.env.REACT_APP_TITLE}</h1>
      <h2>テイクアウトマップ</h2>
      <div className="qrcode"><QRCode value={url} bgColor="transparent" fgColor="#FFFFFF" /></div>
      <Share />
    </div>
  );
};

export default Content;
