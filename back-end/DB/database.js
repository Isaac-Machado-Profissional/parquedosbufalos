require('dotenv').config(); // Carrega as variáveis do .env
const mysql = require('mysql2');

//==========================================================================================================
// Cria a conexão com o banco de dados
//==========================================================================================================

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

//==========================================================================================================
// Testa a conexão
//==========================================================================================================

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    process.exit(1);
  }
  console.log('Conectado ao MySQL com sucesso!');
});

module.exports = connection;