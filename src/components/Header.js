import React, { useCallback } from 'react';
import 'css/Header.css';
import logo from '0_haagen-dazs-logo.png';
import { Link, useHistory } from "react-router-dom";
import { auth } from 'firebaseApp';
import { DATA_LS } from 'logic/initStorage';
import { useDispatch } from 'react-redux';
import { reset } from 'reducers/cart';
import { logout } from 'reducers/user';

function Header({ userId }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogin = useCallback(() => {
    history.push('/auth');
  }, [history]);
  const onLogOut = useCallback(async () => {
    try {
      await auth.signOut();
      dispatch(logout());
      dispatch(reset());
      localStorage.removeItem(DATA_LS);
    } catch (error) {
      console.error(error);
    }
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
        : <Link to='/auth' className="logIn" onClick={onLogin}>LogIn</Link>
      }
      <div className="bg_1"></div>
      <div className="bg_2"></div>
    </header>
  )
}

export default Header;
