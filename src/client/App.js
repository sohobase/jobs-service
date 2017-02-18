import React, { cloneElement, Component, PropTypes } from 'react';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import routes from '../shared/routes';

export default class App extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const useExtraProps = {
      renderRouteComponent: (child) => {
        const dataSource = this.props.store;
        return dataSource ? cloneElement(child, { dataSource }) : child;
      },
    };

    return (
      <Router
        history={browserHistory}
        routes={routes}
        onUpdate={() => window.scrollTo(0, 0)}
        render={applyRouterMiddleware(useExtraProps)}
      />
    );
  }
}
