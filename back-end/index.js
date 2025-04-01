const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const app = express(); // Criando a instância do Express

// SETANDO VARIÁVEIS DA APLICAÇÃO
app.set('port', process.env.PORT || config.get('server.port'));

// MIDDLEWARES
app.use(bodyParser.json());

// Rota para tratar o callback do OAuth (exemplo para Facebook/Instagram)
app.get('/callback', (req, res) => {
    const { code } = req.query; // O código de autenticação que o Facebook/Instagram envia

    if (!code) {
        return res.status(400).send('Código de autorização ausente.');
    }

    // Exemplo de resposta:
    res.send(`Código de autorização recebido: ${code}`);
});

// Exportando o app para ser usado em outros arquivos
module.exports = app;



