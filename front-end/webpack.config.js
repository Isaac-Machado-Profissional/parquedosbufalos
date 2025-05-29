const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const PORT = 9000;

const pages = {
  index: './src/javascript/index.js',
  Sobre: './src/javascript/Sobre.js',
  'Mais-Noticias': './src/javascript/Mais-Noticias.js',
  Historia: './src/javascript/Historia.js',
  Noticias: './src/javascript/Noticias.js',
  Transparencia: './src/javascript/Transparencia.js',
  newTemplate: './src/javascript/newTemplate.js',
};

module.exports = {
  entry: pages,

  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    clean: true,
    filename: '[name].[contenthash].js',        // <-- Remove condição especial aqui
    chunkFilename: '[name].[contenthash].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules|video\.min\.js/,
        use: {
          loader: 'babel-loader',
          options: { compact: false },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: false,
    minimizer: ['...', new CssMinimizerPlugin()],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',     // <-- Também remove condição especial aqui
    }),

    ...Object.keys(pages).map((name) => {
      return new HtmlWebpackPlugin({
        template: `./src/html/${name}.html`,
        filename: `${name}.html`,
        chunks: ['commons', name],
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
        },
      });
    }),

    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/assets'), to: 'assets' },
        { from: path.resolve(__dirname, 'src/html/noticias'), to: 'noticias' },
        {
          from: path.resolve(__dirname, 'node_modules/glightbox/dist/css/glightbox.min.css'),
          to: 'vendor/glightbox.min.css',
        },
        {
          from: path.resolve(__dirname, 'node_modules/glightbox/dist/js/glightbox.min.js'),
          to: 'vendor/glightbox.min.js',
        },
      ],
    }),
  ],

  devServer: {
    static: { directory: path.join(__dirname, 'public') },
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    ],
    compress: true,
    port: PORT,
    open: true,
    hot: true,
  },

  mode: 'production',
};
