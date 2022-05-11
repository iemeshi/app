import React from "react";
import ShopListItem from './ShopListItem'
import Shop from './Shop'
import './List.scss'
import { useSearchParams } from "react-router-dom";
import ReactStars from 'react-stars'
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
  data: Iemeshi.ShopData[];
}

const Content = (props: Props) => {

  const [shop, setShop] = React.useState<Iemeshi.ShopData | undefined>()
  const [data, setData] = React.useState<Iemeshi.ShopData[]>(props.data)
  const [list, setList] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(10);
  const [hasMore, setHasMore] = React.useState(true);

  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get('category')
  const queryRate = searchParams.get('rate')
  const queryAuthor = searchParams.get('author')
  let queryAuthorName = ''
  if (queryAuthor) {
    const postByAuthor = data.find(item => item['学籍番号'] === queryAuthor)

    if (postByAuthor) {
      queryAuthorName = postByAuthor['作成者または紹介者']
    }
  }


  React.useEffect(() => {

    let data = props.data;

    if (queryCategory) {
      data = props.data.filter((shop) => {
        return shop['カテゴリ'] === queryCategory
      })
    }

    if (queryRate) {
      data = props.data.filter((shop) => {
        return shop['推しレベル'] === queryRate
      })
    }

    if (queryAuthor) {
      data = props.data.filter((shop) => {
        return shop['学籍番号'] === queryAuthor
      })
    }

    let isMounted = true
    // prevent memory leak
    if (isMounted) {
      setList(data.slice(0, page))
      setData(data)
    }

    return () => {
      isMounted = false
    }
  }, [props.data, queryCategory, queryRate, queryAuthor, page])


  const popupHandler = (shop: Iemeshi.ShopData) => {
    if (shop) {
      setShop(shop)
    }
  }

  const closeHandler = () => {
    setShop(undefined)
  }

    //項目を読み込むときのコールバック
    const loadMore = () => {

      //データ件数が0件の場合、処理終了
      if (list.length >= data.length) {
        setHasMore(false);
        return;
      }

      setList([...list, ...data.slice(page, page + 10)])
      setPage(page + 10)
    }

  const loader = <div
    className="loader"
    key={0}
    style={{
      width: '100%',
      textAlign: 'center',
    }}
  >Loading ...</div>;

  return (
    <div id="shop-list" className="shop-list">
      {queryCategory && <div className="shop-list-category">{`カテゴリ：「${queryCategory}」`}</div>}
      {queryRate &&
        <div className="shop-list-category">
          {`推しレベル：`}
          <ReactStars
            count={5}
            value={parseInt(queryRate)}
            edit={false}
            size={18}
          />
        </div>}
      {queryAuthor && <div className="shop-list-category">{`作成者または紹介者：「${queryAuthorName}」`}</div>}

      <InfiniteScroll
        dataLength={list.length}
        next={loadMore}
        hasMore={hasMore}
        loader={loader}
        scrollableTarget="shop-list"
      >
        {
          list.length === 0 ?
            <div className="shop-list-not-found">お探しのおすすめの場所が見つかりませんでした</div>
            :
            list.map((item, index) => {

              return (<div key={index} className="shop">
                <ShopListItem
                  data={item}
                  popupHandler={popupHandler}
                  queryCategory={queryCategory}
                />
              </div>)

            })
        }
      </InfiniteScroll>
      {shop ?
        <Shop shop={shop} close={closeHandler} />
        :
        <></>
      }
    </div>
  );
};

export default Content;
