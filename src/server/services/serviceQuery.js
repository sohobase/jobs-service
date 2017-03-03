import mongoose from 'mongoose';
import { Offer } from '../models';

export default (req) => {
  const { originalUrl, params } = req;
  const urlParts = originalUrl.split('/');
  const urlContext = urlParts[1];
  return new Promise((resolve) => {
    if (urlContext === 'job') {
      Offer.findOne({ _id: mongoose.Types.ObjectId(params.id), state: 'ready' }).populate('company').then((dataSource) => {
        const { url, ...others } = dataSource._doc; // eslint-disable-line
        console.log(others);
        resolve(others);
      });
    } else if (urlContext === '' || urlContext === 'jobs') {
      const category = urlParts[2];
      const query = { state: 'ready' };

      if (category) query.category = category;
      Offer.find(query).sort('createdAt').limit(32).then((dataSource) => {
        resolve(dataSource);
      });
    } else if (urlContext === 'offer') {
      resolve(req.session.offer);
    }
  });
};
