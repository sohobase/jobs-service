import { Router } from 'express';
import { Offer } from '../models';

const router = new Router();

router.get('/job/:id/redirect', (req, res) => {
  res.send('New here? 💋');
});

router.get('/session', (req, res) => {
  const { session } = req;

  if (session.views) {
    session.views += 1;
  } else {
    session.views = 1;
  }

  res.json({ session });
});

router.get('/stats', (req, res) => {
  res.json({
    offers: Offer.find({ limit: 1 }),
  });
});

export default router;
