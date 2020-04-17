import React from "react";
import './About.scss'
import bento from './bento.svg'
import QRCode from 'qrcode.react'

const Content = () => {
  const url = window.location.href.replace(/#.+$/, '')

  return (
    <div className="about">
      <div className="branding">
        <div className="image"><img src={bento} alt=""/></div>
        <div className="logo">イエメシ</div>
      </div>

      <h1>和歌山県串本町</h1>
      <h2>テイクアウトマップ</h2>
      <div className="qrcode"><QRCode value={url} bgColor="transparent" fgColor="#FFFFFF" /></div>
      <p>ここに共有ボタン</p>
    </div>
  );
};

export default Content;
