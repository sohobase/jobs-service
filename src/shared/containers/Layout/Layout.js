import React, { PropTypes } from 'react';
import styles from './Layout.css';

const LayoutPropTypes = {
  children: PropTypes.node,
};

const Layout = ({ children }) => (
  <div>
    <h1 className={styles.title}>Home page</h1>
    <div>{children}</div>
  </div>
);

Layout.propTypes = LayoutPropTypes;

export default Layout;
