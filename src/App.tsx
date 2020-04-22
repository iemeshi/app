import React from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.scss";

import Home from './App/Home'
import List from './App/List'
import AboutUs from './App/AboutUs'

import Tabbar from './App/Tabbar'

import csvParser from 'csv-parse'
import config from './config.json'

type Data = {
  [key: string]: string;
}

const App = () => {
  const [ data, setData ] = React.useState<Data | undefined>()

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
            if (value) {
              prev[column] = value;
            }
            return prev;
          }, {});

          return properties;
        });

        setData(features)
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
