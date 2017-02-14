import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../../../webpack.config';
import C from '../../shared/constants';

const isDevelop = process.env.NODE_ENV === C.environment.development;
export const compiler = webpack(webpackConfig);

export default webpackDevMiddleware(compiler, {
  hot: isDevelop,
  filename: 'bundle.js',
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true },
  historyApiFallback: true,
});
