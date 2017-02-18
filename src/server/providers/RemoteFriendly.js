import Chrono from 'chrono-node';
import Xray from 'x-ray';
import { Offer } from '../models';

const x = Xray({
  filters: {
    id(value) {
      return value.split('/jobs/')[1].replace(/\D/g,'');
    },
    date(value) {
      return Chrono.parseDate(value);
    }
  },
});

const schema = {
  id: 'a@href | id',
  position: '.jobtitle',
  company: '.company',
  page: x('a@href', {
    details: ['dd'],
    createdAt: 'time@datetime | date',
    companyUrl: 'dd a@href'
  }),
};


x('https://remotefriendly.work/', 'tr', [schema])((error, values) => {
  console.log(error);
  const jobs = values.map(({ id, position, company, page }) => {
    return {
      provider: 'remotefriendly.work',
      id,
      position,
      company: company.replace(/\t|\n/g, ''),
      category: page.details[1],
      createdAt: page.createdAt,
      companyUrl: page.companyUrl,
      region: page.details[3],
    };
  });

  console.log(jobs);
});
