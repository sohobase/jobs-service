import path from 'path';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import NotFoundPage from '../../shared/components/NotFoundPage';
import routes from '../../shared/routes';

const app = Express();

app.set('views', path.resolve('.', 'src/server/views'));
app.use('/static', Express.static(path.resolve('.', 'public')));
app.use('/', (req, res) => {
  match({ routes, location: req.url }, (error, redirect, routerProps) => {
    if (error) return res.status(500).send(error.message);
    if (redirect) return res.redirect(302, redirect.pathname + redirect.search);

    let markup;
    if (routerProps) {
      const renderProps = {
        ...routerProps,
        createElement: (Component, props) => (
          <Component {...props} dataSource={[{ name: 'Test 1' }, { name: 'Test 2' }]} />
        ),
      };

      markup = renderToString(<RouterContext {...renderProps} />);
    } else {
      markup = renderToString(<NotFoundPage />);
      res.status(404);
    }

    return res.render('index', { markup });
  });
});

export default app;
