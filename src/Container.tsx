import React from "react";

import App from './App'
import About from './About'
import './Container.scss'

function Content() {
  window.addEventListener('orientationchange', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    console.log(vh)
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  return (
    <div className="outer-container">
      <div className="inner-container">
        <About />
        <App />
      </div>
    </div>
  );
}

export default Content;
