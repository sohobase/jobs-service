import React, { Component, PropTypes } from 'react';
import { JobListItem } from '../../components';
import style from './Jobs.css';

export default class Jobs extends Component {

  static propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.object),
  }

  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.dataSource || [],
    };
  }

  componentWillMount() {
    this.setState({ dataSource: this.props.dataSource });
  }

  render() {
    const { dataSource = [] } = this.state;

    return (
      <ul className={style.jobs}>
        { dataSource.map(props => <JobListItem {...props} />) }
      </ul>
    );
  }
}
