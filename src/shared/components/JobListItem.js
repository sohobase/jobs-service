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
    companyImage,
    position,
  } = props;

  const isNew = ProviderDate.inLast24Hours(createdAt);
  const classes = classnames(style.joblistitem, style[category]);

  return (
    <Link to={`/job/${id}`}>
      <li className={classes}>
        { isNew && <abbr className={style.new}>NEW</abbr> }
        { companyImage && <img src={companyImage} alt={company} className={style.image} /> }
        <div className={style.info}>
          <small className={style.company}>{company}</small>
          <strong className={style.position}>{position}</strong>
        </div>
        <small className={style.date}>{ProviderDate.ago(createdAt)}</small>
      </li>
    </Link>
  );
};

JobListItem.propTypes = {
  category: PropTypes.string,
  company: PropTypes.string,
  companyImage: PropTypes.string,
  id: PropTypes.string,
  position: PropTypes.string,
  createdAt: PropTypes.any,
};

export default JobListItem;
