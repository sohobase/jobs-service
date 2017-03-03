import classnames from 'classnames';
// import { markdown } from 'markdown';
import React, { Component, PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router';
import StripeCheckout from 'react-stripe-checkout';
import C from '../../constants';
import ProviderDate from '../../providers/ProviderDate';
import { Box, Button } from '../../components';
import style from './Job.css';

export default class Job extends Component {

  static propTypes = {
    dataSource: PropTypes.object,
    location: PropTypes.object,
    store: PropTypes.object,
  }

  constructor(props) {
    super(props);
    const { dataSource, store } = this.props;
    this.state = {
      dataSource: dataSource || store || [],
    };
  }

  onClickButtonApply = () => {
    const { dataSource = {} } = this.state;

    fetch(`/api/job/${dataSource.id}/redirect`, {
      method: 'GET',
      // body: "{a:'a'}",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(() => {
      window.location = dataSource.url;
    });
  }

  onToken = (token) => {
    const data = {
      token: token.id,
      email: token.email,
    };

    fetch('/api/createCharge', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.json().then((result) => {
        alert(`We are in business, ${result}`);
      });
    });
  }

  render() {
    const {
      category,
      company,
      createdAt,
      location,
      position,
      remote,
      text,
    } = this.state.dataSource;
    const { name, url, image } = company;
    const { location: route } = this.props;
    const stripePublicKey = process.env.NODE_ENV === C.environment.production
      ? C.stripe.live_publishable_key
      : C.stripe.test_publishable_key;

    return (
      <section className={style.job}>
        <div className={style.box}>
          <header className={style.header}>
            <span className={style.date}>{ProviderDate.ago(createdAt)}</span>
            <h1 className={style.position}>{position}</h1>
            <div className={style.company}>
              { image && <img src={image} alt={name} className={style.image} /> }
              <Link href={url} className={style.name}>{name}</Link>
            </div>

            <div className={style.content}>
              { remote && <strong>remote</strong> }
              { location && <span>{location}</span> }
              { category && <Link to={`/jobs/${category}`}>{category}</Link> }
            </div>
          </header>
          <div className={classnames(style.content, style.text)}>
            <ReactMarkdown source={text} />
          </div>
        </div>

        <aside className={style.aside}>
          { route.pathname === '/offer/preview'
            ? <StripeCheckout
              allowRememberMe={false}
              amount={20000}
              currency="USD"
              image="/static/img/logo2.png"
              token={this.onToken}
              stripeKey={stripePublicKey}
            >
              <Button caption="Pay" large accent />
            </StripeCheckout>
            : <Button
              caption="Apply"
              large
              accent
              onClick={this.onClickButtonApply}
              className={style.button}
            />
          }
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
