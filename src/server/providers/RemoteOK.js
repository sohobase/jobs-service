import Xray from 'x-ray';

const x = Xray({
  filters: {
    id(value) {
      return value.split('/remote-jobs/')[1];
    },
  },
});

const schema = {
  id: 'a@href | id',
  title: 'h2[itemprop="title"]',
  company: 'h3[itemprop="name"]',
  url: 'a@href',
  createdAt: '[itemprop="datePosted"]',
  page: x('a@href', {
    companyUrl: '.description:first-child a:nth-child(2)@href',
    location: '[itemprop="jobLocation"]',
    text: '.description div p@html',
  }),
};

x('https://remoteok.io/', '.job', [schema])((error, values) => {
  const offers = values.map(({ id, title, company, url, createdAt, page = {} }) => {
    return {
      provider: 'remoteok.io',
      id,
      url,
      title: title.replace(/\t|\n/g, ''),
      company: company.replace(/\t|\n/g, ''),
      companyUrl: page.companyUrl,
      location: page.location.replace(/\t|\n/g, ''),
      text: page.text,
      createdAt: createdAt.replace(/\t|\n/g, ''),
    };
  });

  console.log(offers);
});
