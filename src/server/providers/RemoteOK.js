import Chrono from 'chrono-node';
import Xray from 'x-ray';
import { Offer } from '../models';
import { ServiceTelegram } from '../services';

const x = Xray({
  filters: {
    id(value) {
      return value.split('/remote-jobs/')[1];
    },

    date(value) {
      return Chrono.parseDate(value);
    },

    format(value) {
      return value.replace(/(\t|\n|\r)/gm, '');
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
    text: '.description div p@text | format',
  }),
};

x('https://remoteok.io/', '.job', [schema])((error, values = []) => {
  ServiceTelegram(`⚙️ /cron/remoteok : ${error ? ("🚨" + error) : "🏁"}`);
  values.forEach(({ id, position, featured, company, companyImage, url, createdAt, page, skills }) => {
    if (id) {
      Offer.consolidate('remoteok', id, {
        // category,
        position,
        url,
        remote: page.location === 'Remote',
        location: page.location,
        company,
        companyUrl: page.companyUrl,
        // companyAbout
        companyImage,

        text: page.text,
        // salary
        skills,
        state: 'ready',
        highlight: featured.length > 0,
        createdAt,
      });
    }
  });
});
