import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Router } from 'express';
import NotFoundPage from '../../shared/components/NotFoundPage';
import routes from '../../shared/routes';

const router = new Router();

router.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    let markup;
    if (renderProps) {
      markup = renderToString(<RouterContext {...renderProps} />);
    } else {
      markup = renderToString(<NotFoundPage />);
      res.status(404);
    }

    return res.render('index', { markup });
  });
});

export default router;
