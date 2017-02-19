import classnames from 'classnames';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { ProviderDate } from '../providers';
import style from './JobListItem.css';

const JobListItem = (props = {}) => {
  const {
    id,
    category,
    createdAt = (new Date()),
    company,
    companyAbout,
    companyImage,
    position,
  } = props;

  const isNew = ProviderDate.inLast24Hours(createdAt);
  const classes = classnames(style.joblistitem, style[category]);

  return (
    <Link to={`/job/${id}`}>
      <li className={classes}>
        { isNew && <abbr className={style.new}>NEW</abbr> }
        <div className={style.header}>
          { companyImage && <img src={companyImage} alt={company} className={style.image} /> }
          <span className={style.company}>{company}</span>
          { category && <Link to={`/jobs/${category}`} className={style.category}>{category}</Link> }
          <span className={style.date}>{ProviderDate.ago(createdAt)}</span>
        </div>
        <strong className={style.position}>{position}</strong>
        { companyAbout && <p className={style.about}>{companyAbout}</p> }
      </li>
    </Link>
  );
};

JobListItem.propTypes = {
  category: PropTypes.string,
  company: PropTypes.string,
  companyAbout: PropTypes.string,
  companyImage: PropTypes.string,
  id: PropTypes.string,
  position: PropTypes.string,
  createdAt: PropTypes.any,
};

export default JobListItem;
