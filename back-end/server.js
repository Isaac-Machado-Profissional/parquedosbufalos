require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();


// Middleware onde tive dificuldades em puxar a API do Facebook/Instagram, junto ao Meta For Developers...
// https://developers.facebook.com/


// Rota para tratar o callback do OAuth (onde o código de autorização é enviado)
app.get('/callback', async (req, res) => {
  const { code } = req.query; // O código de autenticação que o Facebook/Instagram envia
  console.log('Código recebido:', code); // Adicione isso para verificar
  if (!code) {
    return res.status(400).send('Código de autorização ausente.');
  }

  try {
    // Trocar o código de autorização por um token de acesso
    const response = await axios.get('https://graph.facebook.com/v18.0/oauth/access_token', {
      params: {
        client_id: 'xxxxxxClientID',  // Substitua pelo seu client_id
        client_secret: 'SegredoLaDoAppQuandoClicaNoNegocioDeShowSecretoAppLa', // Substitua pelo seu client_secret
        redirect_uri: 'http://localhost:8080/callback', // O redirect_uri que você usou no Facebook
        code: code  // O código que foi enviado pelo Facebook/Instagram
      }
    });

    const { access_token } = response.data;
    console.log('Token de acesso:', access_token); // Verifique o token recebido
    res.send(`Token de acesso recebido: ${access_token}`);
    
  } catch (error) {
    // Log mais detalhado do erro
    console.error('Erro ao trocar o código por token:', error.response ? error.response.data : error.message);
    res.status(500).send(`Erro ao trocar o código por token: ${error.response ? error.response.data : error.message}`);
  }
});

const porta = process.env.PORTA || 8080; // Definindo a porta do servidor

// Inicia o servidor na porta configurada
app.listen(porta, () => {
  console.log('Servidor Back-End rodando na porta: ' + porta + '!');
});