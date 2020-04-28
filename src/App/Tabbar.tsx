import React from "react";
import './Tabbar.scss'

import { FaList, FaHome } from "react-icons/fa"
import { GiJapan } from "react-icons/gi"
import { AiOutlineAppstore } from "react-icons/ai"

const Content = () => {
  return (
    <div className="tabbar">
      <ul>
        <li><a href="/#"><div className="icon"><FaHome /></div><div className="text">ホーム</div></a></li>
        <li><a href="/#list"><div className="icon"><FaList /></div><div className="text">一覧</div></a></li>
        <li><a href="https://iemeshi.jp/"><div className="icon"><GiJapan /></div><div className="text">全国</div></a></li>
        <li><a href="/#about"><div className="icon"><AiOutlineAppstore /></div><div className="text">イエメシについて</div></a></li>
      </ul>
    </div>
  );
};

export default Content;
