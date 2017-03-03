import { Router } from 'express';
import mongoose from 'mongoose';
import { Offer } from '../models';
import { ServiceStripe } from '../services';

const router = new Router();

router.get('/job/:id', (req, res) => {
  Offer.findOne({ _id: mongoose.Types.ObjectId(req.params.id), state: 'ready' }).then((offer) => {
    if (!offer) return res.status(404).json({ error: 'Not Found' });

    return res.json(offer);
  });
});


router.get('/job/:id/redirect', (req, res) => {
  Offer.findOne({ _id: mongoose.Types.ObjectId(req.params.id), state: 'ready' }).then(offer => (
    res.json({ url: (offer && offer.url) ? offer.url : undefined })
  ));
});


router.get('/jobs/:category', (req, res) => {
  const { category } = req.params;

  Offer.find({ category, state: 'ready' }).limit(32).then(offers => (
    res.json({ offers })
  ));
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

router.post('/offer', (req, res) => {
  const { session } = req;
  session.offer = req.body;
  res.redirect('../offer/preview');
});

router.post('/createCharge', (req, res) => {
  const formData = req.body;
  const { offer } = req.session;
  // TODO offer is null
  ServiceStripe(formData.token, offer).then((result) => {
    res.json({ result: { id: result.id } });
  });
});

export default router;
