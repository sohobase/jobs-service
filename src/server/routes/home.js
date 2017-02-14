import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
  const bindings = {
    store: {},
    session: res.locals.session,
    markup: '<h2>Hello World</h2>',
  };

  res.render('index.ejs', bindings);
});

export default router;
