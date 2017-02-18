import Chrono from 'chrono-node';
import Xray from 'x-ray';
import { Offer } from '../models';

const x = Xray({
  filters: {
    id(value) {
      return value.split('/jobs/')[1].replace(/\D/g,'');
    },
  },
});

const schema = {
  id: 'a@href | id',
  position: '.jobtitle',
  company: '.company',
  page: x('a@href', ['dd']),
};

x('https://remotefriendly.work/', 'tr', [schema])((error, values) => {
  console.log(error);
  const jobs = values.map(({ id, position, company, page }) => {
    return {
      provider: 'remotefriendly.work',
      id,
      position,
      company: company.replace(/\t|\n/g, ''),
      category: page[1],
      createdAt: page[2],
      region: page[3]
    };
  });

  console.log(jobs);
});
