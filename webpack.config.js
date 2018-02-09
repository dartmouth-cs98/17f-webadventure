const path = require('path');

module.exports = {
  entry: {
    inject: './src/injectScripts/inject.js',
    injectLobby: './src/injectScripts/injectLobby.js',
    injectEnd: './src/injectScripts/injectEnd.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
