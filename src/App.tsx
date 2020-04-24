import React from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.scss";

import Home from './App/Home'
import List from './App/List'
import AboutUs from './App/AboutUs'

import Tabbar from './App/Tabbar'

import csvParser from 'csv-parse'
import config from './config.json'
import genUrl from "./App/genUrl";
import { askGeolocationPermission } from './geolocation'
import * as turf from "@turf/turf"

const zen2han = (str: string) => {
  return str.replace(/[！-～]/g, function(s: string) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  }).replace(/　/g, ' ');
}

const App = () => {
  const [ shopList, setShopList ] = React.useState<Iemeshi.ShopData[]>([])

  React.useEffect(() => {
    fetch(config.data_url)
    .then((response) => {
      return response.ok ? response.text() : Promise.reject(response.status);
    })
    .then((data) => {
      csvParser(data, async (error, data) => {
        const [header, ...records] = data;

        const features = records.map((record: string) => {
          const properties = header.reduce((prev: any, column: any) => {
            const value = record[header.indexOf(column)];
            prev[column] = zen2han(value);
            return prev;
          }, {});

          return properties;
        });

        const nextShopList: Iemeshi.ShopData[] = []
        for (let i = 0; i < features.length; i++) {
          const feature = features[i] as Iemeshi.ShopData
          const shop = {
            index: i,
            ...feature
          }
          nextShopList.push(shop)
        }

        setShopList(nextShopList)

        // Sorting
        const currentPosition = await askGeolocationPermission()
        if(currentPosition) {
          const from = turf.point(currentPosition);
          const sortingShopList = nextShopList.map((shop) => {
            const lng = parseFloat(shop['経度'])
            const lat = parseFloat(shop['緯度'])
            if(Number.isNaN(lng) || Number.isNaN(lat)) {
              return shop
            } else {
              const to = turf.point([lng, lat])
              const distance = turf.distance(from, to, {units: 'meters' as 'meters'});
              return { ...shop, distance }
            }
          })
          sortingShopList.sort((a,b) => {
            if(typeof a.distance !== 'number') {
              return -1
            } else if (typeof b.distance !== 'number') {
              return 1
            } else {
              return a.distance - b.distance
            }
          })
          setShopList(sortingShopList)
        }
      });
    });
  }, [])

  return (
    <div className="app">
      <div className="app-body">
        <HashRouter>
          <Route exact path="/"><Home data={shopList} /></Route>
          <Route exact path="/list"><List data={shopList} /></Route>
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
