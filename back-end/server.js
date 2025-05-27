require('dotenv').config(); // Carrega as variáveis do .env
const express = require('express');
const app = express();
const cron = require('node-cron');
const instagramRoutes = require('./src/api/routes/instagramRoutes');
const { refreshInstagramToken } = require('./src/api/services/refreshInstagramToken');

app.use(express.json());

// Usa o router definido em routes/instagramRoutes.js
app.use('/api', instagramRoutes);

const porta = process.env.PORT || 8080;

function printTokenValidity() {
  const lastRefresh = process.env.INSTAGRAM_TOKEN_REFRESH_DATE;
  const expiresIn = Number(process.env.INSTAGRAM_TOKEN_EXPIRES_IN);
  if (!lastRefresh || !expiresIn) {
    console.log('⚠️ Dados de validade do token não encontrados.');
    return;
  }

  const lastDate = new Date(lastRefresh);
  const now = new Date();
  const expireAt = new Date(lastDate.getTime() + expiresIn * 1000);
  const diffMs = expireAt - now;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    console.log(`⏳ Tempo restante do token atual: ${diffDays} dias`);
    if (diffDays <= 15) {
      console.warn(`🚨 ALERTA: Token expira em ${diffDays} dias! Revalidação pode ser necessária em breve.`);
    }
  } else {
    console.warn('❌ ALERTA: Token atual já expirou ou está muito próximo da expiração!');
  }
}

async function job() {
  console.log(`[${new Date().toLocaleString()}] 🔄 Iniciando refresh do token…`);
  try {
    await refreshInstagramToken(); // supondo que esse service lê e grava o .env internamente
    console.log('✅ Token renovado com sucesso');
  } catch (err) {
    console.error('❌ Falha ao renovar token:', err.message);
  }
}

// Agenda para TODO dia 1 do mês à meia-noite (horário de SP)
cron.schedule('0 0 1 * *', job, {
  timezone: 'America/Sao_Paulo',
});

console.log('⏳ Agendamento ativado: Refresh mensal(todo dia 1) do token com node-cron.');

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});

printTokenValidity(); // Exibe a validade do Token Atual ao iniciar o servidor