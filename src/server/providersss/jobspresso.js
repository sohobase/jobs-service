// https://jobspresso.co/

import Chrono from 'chrono-node';
import Xray from 'x-ray';
import { Offer } from '../models';
import { ServiceTelegram } from '../services';

const x = Xray({
  filters: {

    category(value) {
      return value.toLowerCase();
    },

    id(value) {
      return (value && value.length > 0) ? value.split('-')[1] : undefined;
    },

    date(value) {
      return Chrono.parseDate(value);
    },

    about(value) {
      return value;
    },

    location(value) {
      return value.replace(/(\t|\n|\r)/gm, '');
    },
  },
});

const schema = {
  id: '@id | id',
  position: '.job_listing-title',
  company: '.job_listing-company strong',
  location: '.job_listing-location | location',
  page: x('a.job_listing-clickbox@href', {
    category: '.job-type | category',
    createdAt: '.date-posted date | date',
    companyUrl: '.job-company a@href',
    companyAbout: '.job-company-about | about',
    companyImage: '.company_logo@src',
    text: '.job-overview .section',
    url: '.job_manager_contact_details_inner a@href',
  }),
};

export default () => {
  x('https://jobspresso.co/', '.job_listings li', [schema])((error, values = []) => {
    ServiceTelegram(`⚙️ #cron #jobespresso ${error || ''}`);

    values.forEach(({ id, position, company, location, page }) => {
      if (id) {
        Offer.consolidate('jobspresso', id, {
          category: page.category,
          position,
          url: page.url,
          remote: location === 'Anywhere',
          location,

          company,
          companyUrl: page.companyUrl,
          companyAbout: page.companyAbout,
          companyImage: page.companyImage,

          text: page.text,
          state: 'ready',
          // highlight: false,
          createdAt: page.createdAt,
        });
      }
    });
  });
};
