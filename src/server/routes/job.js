import { Router } from 'express';

const router = new Router();

// Info of a determinate order using store id
router.get('/job/:id', (req, res) => {
  res.render('index', {
    store: {},
    session: res.locals.session,
    markup: '<h2>job/id</h2>',
  });
});

export default router;
