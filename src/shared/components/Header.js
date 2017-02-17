import React from 'react';
import { Link } from 'react-router';
import style from './Header.css';

export default () => (
  <header className={style.header}>
    <div className={style.wrapper}>
      <Link to="/">
        <img src="/static/img/logo.png" className={style.brand} />
      </Link>
      <nav className={style.navigation}>
        <Link to="/help">Ask us anything</Link>
        <Link to="/job/1234">Example Job</Link>
        <Link to="/post">Post new offer</Link>
      </nav>
    </div>
  </header>
);
