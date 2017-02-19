import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Button from './Button';
import style from './Header.css';

const Header = ({ children }) => (
  <header className={style.header}>
    <div className={style.wrapper}>
      <Link to="/">
        <img src="/static/img/logo.png" className={style.brand} alt="" />
      </Link>
      <nav className={style.navigation}>
        <Link to="/help">Ask us anything</Link>
        <Button caption="Post new offer" accent />
      </nav>
    </div>
    { children }
  </header>
);

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
