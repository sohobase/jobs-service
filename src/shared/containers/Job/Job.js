import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ProviderDate from '../../providers/ProviderDate';
import { Box, Button } from '../../components';
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
    const {
      category,
      company,
      companyImage,
      companyUrl,
      createdAt,
      location,
      position,
      remote,
      text,
    } = this.state.dataSource;

    return (
      <section className={style.job}>
        <div className={style.box}>
          <header className={style.header}>
            <span className={style.date}>{ProviderDate.ago(createdAt)}</span>
            <h1 className={style.position}>{position}</h1>
            <div className={style.company}>
              { companyImage && <img src={companyImage} alt={company} className={style.image} /> }
              <Link href={companyUrl} className={style.name}>{company}</Link>
            </div>

            <div className={style.content}>
              { remote && <strong>remote</strong> }
              { location && <span>{location}</span> }
              { category && <Link to={`/jobs/${category}`}>{category}</Link> }
            </div>
          </header>
          <div className={classnames(style.content, style.text)}>
            {text}
          </div>
        </div>

        <aside className={style.aside}>
          <Button caption="Apply" large accent />
          <Box>
            <nav>
              <a href="/">Tell a friend</a>
              <a href="/">Tweet this job</a>
              <a href="/">Post on LinkedIn</a>
            </nav>
          </Box>
          <Box
            title="Tip: Application Emails"
            text="We've noticed that people who include a brief description of themselves as well as their resume achieve better results than those who send a longer email when applying."
          />
        </aside>
      </section>
    );
  }
}
