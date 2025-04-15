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
        test: /\.js$/,
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
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css', // Nome do arquivo CSS gerado
    }),
  ],
  devServer: { // Configurações do servidor local
    static: [
      {
        directory: path.join(__dirname, ''), // Diretório que vai ser servido
      },
      {
        directory: path.join(__dirname, 'src'), // Pegar também os arquivos HTML para Hot-Swap
      }
    ],
    proxy: [
      {
        context: ['/api'], // Caminho da requisição a ser redirecionada
        target: 'http://localhost:8080', // Endereço do backend
        changeOrigin: true, // Para alterar o cabeçalho de origem
        secure: false, // Se o backend não usar HTTPS, deixe como false
      },
    ],
    
    compress: true, // Ativar compressão gzip
    port: 9000, // Porta 
    open: true, // Abrir automaticamente o navegador
    hot: true, // Ativa o Hot Module Replacement (HMR)
  },
  mode: 'development',
};
