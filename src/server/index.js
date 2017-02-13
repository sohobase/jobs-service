import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import webpack from 'webpack';
import morgan from 'morgan';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../common/routes';
import NotFoundPage from '../client/components/NotFoundPage';
import webpackConfig from '../../webpack.config';

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// -- Webpack HMR Middleware
if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);

  console.log('Enabling webpack dev and HMR middleware'); // eslint-disable-line no-console
  app.use(require('webpack-dev-middleware')(compiler, { // eslint-disable-line global-require
    hot: true,
    filename: 'bundle.js',
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  }));

  app.use(require('webpack-hot-middleware')(compiler, { // eslint-disable-line global-require
    log: console.log, // eslint-disable-line no-console
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
}


app.use(Express.static(path.join(__dirname, 'static')));
app.use(morgan('dev'));

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    let markup;
    if (renderProps) {
      markup = renderToString(<RouterContext {...renderProps} />);
    } else {
      markup = renderToString(<NotFoundPage />);
      res.status(404);
    }

    return res.render('index', { markup });
  });
});

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, (err) => {
  if (err) return console.error(err); // eslint-disable-line no-console
  return console.info(`Server running on http://localhost:${port} [${env}]`); // eslint-disable-line no-console
});
