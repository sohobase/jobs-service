import { Router } from 'express';

const router = new Router();

router.get('/jobs/new', (req, res) => {
  const bindings = {
    store: {},
    session: res.locals.session,
    markup: '<h2>jobs/new</h2>',
  };

  res.render('index.ejs', bindings);
});

export default router;
