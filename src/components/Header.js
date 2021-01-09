import React, { useCallback } from 'react';
import 'css/Header.css';
import logo from '0_haagen-dazs-logo.png';
import { Link } from "react-router-dom";
import { auth } from 'firebaseApp';
import { DATA_LS } from 'logic/initStorage';
import { useDispatch } from 'react-redux';
import { reset } from 'reducers/cart';

function Header({ userId }) {
  const dispatch = useDispatch();
  const onLogOut = useCallback(() => {
    auth.signOut();
    localStorage.removeItem(DATA_LS);
    dispatch(reset());
  });

  return (
    <header>
      <Link to="/">
        <h1 className="logo">
          <img src={logo} alt="하겐다즈 로고" />
        </h1>
      </Link>
      {userId ?
        <button className="logOut" onClick={onLogOut}>LogOut</button>
        : <Link to='/auth' className="logIn">LogIn</Link>
      }
      <div className="bg_1"></div>
      <div className="bg_2"></div>
    </header>
  )
}

export default Header;
