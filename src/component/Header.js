import React from 'react';
import '../css/Header.css';
import logo from '../0_haagen-dazs-logo.png';
import { Link } from "react-router-dom";

function Header(props){
    return(
      <header>
        <Link to="/">
          <h1 className="logo" onClick={props.onHome}>
            <img src={logo} alt="하겐다즈 로고" />
          </h1>
        </Link>
        <div className="bg_1"></div>
        <div className="bg_2"></div>
      </header>
    )
}

export default Header;
  