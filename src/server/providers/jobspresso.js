import Chrono from 'chrono-node';
import Xray from 'x-ray';
import { Offer } from '../models';
import { ServiceTelegram } from '../services';
import toMarkdown from './modules/toMarkdown';

const x = Xray({
  filters: {

    category(value) {
      return value && value.toLowerCase();
    },

    id(value) {
      return (value && value.length > 0) ? value.split('-')[1] : undefined;
    },

    date(value) {
      return value && Chrono.parseDate(value);
    },

    location(value) {
      return value && value.replace(/(\t|\n|\r)/gm, '');
    },

    markdown(value) {
      return value && toMarkdown(value);
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
    companyAbout: '.job-company-about@html | markdown',
    companyImage: '.company_logo@src',
    text: '.job-overview .section@html | markdown',
    url: '.job_manager_contact_details_inner a@href',
  }),
};

export default () => {
  x('https://jobspresso.co/', '.job_listings li', [schema])((error, values = []) => {
    ServiceTelegram(`⚙️ #cron #jobespresso ${error || ''}`);


    values.forEach(({ id, position, company, location, page = {} }) => {

      if (id) {
        Offer.consolidate('jobspresso', id, {
          category: page.category,
          position,
          url: page.url,
          remote: location === 'Anywhere',
          location,
          company: {
            name: company,
            url: page.companyUrl,
            about: page.companyAbout,
            image: page.companyImage,
          },
          text: page.text,
          // salary
          // skills
          state: 'ready',
          // highlight: false,
        });
      }
    });
  });
};
