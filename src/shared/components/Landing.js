import React from 'react';
import { Link } from 'react-router';
import style from './Landing.css';

export default () => (
  <section className={style.landing}>
    <div className={style.wrapper}>
      <p className={style.slogan}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      <input type="search" />
    </div>
  </section>
);
