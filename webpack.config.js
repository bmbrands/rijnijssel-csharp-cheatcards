const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => ({
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    publicPath: argv.mode === 'production' ? './' : '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(mp4|webm|ogg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.vtt$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(md|cs)$/i,
        type: 'asset/source',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'C# Onderwerpen',
      inject: true,
      scriptLoading: 'defer',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public/manifest.webmanifest', to: 'manifest.webmanifest' },
        { from: 'public/sw.js', to: 'sw.js' },
        { from: 'public/icons', to: 'icons' },
      ],
    }),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    static: false,
  },
});
