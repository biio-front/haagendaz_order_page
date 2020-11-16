import React from 'react';
import '../css/Header.css';
import logo from '../0_haagen-dazs-logo.png';

function Header(props){
    return(
      <header>
        <h1 className="logo" onClick={props.onHome}>
          <img src={logo} alt="하겐다즈 로고" />
        </h1>
        <div className="bg_1"></div>
        <div className="bg_2"></div>
      </header>
    )
}

export default Header;
  