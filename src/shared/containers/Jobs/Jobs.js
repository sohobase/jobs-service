import React, { Component, PropTypes } from 'react';
import { JobListItem } from '../../components';
import style from './Jobs.css';

export default class Jobs extends Component {
  static propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.object),
    store: PropTypes.object,
  }

  constructor(props) {
    super(props);
    const { dataSource, store } = this.props;
    this.state = {
      dataSource: dataSource || store || [],
    };
  }

  render() {
    const { dataSource } = this.state;
    return (
      <ul>
        { dataSource.map(job => <JobListItem name={job.name} />) }
      </ul>
    );
  }
}
