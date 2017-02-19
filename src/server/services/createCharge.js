import { Offer } from '../models';
import C from '../../shared/constants';
import { ServiceTelegram } from './';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default (token, offer) => (
  new Promise((resolve, reject) => {
    stripe.charges.create({
      amount: 20000,
      currency: 'usd',
      source: token,
      description: 'Charge for remoto.work',
    }, (err, charge) => {
      if (err) reject(err);
      let offerResult = {};
      if (charge.status === 'succeeded') {
        if (process.env.NODE_ENV === C.environment.production) ServiceTelegram('New charge +200$. 💸💸💸💸💸💸');
        offerResult = Offer.insert(offer);
      }
      resolve(offerResult);
    });
  })
);
