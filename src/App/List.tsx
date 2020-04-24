import React from "react";
import ShopListItem from './ShopListItem'
import Shop from './Shop'
import './List.scss'

type Props = {
  data: Iemeshi.ShopData[];
}

const Content = (props: Props) => {

  const [ index, setIndex ] = React.useState<number| null>(null)
  const { data } = props

  const popupHandler = (index: number) => {
    setIndex(index)
  }

  const closeHandler = () => {
    setIndex(null)
  }

  return (
    <div className="shop-list">
      {
        data.map((shop) => <div key={shop.index} className="shop">
          <ShopListItem
            index={shop.index}
            data={shop}
            popupHandler={popupHandler}
          />
        </div>)
      }
      {index !== null?
        <Shop shop={props.data[index]} close={closeHandler} />
        :
        <></>
      }
    </div>
  );
};

export default Content;
