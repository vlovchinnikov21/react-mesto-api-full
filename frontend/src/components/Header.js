import React from 'react';
import UserInfo from './UserInfo';
import mainLogo from '../images/logo.svg';
import { Link, withRouter, useLocation } from 'react-router-dom';

function Header({ loggedIn, email, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img src={mainLogo} alt="лого-место" className="logo" />
      {loggedIn ? (
        <UserInfo email={email} loggedIn={loggedIn} onSignOut={onSignOut} />
      ) : (
        <>
          {location.pathname === '/sign-in' ? (
            <Link className="header__link header__link_position" to="/sign-up">
              Регистрация
            </Link>
          ) : (
            <Link className="header__link header__link_position" to="/sign-in">
              Войти
            </Link>
          )}
        </>
      )}
    </header>
  );
}

export default withRouter(Header);
