const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  
  entry: './src/javascript/script.js', // Arquivo de entrada
  output: {
    filename: 'bundle.js', // Nome do bundle gerado
    path: path.resolve(__dirname, 'dist'), // Caminho para a pasta dist
    clean: true, // Limpa o diretório dist antes de cada build
  },
  module: {
    rules: [
      
    {
        test: /\.js$/, // Regras para arquivos JS
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',	
            options: {
                presets: ['@babel/preset-env']
            }
        }
    },

    {
        test: /\.css$/, 
        use: [MiniCssExtractPlugin.loader, 'css-loader']
    },

      {
        test: /\.html$/, // Processar arquivos HTML
        use: ['html-loader'],
      },
    ],
  },


  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Vai catar o index.html 
      filename: 'index.html', // Nome gerado

    }),

    new MiniCssExtractPlugin({
        filename: 'style.css',
    }),

  ],


  devServer: { // Configurações do servidor local
    static: {
      directory: path.join(__dirname, ''), // Diretório q vai catar pra upar p servidor
    },
    compress: true, // Ativar compressão gzip
    port: 9000, // Porta 
    open: true, // Abrir automaticamente o navgg
  },
  mode: 'development', 
};
