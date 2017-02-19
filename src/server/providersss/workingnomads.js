import https from 'https';
import { ServiceTelegram } from '../services';
import { Offer } from '../models';

const callback = (response) => {
  let str = '';

  response.on('data', (chunk) => {
    str += chunk;
  });

  response.on('end', () => {
    const result = JSON.parse(str).hits.hits;

    result.map(({ _source }) => {
      const { id, apply_url, category_name, company, description, location_base, pub_date, tags, title } = _source;
      if (id) {
        Offer.consolidate('workingnomads', id, {
          category: category_name,
          position: title,
          url: apply_url,
          remote: !location_base, // eslint-disable-line camelcase
          location: location_base,

          company,

          text: description,
          state: 'imported',
          skills: tags,

          createdAt: pub_date,
        });
      }
      return id;
    });
    ServiceTelegram('⚙️ #cron #workingnomads');
  });
};

export default () => {
  https
    .get('https://www.workingnomads.co/jobsapi/job/_search?sort=pub_date:desc&size=100', callback)
    .on('error', error => ServiceTelegram(`⚙️ #cron #workingnomads ${error}`))
    .end();
};
