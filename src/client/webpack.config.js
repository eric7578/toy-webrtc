const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'app.js')
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    publicPath: '/assets/',
    filename: '[name].js'
  },
  devServer: {
    contentBase: __dirname
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
