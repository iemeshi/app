import React from "react";

import App from './App'
import About from './About'
import './Container.scss'

function Content() {
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
