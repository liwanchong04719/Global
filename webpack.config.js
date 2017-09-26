const path = require('path');
const utils = require('./build/utils');
const webpack = require('webpack');
const config = require('./config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./build/webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap }),
    unknownContextCritical: false,
    unknownContextRegExp: /^.\/.*$/,
  },
  output: {
    path: config.dev.assetsRoot,
    publicPath: 'assets', // webpack-dev-server的hmr需要指定一个代理目录
  },
  // cheap-module-eval-source-map is faster for development
  devtool: 'eval-source-map',
  devServer: {
    contentBase: config.dev.assetsRoot,
    port: config.dev.port,
    historyApiFallback: true, // 不跳转
    inline: true, // 实时刷新
    hot: true, // 热加载
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.dev.index || 'index.html',
      template: 'index.html',
      inject: true,
    }),
    new FriendlyErrorsPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*'],
      },
    ]),
  ],
  externals: {
    fs: true,
  },
});
