import { Router } from 'express';
import { Offer } from '../models';

const router = new Router();

router.get('/job/:id', (req, res) => {
  const { id } = req.params;
  const offer = Offer.find({ query: { id, state: 'ready' } });

  if (!offer) return res.status(404).json({ error: 'Not Found' });

  delete offer.url;
  return res.json(offer);
});


router.get('/job/:id/redirect', (req, res) => {
  const { id } = req.params;
  const offer = Offer.find({ query: { id, state: 'ready' } });

  return res.json({ url: offer ? offer.url : undefined });
});


router.get('/jobs/:category', (req, res) => {
  const { category } = req.params;

  const offers = Offer.find({
    query: { category, state: 'ready' },
    limit: 32,
  });

  return res.json({ offers });
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

export default router;
