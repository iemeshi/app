import React from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.scss";

import Map from './App/Map'
import List from './App/List'
import AboutUs from './App/AboutUs'

import Tabbar from './App/Tabbar'

class App extends React.Component {

  state = {
    appBodyHeight: App.getAppHeight()
  }

  // .app-footer has 50px height
  static getAppHeight = () => {
    console.log(window.innerWidth)
    if(window.innerWidth > 960) {
      return void 0
    } else {
      return window.innerHeight - 50
    }
  }

  componentDidMount() {
    this.fixAppHeight()
    window.addEventListener('resize', this.fixAppHeight)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.fixAppHeight)
  }

  fixAppHeight = () => {
    // skip if Laptop view
    if(window.innerWidth < 960)
    // wait until browser completes rotation
    setTimeout(() => {
      this.setState({ appBodyHeight: App.getAppHeight() })
    }, 500)
  }


  render() {
    const { appBodyHeight } = this.state || {}

    return (
      <div id="app" className="app">
        <div id="app-body" className="app-body"
        // override height value with mobile view
        // this adjusts landscape height when rotated
        style={{ height: appBodyHeight }}
        >
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
}

export default App;
