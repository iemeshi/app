import React from "react";
import { FacebookShareButton, LineShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, LineIcon, TwitterIcon } from "react-share";
import config from '../config.json'

import './Share.scss'

const Content = () => {
  const url = window.location.href.replace(/\?.+$/, '').replace(/#.+$/, '')

  return (
    <div className="share">
      <ul>
        <li><a href="/"><TwitterShareButton url={url} hashtags={['イエメシ', 'おうちでごはん']} title={`${config.title} テイクアウトマップ`}><TwitterIcon size={32} round={true} /></TwitterShareButton></a></li>
        <li><a href="/"><FacebookShareButton url={url} hashtag="#イエメシ"><FacebookIcon size={32} round={true} /></FacebookShareButton></a></li>
        <li><a href="/"><LineShareButton url={url} title={`${config.title} テイクアウトマップ`}><LineIcon size={32} round={true} /></LineShareButton></a></li>
      </ul>
    </div>
  );
};

export default Content;
