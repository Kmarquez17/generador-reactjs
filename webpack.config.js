const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtract = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const basePath = __dirname;
const distPath = 'dist';
const indextInput = 'index.html';
const indexOutput = 'index.html';

const webpackInitConfig = {
  mode: 'production',
  devtool: 'none',
  resolve: {
    extensions: ['.js'],
  },
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.join(basePath, distPath),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css/,
        include: /node_modules/,
        use: [
          MiniCSSExtract.loader,
          { loader: 'css-loader' },
        ],
      },
      
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // outputPath: 'images/',
              // publicPath: 'images/',
              limit: 10000,
              fallback: 'file-loader',
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: indexOutput,
      template: indextInput,
    }),
    new MiniCSSExtract({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
    }),
    new OptimizeCssAssetsPlugin(),
    new UglifyJsPlugin(),
    new CleanWebpackPlugin()
  ],
};
module.exports = webpackInitConfig;