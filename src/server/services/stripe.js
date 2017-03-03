import stripe from 'stripe';
import { Offer } from '../models';
import C from '../../shared/constants';
import { ServiceTelegram } from './';

const { NODE_ENV, STRIPE_SECRET_KEY } = process.env;
const { production } = C.environment;

export default (token, offer) => (
  new Promise((resolve, reject) => {
    stripe(STRIPE_SECRET_KEY).charges.create({
      amount: 20000,
      currency: 'usd',
      source: token,
      description: 'Charge for remoto.work',
    }, (error, charge) => {
      if (error) return reject(error);

      if (charge.status === 'succeeded') {
        if (NODE_ENV === production) ServiceTelegram('New charge +200$. 💸💸💸💸💸💸');
        // @TODO: Insert Offer from session
      }
      return resolve({});
    });
  })
);
