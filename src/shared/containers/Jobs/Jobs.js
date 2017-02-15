import React, { PropTypes } from 'react';
import { JobListItem } from '../../components';
import style from './Jobs.css';

const Jobs = ({ dataSource }) => (
  <ul>
    <JobListItem name="hello" />
    <JobListItem name="world" />
  </ul>
);

Jobs.propTypes = {
  dataSource: PropTypes.unknown,
};

export default Jobs;
