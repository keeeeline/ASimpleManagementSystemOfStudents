const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = (dir) => path.join(__dirname, '..', dir);

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    home: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: resolve('dist'),
  },
  module: {
        rules: [
          {
            test: /\.js|jsx$/,
            include: resolve('src'),
        use: {
          loader: 'babel-loader',
        }
      },
{
        test: /\.css$/,
        loader: "style-loader!css-loader?modules"
      },
  ]
  },
  devServer: { 
    host: 'localhost', 
    port: 8088, 
    open: true, 
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve('/dist/index.html'), 
      template: resolve("/index.html"),
    }),
  ]
}