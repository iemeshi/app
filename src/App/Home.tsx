import React from "react";
import csvParser from 'csv-parse'
import Map from "./Map"
import config from '../config.json'

type Data = {
  [key: string]: string;
}

const Content = () => {
  const [ orientation, setOrientation] = React.useState<any>(window.orientation)
  const [ data, setData ] = React.useState<Data | undefined>()

  React.useEffect(() => {
    window.addEventListener('orientationchange', () => {
      setOrientation(window.orientation)
    })
  }, [])

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
    <><Map orientation={orientation} data={data} /></>
  );
};

export default Content;
