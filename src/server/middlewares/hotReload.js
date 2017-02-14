import webpackHotMiddleware from 'webpack-hot-middleware';
import { compiler } from './webpack';

export default webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
});
