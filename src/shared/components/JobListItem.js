import React, { PropTypes } from 'react';
import style from './JobListItem.css';

const JobListItem = ({ name }) => (
  <li className={style.joblistitem}>
    {name}
  </li>
);

JobListItem.propTypes = {
  name: PropTypes.string,
};

export default JobListItem;
