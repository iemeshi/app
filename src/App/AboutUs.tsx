import React from "react";
import logo from '../logo.svg'
import './AboutUs.scss'
import config from '../config.json'
import { FaPlus } from 'react-icons/fa';

const Content = () => {
  const clickHandler = () => {
    if (config.form_url) {
      window.location.href = config.form_url
    }
  }

  return (
    <div className="about-us">
      <div className="container">
        <div className="branding">
          <div className="image"><img src={logo} alt=""/></div>
          <div className="logo">イエメシ</div>
        </div>

        <p>イエメシはテイクアウトに対応しているお店を紹介するためのアプリで、<a href="https://github.com/iemeshi/app">オープンソース</a>で開発されています。</p>
        <p>掲載されている店舗は、コミュニティのみなさんによってメンテナンスされています。</p>

        <h2>{config.title}版について</h2>
        <p>{config.title}版は以下のリポジトリで開発されています。</p>
        <p><a href={config.repository}>{config.repository}</a></p>

        {config.form_url?
          <>
            <p>データの追加や修正をご希望の方は以下のフォームをご利用ください。</p>
            <p><a href={config.form_url}>データの登録/更新申請フォーム</a></p>
          </>
          :
          <></>
        }

        <h2>イエメシに関するお問い合わせ</h2>
        <p><a href="https://geolonia.com/contact/">イエメシに関するお問い合わせはこちらからどうぞ。</a></p>
        <p>掲載店舗に関するお問い合わせにつきましては、ご対応いたしかねますのであらかじめご了承ください。</p>

        {config.form_url?
          <>
            <div className="goto-form"><button><FaPlus color="#FFFFFF" onClick={clickHandler} /></button></div>
          </>
          :
          <></>
        }
      </div>
    </div>
  );
};

export default Content;
