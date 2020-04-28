import React from "react";
import logo from '../logo.svg'
import './AboutUs.scss'
import config from '../config.json'

const Content = () => {
  return (
    <div className="about-us">
      <div className="branding">
        <div className="image"><img src={logo} alt=""/></div>
        <div className="logo">イエメシ</div>
      </div>

      <p>イエメシはテイクアウトに対応しているお店を紹介するためのアプリで、<a href="https://github.com/iemeshi/app">オープンソース</a>で開発されています。</p>

      <p>掲載されている店舗は、コミュニティのみなさんによってメンテナンスされています。</p>

      <h2>{config.title}版について</h2>

      <p>{config.title}版は以下のリポジトリで開発されています。</p>

      <p><a href={config.repository}>{config.repository}</a></p>

      <p>データの追加や修正等を希望する場合は、上のリポジトリを御覧ください。</p>

      <h2>イエメシに関するお問い合わせ</h2>

      <p><a href="https://geolonia.com/contact/">イエメシに関するお問い合わせはこちらからどうぞ。</a></p>

      <p>掲載店舗に関するお問い合わせにつきましては、ご対応いたしかねますのであらかじめご了承ください。</p>
    </div>
  );
};

export default Content;
