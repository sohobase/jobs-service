import Chrono from 'chrono-node';
import Xray from 'x-ray';
import { Offer } from '../models';

const x = Xray({
  filters: {
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
    category: '.job-type',
    createdAt: '.date-posted date | date',
    companyUrl: '.job-company a@href',
    companyAbout: '.job-company-about | about',
    companyImage: '.company_logo@src',
    text: '.job-overview .section',
    url: '.job_manager_contact_details_inner a@href',
  }),
};

x('https://jobspresso.co/', '.job_listings li', [schema])((error, values = []) => {
  console.log(error);

  values.map(({ id, position, company, location, page }) => {
    if (id) {
      Offer.consolidate('jobspresso', id, {
        category: page.category,
        position,
        url: page.url,
        // remote: false,
        location,

        company,
        companyUrl: page.companyUrl,
        companyAbout: page.companyAbout,
        companyImage: page.companyImage,

        text: page.text,
        state: 'imported',
        // highlight: false,
        createdAt: page.createdAt, //@TODO: Convert to a JavaScript date
      });
    }
  });
});