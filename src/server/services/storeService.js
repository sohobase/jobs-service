import { Offer } from '../models';

export default (url, params) => {
  switch (url) {
    case '/':
      return Offer.find({ limit: 20 });

    case (url.match(/\/job\/[\w|-]*/) || {}).input:
      return Offer.find({ query: { id: params.id } });

    default:
      return {};
  }
};
