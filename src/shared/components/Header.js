import React from 'react';
import { Link } from 'react-router';
import Button from './Button';
import style from './Header.css';

export default () => (
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
  </header>
);
