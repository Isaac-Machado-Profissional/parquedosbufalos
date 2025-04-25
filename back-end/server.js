require('dotenv').config(); // Carrega as variáveis do .env

const express = require('express');
const app = express();
const instagramRoutes = require('./src/api/routes/instagramRoutes');

app.use(express.json());

// Usa o router definido em routes/instagramRoutes.js
app.use('/api', instagramRoutes);

const porta = process.env.PORT || 8080;
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
