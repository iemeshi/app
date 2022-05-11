import Links from './Links'
import { BsChevronCompactRight } from 'react-icons/bs'
import { makeDistanceLabelText } from './distance-label'
import ReactStars from 'react-stars'
import './ShopListItem.scss'
import { Link } from "react-router-dom";

type Props = {
  data: Iemeshi.ShopData;
  popupHandler: Function;
  queryCategory: string | null;
};

const Content = (props: Props) => {
  const clickHandler = () => {
    props.popupHandler(props.data)
  }

  const distanceTipText = makeDistanceLabelText(props.data.distance)
  const category = props.data['カテゴリ']
  const rate = parseInt(props.data['推しレベル'])

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
          <span className="nowrap">{distanceTipText && <span className="distance">現在位置から {distanceTipText}</span>}</span>
        </div>

        <Links data={props.data} />

        <div style={{ margin: "16px 0" }}>
          <div className="rating">

            <p>推しレベル</p>
            <Link to={`/list?rate=${rate}`} className='rating-stars'>
              <ReactStars
                count={5}
                value={rate}
                edit={false}
                size={18}
              />
            </Link>

          </div>
            <p className="author">作成者または紹介者: <Link to={`/list?author=${props.data['学籍番号']}`}>{props.data['作成者または紹介者']}</Link></p>
        </div>

        <div className="right" onClick={clickHandler}><BsChevronCompactRight size="40px" color="#CCCCCC" /></div>
      </div>
    </>
  );
};

export default Content;
