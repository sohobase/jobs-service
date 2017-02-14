import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import routes from '../shared/routes';

export default class App extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)} />
    );
  }
}
