const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/app.js')
  },
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: '/assets/',
    filename: '[name].js'
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
