import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './containers/Layout';
import Jobs from './containers/Jobs';
import Job from './containers/Job';
import NotFoundPage from './components/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Jobs} />
    <Route path="/job/:id" component={Job} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

export default routes;
