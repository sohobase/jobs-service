import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../../../webpack.config';

const compiler = webpack(webpackConfig);
const isDevelop = process.env.NODE_ENV !== 'production';

export default webpackDevMiddleware(compiler, {
  hot: isDevelop,
  filename: 'bundle.js',
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true },
  historyApiFallback: true,
});
