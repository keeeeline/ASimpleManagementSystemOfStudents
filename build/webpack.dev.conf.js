const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // ����htmlģ��
const resolve = (dir) => path.join(__dirname, '..', dir);

module.exports = {
  mode: 'development', // webpack4�������ԣ�Ĭ�Ϸ���production,�ṩһЩĬ�����ã�����cache:true
  devtool: 'cheap-module-eval-source-map',
  // source-mapÿ��module���ɶ�Ӧ��map�ļ�
  // eval ÿһ��moduleģ��ִ��eval��������map�ļ�����β������һ��sourceURL��Ӧǰ���ϵ�����Ը���
  // cheap ����Ϣ VLQ����
  // module ������ģ��֮���sourcemap
  entry: {
    home: './src/index.js', // ��������ļ�
  },
  output: {
    filename: '[name].js', // ���ɵ�js�ļ�������
    path: resolve('dist'), // ���ɵ�js���Ŀ¼
  },
  module: { // ����loader
    rules: [
      {
        test: /\.js|jsx$/,
        include: resolve('src'), // ֻ����src������ļ�,���Ƽ���exclude
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
      filename: resolve('/dist/index.html'), // ���ɵ�html�ļ���ŵĵ�ַ���ļ���
      template: resolve("/index.html"), // ����index.htmlģ���������html�ļ�
    }),
  ]
}