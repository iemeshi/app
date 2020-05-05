import React from "react";
import './About.scss'
import logo from './logo.svg'
import QRCode from 'qrcode.react'
import Share from './App/Share'
import config from './config.json'

const Content = () => {
  const url = window.location.href.replace(/\?.+$/, '').replace(/#.+$/, '')

  return (
    <div className="about">
      <div className="branding">
        <div className="image"><img src={logo} alt=""/></div>
        <div className="logo">イエメシ</div>
      </div>

      <h1>{config.title}</h1>
      <h2>テイクアウトマップ</h2>
      <div className="qrcode"><QRCode value={url} bgColor="transparent" fgColor="#FFFFFF" /></div>
      <Share />
    </div>
  );
};

export default Content;
