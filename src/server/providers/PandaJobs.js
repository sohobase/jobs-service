import http from 'http';
import { Offer } from '../models';

const callback = (response) => {
  let str = '';

  response.on('data', (chunk) => {
    str += chunk;
  });

  response.on('end', () => {
    const result = JSON.parse(str);

    result.map(({ id, application, company, date, description, salary, tags, title }) => {
      if (id) {
        let remote = false;
        let location;
        const skills = [];
        tags.map((tag) => {
          if (tag.type === 'job-skill') {
            skills.push(tag.displayName.toLowerCase());
          }
          if (tag.type === 'city') {
            remote = tag.name === 'remote';
            if (tag.name !== 'remote') location = tag.displayName;
          }
          return tag;
        });
        Offer.consolidate('pandajobs', id, {
          // category,
          position: title,
          url: application,
          remote,
          location,

          company: company.title,
          companyUrl: company.links.web,
          companyAbout: company.description,
          companyImage: company.logo,

          text: description,
          salary,
          state: 'imported',
          skills,
          createdAt: date.create,
        });
      }
      return id;
    });
  });
};

http.request('http://api.pnd.gs/v1/jobs?limit=20&page=1', callback).end();
