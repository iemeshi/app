import { BsChevronCompactRight } from 'react-icons/bs'
import './ShopListItem.scss'
import { Link } from "react-router-dom";

type Props = {
  data: Pwamap.ShopData;
  popupHandler: Function;
  queryCategory: string | null;
};

const Content = (props: Props) => {
  const clickHandler = () => {
    props.popupHandler(props.data)
  }

  const category = props.data['カテゴリ']
  const image = props.data['画像']


  const isCategoryPage = props.queryCategory ? true :false

  return (
    <>
      <div className="shop-link">
        <h2 className="shop-title" onClick={clickHandler}>{props.data['スポット名']}</h2>
        <div className='tag-box'>
          <span className="nowrap">
            {
              !isCategoryPage &&
              <Link to={`/list?category=${category}`}>
                <span className="category">{category}</span>
              </Link>
            }
          </span>
        </div>

        <div style={{ margin: "10px 10px 10px 0" }}>

          { image && <img src={image} alt={props.data['スポット名']} onClick={clickHandler}/>}

        </div>

        <div className="right" onClick={clickHandler}><BsChevronCompactRight size="40px" color="#CCCCCC" /></div>
      </div>
    </>
  );
};

export default Content;
