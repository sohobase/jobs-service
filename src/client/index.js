import React from 'react';
import { render } from 'react-dom';
import App from './App';

window.onload = () => {
  render(<App />, document.getElementById('remoto'));
};

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(<NextApp />, document.getElementById('remoto'));
  });
}
