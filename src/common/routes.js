import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../client/containers/Layout';
import Jobs from '../client/containers/Jobs';
import NotFoundPage from '../client/components/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Jobs} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

export default routes;
