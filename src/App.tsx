import React from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.scss";

import Map from './App/Map'
import List from './App/List'
import AboutUs from './App/AboutUs'

import Tabbar from './App/Tabbar'

function App() {
  return (
    <div className="app">
      <div className="app-body">
        <HashRouter>
          <Route exact path="/" component={Map} />
          <Route exact path="/list" component={List} />
          <Route exact path="/about" component={AboutUs} />
        </HashRouter>
      </div>
      <div className="app-footer">
        <Tabbar />
      </div>
    </div>
  );
}

export default App;
