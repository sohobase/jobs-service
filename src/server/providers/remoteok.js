import Chrono from 'chrono-node';
import Xray from 'x-ray';
import { Offer } from '../models';
import { ServiceTelegram } from '../services';
import toMarkdown from './modules/toMarkdown';

const x = Xray({
  filters: {
    id(value) {
      return value && value.split('/remote-jobs/')[1];
    },

    date(value) {
      return value && Chrono.parseDate(value);
    },

    format(value) {
      return value && value.replace(/(\t|\n|\r)/gm, '');
    },

    markdown(value) {
      return value && toMarkdown(value);
    },
  },
});

const schema = {
  id: 'a@href | id',
  category: '.nav .box .active p@html',
  position: '.position h2 | format',
  url: 'a@href',
  company: 'h3[itemprop="name"] | format',
  createdAt: '[itemprop="datePosted"] | format | date',
  skills: ['.tags a | format'],
  featured: ['.remoteok-featured'],
  companyImage: '.has-logo .logo@src',
  page: x('a@href', {
    companyUrl: '.description:first-child a:nth-child(2)@href',
    location: '[itemprop="jobLocation"] | format',
    text: '.description div p@text | markdown',
  }),
};

export default () => {
  x('https://remoteok.io/', '.job', [schema])((error, values = []) => {
    ServiceTelegram(`⚙️ #cron #remoteok ${error || ''}`);

    values.forEach(({ id, position, featured, company, companyImage, url, page, skills }) => {
      if (id) {
        Offer.consolidate('remoteok', id, {
          // category,
          position,
          url,
          remote: page.location === 'Remote',
          location: page.location,
          company: {
            name: company,
            url: page.companyUrl,
            // about
            image: companyImage,
          },
          text: page.text,
          // salary
          skills,
          state: 'ready',
          highlight: featured.length > 0,
        });
      }
    });
  });
};
