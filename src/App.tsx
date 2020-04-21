import React from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.scss";

import Home from './App/Home'
import List from './App/List'
import AboutUs from './App/AboutUs'

import Tabbar from './App/Tabbar'

function App() {
  return (
    <div className="app">
      <div className="app-body">
        <HashRouter>
          <Route exact path="/" component={Home} />
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
