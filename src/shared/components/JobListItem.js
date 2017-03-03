import classnames from 'classnames';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { ProviderDate } from '../providers';
import style from './JobListItem.css';

const JobListItem = (props = {}) => {
  const {
    _id: id,
    category,
    createdAt = (new Date()),
    company,
    position,
  } = props;
  const { name: companyName, about, image } = company || {};

  const isNew = ProviderDate.inLast24Hours(createdAt);
  const classes = classnames(style.joblistitem, style[category]);

  return (
    <Link to={`/job/${id}`}>
      <li className={classes}>
        { isNew && <abbr className={style.new}>NEW</abbr> }
        <div className={style.header}>
          { image && <img src={image} alt={companyName} className={style.image} /> }
          <span className={style.company}>{companyName}</span>
          { category && <Link to={`/jobs/${category}`} className={style.category}>{category}</Link> }
          <span className={style.date}>{ProviderDate.ago(createdAt)}</span>
        </div>
        <strong className={style.position}>{position}</strong>
        { about && <p className={style.about}>{about}</p> }
      </li>
    </Link>
  );
};

JobListItem.propTypes = {
  category: PropTypes.string,
  company: PropTypes.object,
  _id: PropTypes.string,
  position: PropTypes.string,
  createdAt: PropTypes.any,
};

export default JobListItem;
