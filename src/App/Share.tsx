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
        <li><a href="/"><TwitterShareButton url={url} hashtags={[`${config.title}`]} title={`${config.title}`}><TwitterIcon size={32} round={true} /></TwitterShareButton></a></li>
        <li><a href="/"><FacebookShareButton url={url} hashtag={`#${config.title}`}><FacebookIcon size={32} round={true} /></FacebookShareButton></a></li>
        <li><a href="/"><LineShareButton url={url} title={`${config.title}`}><LineIcon size={32} round={true} /></LineShareButton></a></li>
      </ul>
    </div>
  );
};

export default Content;
