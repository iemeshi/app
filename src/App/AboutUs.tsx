import React from "react";
import bento from '../bento.svg'
import './AboutUs.scss'

const Content = () => {
  return (
    <div className="about-us">
      <div className="branding">
        <div className="image"><img src={bento} alt=""/></div>
        <div className="logo">イエメシ</div>
      </div>
    </div>
  );
};

export default Content;
