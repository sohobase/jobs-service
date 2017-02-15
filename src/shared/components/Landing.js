import React from 'react';
import { Link } from 'react-router';
import style from './Landing.css';

export default () => (
  <section className={style.landing}>
    <div className={style.wrapper}>
      <h2 className={style.slogan}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
      <input type="search" />
    </div>
  </section>
);
