import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Router } from 'express';
import NotFoundPage from '../../shared/components/NotFoundPage';
import routes from '../../shared/routes';

const router = new Router();

router.get('*', (req, res) => {
  match({ routes, location: req.url }, (error, redirect, props) => {
    if (error) return res.status(500).send(error.message);
    if (redirect) return res.redirect(302, redirect.pathname + redirect.search);

    let markup;
    if (props) {
      markup = renderToString(<RouterContext {...props} />);
    } else {
      markup = renderToString(<NotFoundPage />);
      res.status(404);
    }

    return res.render('index', { markup });
  });
});

export default router;
