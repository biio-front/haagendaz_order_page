import React from 'react';
import "../css/Nav.css";

function Nav(props) {
    return (
      <nav>
        <ul className="menu" onClick={e => {
          e.preventDefault();
          props.onChangePage(e);
        }}>
          <li>
            <a href="/" data-menu="pint">
              파인트
            </a>
          </li>
          <li>
            <a href="/" data-menu="mini">
              미니컵
            </a>
          </li>
          <li>
            <a href="/" data-menu="bar">
              스틱바
            </a>
          </li>
          <li>
            <a href="/" data-menu="con">
              콘
            </a>
          </li>
        </ul>
      </nav>
    );
  }

export default Nav;
  