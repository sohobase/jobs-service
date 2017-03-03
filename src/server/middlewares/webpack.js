import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../../../webpack.config';
import C from '../../shared/constants';

const { DEVELOPMENT } = C.ENV;
const { NODE_ENV } = process.env;

export const compiler = webpack(webpackConfig);

export default webpackDevMiddleware(compiler, {
  hot: NODE_ENV === DEVELOPMENT,
  filename: 'bundle.js',
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true },
  historyApiFallback: true,
});
