import { Offer } from '../models';

export default (req) => {
  const { originalUrl, params } = req;
  const urlParts = originalUrl.split('/');
  const urlContext = urlParts[1];
  let dataSource;

  if (urlContext === 'job') {
    const { id } = params;
    dataSource = Offer.find({ query: { id, state: 'ready' } });
    delete dataSource.url;
  } else if (urlContext === '' || urlContext === 'jobs') {
    const category = urlParts[2];
    const query = { state: 'ready' };

    if (category) query.category = category;
    dataSource = Offer.find({ query, sortBy: 'createdAt', limit: 32 });
  } else if (urlContext === 'offer') {
    dataSource = req.session.offer;
  }

  return dataSource;
};
