import http from 'http';
import { ServiceTelegram } from '../services';
import { Offer } from '../models';
import toMarkdown from './modules/toMarkdown';

const handleRequest = (response) => {
  let str = '';

  response.on('data', (chunk) => {
    str += chunk;
  });

  response.on('end', () => {
    const result = JSON.parse(str);

    result.forEach(({ id, application, company, date, description, salary, tags, title }) => {
      if (id) {
        let remote = false;
        let location;
        const skills = [];
        tags.forEach((tag) => {
          if (tag.type === 'job-skill') {
            skills.push(tag.displayName.toLowerCase());
          }
          if (tag.type === 'city') {
            remote = tag.name === 'remote';
            if (tag.name !== 'remote') location = tag.displayName;
          }
        });
        Offer.consolidate('pandajobs', id, {
          // category,
          position: title,
          url: application,
          remote,
          location,

          company: company.title,
          companyUrl: company.links.web,
          companyAbout: toMarkdown(company.description),
          companyImage: company.logo,

          text: toMarkdown(description),
          salary,
          state: 'imported',
          skills,
          createdAt: date.create,
        });
      }
    });
    ServiceTelegram('⚙️ #cron #pandajobs');
  });
};

export default () => {
  http
    .request('http://api.pnd.gs/v1/jobs?limit=20&page=1', handleRequest)
    .on('error', error => ServiceTelegram(`⚙️ #cron #pandajobs ${error}`))
    .end();
};
