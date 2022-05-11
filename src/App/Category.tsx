import React from "react";
import ReactStars from 'react-stars'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import './Category.scss'

type Props = {
  data: Iemeshi.ShopData[];
}

type AuthorProps = {
  id: string;
  name: string;
}

const Content = (props: Props) => {

  const navigate = useNavigate();

  const [categoryList, setCategoryList] = React.useState<string[]>([]);
  const [rateList, setRateList] = React.useState<string[]>([]);
  const [authorList, setAuthorList] = React.useState<AuthorProps[]>([]);

  React.useEffect(() => {

    let categories: string[] = []
    let rates: string[] = []
    let authors: AuthorProps[] = []

    for (let i = 0; i < props.data.length; i++) {
      const shop = props.data[i];

      if (categories.indexOf(shop['カテゴリ']) === -1) {

        categories.push(shop['カテゴリ'])
      }

      if (rates.indexOf(shop['推しレベル']) === -1) {
        rates.push(shop['推しレベル'])
      }

      const author = {
        id: shop['学籍番号'],
        name: shop['作成者または紹介者']
      }

      if (authors.findIndex(item => item.id === author.id) === -1) {
        authors.push(author)
      }
    }

    setCategoryList(categories)
    setRateList(rates)
    setAuthorList(authors)

  }, [props.data])


  return (
    <>
      <div className="head"></div>
      <div className="category">
        <div className="container">
          <div className="category-item">
            <label htmlFor="category-select">カテゴリから選ぶ</label>
            <Select
              onChange={(e) => {
                if (e) {
                  navigate(`/list?category=${e.value}`);
                }
              }}
              options={
                categoryList.map(category => {
                  return {
                    value: category,
                    label: category
                  }
                })
              }
            />
          </div>

          <div className="category-item">
            <label htmlFor="rating-item">推しレベルから選ぶ</label>
            <Select
              onChange={(e) => {
                if (e) {
                  navigate(`/list?rate=${e.value}`);
                }
              }}
              options={
                rateList.map(rate => {
                  return {
                    value: rate,
                    label: <ReactStars
                      count={5}
                      value={parseInt(rate)}
                      edit={false}
                      size={18}
                    />
                  }
                })} />
          </div>

          <div className="category-item">
            <label htmlFor="author-select">作成者または紹介者から選ぶ</label>
            <Select
              onChange={(e) => {
                if (e) {
                  navigate(`/list?author=${e.value}`);
                }
              }}
              options={
                authorList.map(author => {
                  return {
                    value: author.id,
                    label: author.name
                  }
                })
              }
            />
          </div>

        </div>
      </div>
    </>
  );
};

export default Content;
