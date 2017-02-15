import React, { PropTypes } from 'react';
import { Header, Footer, Landing } from '../../components';
import style from './Layout.css';

const Layout = ({ children }) => (
  <article>
    <Header />
    <Landing />
    <section>
      {children}
    </section>
    <Footer />
  </article>
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
