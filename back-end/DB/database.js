//Puxa o cliente mysql2
const mysql = require('mysql2');

//Cria a conexão
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234=abcd',
  database: 'parquedosbufalos',
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    process.exit(1);
  }
  console.log('Conectado ao MySQL com sucesso!');
});

connection.query(
  'SELECT * FROM usuarios_login WHERE NOME_USUARIO = "wallacedi"',
  function (err, results, fields) {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return;
    }
    console.log('Resultados:', results); // Exibe as linhas retornadas pelo servidor
    console.log('Campos:', fields); // Exibe metadados sobre os resultados
  }
);