import React from "react";
import { NavLink } from "react-router-dom";
import "css/Nav.css";

function Nav(props) {
  return (
    <nav>
      <ul
        className="menu"
        data-menu="none"
        onClick={e => {
          e.preventDefault();
        }}
      >
        <li>
          <NavLink exact to="/" data-menu="pint">
            파인트
          </NavLink>
        </li>
        <li>
          <NavLink to="/mini" data-menu="mini">
            미니컵
          </NavLink>
        </li>
        <li>
          <NavLink to="/bar" data-menu="bar">
            스틱바
          </NavLink>
        </li>
        <li>
          <NavLink to="/con" data-menu="con">
            콘
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
