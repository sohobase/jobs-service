import React, { Component, PropTypes } from 'react';
import ProviderDate from '../../providers/ProviderDate';
import style from './Job.css';

export default class Job extends Component {

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
    const { company, createdAt, location, position, text, url } = this.state.dataSource;
    return (
      <section className={style.job}>
        <header className={style.header}>
          <h1 className={style.title}>{position}</h1>
          <small className={style.date}>Posted {ProviderDate.short(createdAt)}</small>
          <strong>{company}</strong>
          <strong>{location}</strong>
          <a href={url}>link</a>
        </header>
        <div className={style.content}>
          <div className={style.text}>
            {text}
          </div>

          <aside className={style.side}>
            <nav className={style.social}>
              <a href="/">Tell a friend</a>
              <a href="/">Tweet this job</a>
              <a href="/">Post on LinkedIn</a>
            </nav>

            <small>
              Help us maintain the quality of jobs posted on We Work Remotely. Let us know if this job isn’t really remote.
            </small>
          </aside>
        </div>
      </section>
    );
  }
}
