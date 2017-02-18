import { Router } from 'express';
import { Offer } from '../models';

const router = new Router();

router.get('/job/:id', (req, res) => {
  const { id } = req.params;
  const offer = Offer.find({
    query: { id },
  });

  if (!offer) return res.status(404).json({ error: 'Not Found' });

  delete offer.url;
  return res.json(offer);
});

router.get('/job/:id/redirect', (req, res) => {
  const { id } = req.params;
  const offer = Offer.find({ query: { id } });

  return res.json({ url: offer && offer.url });
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
