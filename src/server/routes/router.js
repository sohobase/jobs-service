import path from 'path';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import NotFoundPage from '../../shared/components/NotFoundPage';
import routes from '../../shared/routes';
import { ServiceQuery } from '../services';

const app = Express();
const handleRequest = (req, res) => {
  match({ routes, location: req.originalUrl }, (error, redirect, routerProps) => {
    if (error) return res.status(500).send(error.message);
    if (redirect) return res.redirect(302, redirect.pathname + redirect.search);

    let markup;
    return ServiceQuery(req).then((dataSource) => {
      if (routerProps) {
        const renderProps = {
          ...routerProps,
          createElement: (Component, props) => (
            <Component {...props} dataSource={dataSource} />
          ),
        };

        markup = renderToString(<RouterContext {...renderProps} />);
      } else {
        markup = renderToString(<NotFoundPage />);
        res.status(404);
      }

      res.render('index', { markup, dataSource });
    });
  });
};

app.set('views', path.resolve('.', 'src/server/views'));
app.use('/static', Express.static(path.resolve('.', 'public')));
app.use('/job/:id', handleRequest);
app.use('/', handleRequest);

export default app;
