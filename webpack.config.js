const path = require('path');

const b = 'babel-polyfill';

module.exports = {
  entry: {
    inject: [b, './src/injectScripts/inject.js'],
    injectLobby: [b, './src/injectScripts/injectLobby.js'],
    injectEnd: [b, './src/injectScripts/injectEnd.js'],
    background: [b, './src/background.js'],
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
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader',
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader?mimetype=image/jpg',
      },
      {
        test: /\.svg$/,
        loader: 'svg-loader?pngScale=2',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
};
