import React, { PropTypes } from 'react';
import { Header, Footer, Landing } from '../../components';
import style from './Layout.css';

const Layout = ({ children, location: { pathname } }) => (
  <article className={style.layout}>
    <Header />
    { pathname === '/' && <Landing /> }
    <section className={style.wrapper}>
      {children}
    </section>
    <Footer />
  </article>
);

Layout.propTypes = {
  children: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default Layout;
