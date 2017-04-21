const webpack = require('webpack');
const package = require('./package');

const ENV = process.env.NODE_ENV || 'development';

const banner = `${package.name} ${package.version} - ${package.description}\nCopyright (c) ${ new Date().getFullYear() } ${package.author} - ${package.homepage}\nLicense: ${package.license}`;

module.exports = {
  context: __dirname + '/src',
  entry: './lazyload.js',
  output: {
    path: __dirname + '/dist',
    filename: `${package.name}.min.js`,
    library: `lazyload`,
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ],
  devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
  stats: { colors: true },

  devServer: {
    port: process.env.PORT || 3000,
    compress: true,
    quiet: false,
    host: '0.0.0.0',
    publicPath: '/',
    contentBase: './public',
    historyApiFallback: true,
    open: true,
    clientLogLevel: 'none',
    watchOptions: {
      ignored: /node_modules/
    },
    proxy: {
      // '/optional-prefix/**': { // path pattern to rewrite
      //   target: 'http://target-host.com',
      //   pathRewrite: path => path.replace(/^\/[^\/]+\//, '')   // strip first path segment
      // }
      // OPTIONAL: proxy configuration:
      // '/optional-prefix/**': { // path pattern to rewrite
      //   target: 'http://target-host.com',
      //   pathRewrite: path => path.replace(/^\/[^\/]+\//, '')   // strip first path segment
      // }
    }
  }
};
