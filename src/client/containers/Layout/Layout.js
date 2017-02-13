import React, { PropTypes } from 'react';

const LayoutPropTypes = {
  children: PropTypes.node,
};

const Layout = ({ children }) => (
  <div>
    <h1>Home page</h1>
    <div>{children}</div>
  </div>
);

Layout.propTypes = LayoutPropTypes;

export default Layout;
