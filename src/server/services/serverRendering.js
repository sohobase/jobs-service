import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import NotFoundPage from '../../shared/components/NotFoundPage';
import routes from '../../shared/routes';
import storeService from './storeService';

export default (req, res) => {
  match({ routes, location: req.originalUrl }, (error, redirect, routerProps) => {
    if (error) return res.status(500).send(error.message);
    if (redirect) return res.redirect(302, redirect.pathname + redirect.search);

    let markup;
    const store = storeService(req.originalUrl, req.params);
    if (routerProps) {
      const renderProps = {
        ...routerProps,
        createElement: (Component, props) => (
          <Component {...props} dataSource={store} />
        ),
      };

      markup = renderToString(<RouterContext {...renderProps} />);
    } else {
      markup = renderToString(<NotFoundPage />);
      res.status(404);
    }

    return res.render('index', { markup, store });
  });
};
