import React, { Component, PropTypes } from 'react';
import { Box, Button, JobListItem } from '../../components';
import style from './Jobs.css';

export default class Jobs extends Component {

  static propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.object),
    store: PropTypes.arrayOf(PropTypes.object),
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
      <div className={style.jobs}>
        <ul className={style.list}>
          { dataSource.map(props => <JobListItem {...props} />) }
        </ul>

        <aside>
          <Box
            title="Why Remoto works?"
            text="We have a growing community of 200,000 designers, developers and technology professionals using Panda to keep them up to date. It’s a place where companies and talent connect."
          >
            <Button caption="Post a job starting at 200$" className={style.button} accent />
          </Box>

          <div className={style.box} />
        </aside>
      </div>
    );
  }
}
