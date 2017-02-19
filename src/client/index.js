import React from 'react';
import { render } from 'react-dom';
import App from './App';

let store;
try {
  store = JSON.parse(document.getElementById('store').innerHTML);
} catch (e) {
  console.log(e);
}

window.onload = () => {
  render(<App store={store} />, document.getElementById('remoto'));
};

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(<NextApp store={store} />, document.getElementById('remoto'));
  });
}
