import React from "react";
import { Link } from "react-router-dom";
import './Tabbar.scss'

import { FaList, FaHome, FaSearch, FaCamera } from "react-icons/fa"
import { AiOutlineAppstore } from "react-icons/ai"

const Content = () => {
  return (
    <div className="tabbar">
      <ul>
        <li><Link to="/"><div className="icon"><FaHome /></div><div className="text">ホーム</div></Link></li>
        <li><Link to="/list"><div className="icon"><FaList /></div><div className="text">一覧</div></Link></li>
        <li><Link to="/category"><div className="icon"><FaSearch /></div><div className="text">カテゴリ</div></Link></li>
        <li><Link to="/images"><div className="icon"><FaCamera /></div><div className="text">写真から探す</div></Link></li>
        <li><Link to="/about"><div className="icon"><AiOutlineAppstore /></div><div className="text">マップについて</div></Link></li>
      </ul>
    </div>
  );
};

export default Content;
