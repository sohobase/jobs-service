import React, { PropTypes } from 'react';
import { Header, Footer, Landing } from '../../components';
import style from './Layout.css';

const Layout = ({ children }) => (
  <article className={style.layout}>
    <Header />
    <Landing />
    <section className={style.wrapper}>
      {children}
    </section>
    <Footer />
  </article>
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;