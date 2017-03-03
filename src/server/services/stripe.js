import stripe from 'stripe';
import { Offer } from '../models';
import C from '../../shared/constants';
import { ServiceTelegram } from './';

const { NODE_ENV, STRIPE_SECRET_KEY } = process.env;
const { PRODUCTION } = C.ENV;
const { PAYMENT_SETTINGS } = C.stripe;

export default (source, sessionOffer) => (
  new Promise((resolve, reject) => {
    stripe(STRIPE_SECRET_KEY).charges.create({ ...PAYMENT_SETTINGS, source }, (error, charge) => {
      if (error) return reject(error);

      if (charge.status === 'succeeded') {
        if (NODE_ENV === PRODUCTION) ServiceTelegram('New charge +200$. 💸💸💸💸💸💸');
        // @TODO: Insert Offer from session
        console.log('sessionOffer', sessionOffer);

        // Offer.consolidate('remoto', undefined, {
        //   // category: page.category,
        //   position,
        //   // url: page.url,
        //   // remote: location === 'Anywhere',
        //   // location,
        //   // company: {
        //   //   name: company,
        //   //   url: page.companyUrl,
        //   //   about: page.companyAbout,
        //   //   image: page.companyImage,
        //   // },
        //   // text: page.text,
        //   // // salary
        //   // // skills
        //   // state: 'ready',
        //   // // highlight: false,
        // })
      }
      return resolve({});
    });
  })
);
