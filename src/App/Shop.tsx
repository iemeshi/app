import React from "react";

import './Shop.scss'
import { BsChevronLeft } from 'react-icons/bs'
import { useParams, useHistory } from "react-router-dom";

type ShopData = {
  [key: string]: string;
}

type ShopList = {
  [key: string]: ShopData
}

type Props = {
  data: ShopList;
}

const Content = (props: Props) => {
  const { id } = useParams()
  const history = useHistory()
  const [ shop, setShop ] = React.useState<ShopData>({})

  React.useEffect(() => {
    if (id) {
      setShop(props.data[id])
    }
  }, [id, props.data])

  const goBack = () => {
    history.goBack()
  }

  return (
    <div className="shop-single">
      <div className="head">
        <button onClick={goBack}><BsChevronLeft /> 戻る</button>
      </div>
      <div className="container">
        {shop?
          <>
            <h2>{shop['店名']}</h2>
          </>
          :
          <></>
        }
      </div>
    </div>
  );
};

export default Content;
