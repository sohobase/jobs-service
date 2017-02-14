const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    path.join(__dirname, 'src', 'client', 'index.js'),
  ],
  output: {
    path: path.join(__dirname, 'src', 'server', 'static'),
    filename: 'remoto.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('postcss-import')({ addDependencyTo: webpack }),
                  require('postcss-cssnext')({ browsers: ['last 3 versions'] }),
                  require('postcss-reporter')({ clearMessages: true }),
                ],
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('remoto.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false },
    //   mangle: true,
    //   sourcemap: false,
    //   beautify: false,
    //   dead_code: true,
    // }),
  ],
};
