import React from 'react';
import { Link } from 'react-router';
import style from './Footer.css';

export default () => (
  <footer className={style.footer}>
    <Link to="/">Site Terms</Link> & <Link to="/">Conditions</Link> for use and our Privacy Policy apply. ©2017 Sohobase Ltd. All References marked with a ™ or ® are trademarks of Sohobase. All rights reserved.
  </footer>
);
