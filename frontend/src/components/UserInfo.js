import { Link } from 'react-router-dom';

export default function UserInfo({ loggedIn, email, onSignOut }) {
  return (
    <div className="header__user-info">
      <p className="header__email">{email}</p>
      <Link
        to="sign-in"
        className={`header__link ${loggedIn && 'header__link_active'}`}
        onClick={onSignOut}
      >
        Выйти
      </Link>
    </div>
  );
}
