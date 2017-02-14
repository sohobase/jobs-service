import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../../webpack.config';

const compiler = webpack(webpackConfig);

export default webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
});
