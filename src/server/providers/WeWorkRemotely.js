import Xray from 'x-ray';

const x = Xray({
  filters: {
    id(value) {
      return value.split('/jobs/')[1];
    },
  },
});

const schema = {
  id: 'a@href | id',
  title: 'a .title',
  company: 'a .company',
  url: 'a@href',
  createdAt: 'a .date',
  page: x('a@href', {
    location: '.location',
    companyUrl: 'h2 a@href',
    text: '.listing-container@html',
  }),
};

x('https://weworkremotely.com/', '.jobs li', [schema])((error, values) => {
  const offers = values.map(({ id, title, company, url, createdAt, page = {} }) => {
    return {
      provider: 'weworkremotely.com',
      id,
      url,
      title,
      company,
      companyUrl: page.companyUrl,
      location: page.location,
      text: page.text,
      createdAt,
    };
  });

  console.log(offers);
});
