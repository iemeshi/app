import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path="/">
              <p>home</p>
            </Route>
            <Route path="/about">
              <p>about</p>
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
