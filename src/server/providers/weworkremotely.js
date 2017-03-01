import Chrono from 'chrono-node';
import Xray from 'x-ray';
import { Offer } from '../models';
import { ServiceTelegram } from '../services';
import valueBetween from './modules/valueBetween';
import toMarkdown from './modules/toMarkdown';

const x = Xray({
  filters: {

    category(value) {
      const between = valueBetween(value, 'See more ', ' jobs');
      return between ? between.toLowerCase() : undefined;
    },

    id(value) {
      return value.split('/jobs/')[1];
    },

    location(value) {
      return value.replace('Headquarters: ', '');
    },

    createdAt(value) {
      return Chrono.parseDate(value);
    },

    markdown(value) {
      return toMarkdown(value);
    },
  },
});

const schema = {
  id: 'a@href | id',
  position: 'a .title',
  company: 'a .company',
  createdAt: 'a .date | createdAt',
  page: x('a@href', {
    category: '.perma-nav a | category',
    location: '.location | location',
    url: '.apply a@href',
    companyUrl: '.listing-header-container h2 a@href',
    companyImage: '.listing-logo img@src',
    text: '.listing-container | markdown',
  }),
};

export default () => {
  x('https://weworkremotely.com/', '.jobs li', [schema])((error, values = []) => {
    ServiceTelegram(`⚙️ #cron #weworkremotely ${error || ''}`);

    values.forEach(({ id, position, company, page = {} }) => {
      Offer.consolidate('weworkremotely', id, {
        category: page.category,
        position,
        url: page.url,
        // remote,
        location: page.location,
        company: {
          name: company,
          url: page.companyUrl,
          // about:
          image: page.companyImage,
        },
        text: page.text,
        // salary
        // skills
        state: 'ready',
        // highlight: false,
      });
    });
  });
};
