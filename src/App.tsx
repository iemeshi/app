import React from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.scss";

import Home from './App/Home'
import List from './App/List'
import AboutUs from './App/AboutUs'

import Tabbar from './App/Tabbar'

import csvParser from 'csv-parse'
import config from './config.json'

type ShopData = {
  [key: string]: string;
}

const zen2han = (str: string) => {
  return str.replace(/[！-～]/g, function(s: string) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  }).replace(/　/g, ' ');
}

const App = () => {
  const [ data, setData ] = React.useState<ShopData[]>([])

  React.useEffect(() => {
    fetch(config.data_url)
    .then((response) => {
      return response.ok ? response.text() : Promise.reject(response.status);
    })
    .then((data) => {
      csvParser(data, (error, data) => {
        const [header, ...records] = data;

        const features = records.map((record: string) => {
          const properties = header.reduce((prev: any, column: any) => {
            const value = record[header.indexOf(column)];
            prev[column] = zen2han(value);
            return prev;
          }, {});

          return properties;
        });

        const shopData = []
        for (let i = 0; i < features.length; i++) {
          if (features[i]['緯度'] && features[i]['経度'] && features[i]['店名']) {
            shopData.push(features[i])
          }
        }

        setData(shopData)
      });
    });
  }, [])

  return (
    <div className="app">
      <div className="app-body">
        <HashRouter>
          <Route exact path="/"><Home data={data} /></Route>
          <Route exact path="/list"><List data={data} /></Route>
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
