import React from 'react';
import { useLocation } from 'react-router-dom';

function Footer() {
  let currentYear = new Date().getFullYear();
  const location = useLocation();
  return (
    <>
      {location.pathname === '/sign-in' ? (
        <></>
      ) : location.pathname === '/sign-up' ? (
        <></>
      ) : (
        <footer className="footer">
          <p className="footer__copyright">
            &copy; {`${currentYear}`} Mesto Russia
          </p>
        </footer>
      )}
    </>
  );
}

export default Footer;
