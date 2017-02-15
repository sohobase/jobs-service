import React from 'react';
import { Link } from 'react-router';
import style from './Header.css';

export default () => (
  <header className={style.header}>
    <div className={style.wrapper}>
      <Link to="/">
        <h1 className={style.brand}>/remoto/</h1>
      </Link>
      <nav className={style.navigation}>
        <Link to="/job/1234">Ask us anything</Link>
        <Link to="/job/1234">Example Job</Link>
        <Link to="/post">Post new offer</Link>
      </nav>
    </div>
  </header>
);
