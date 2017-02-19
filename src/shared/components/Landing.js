import React from 'react';
import { Link } from 'react-router';
import style from './Landing.css';

export default () => (
  <section className={style.landing}>
    <div className={style.wrapper}>
      <input type="search" />
    </div>
  </section>
);
