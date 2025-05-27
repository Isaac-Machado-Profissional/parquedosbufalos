require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const ENV_PATH = path.resolve(__dirname, '../../../.env');
const ENV_VAR = 'INSTAGRAM_ACCESS_TOKEN';
const ENV_REFRESH_DATE_VAR = 'INSTAGRAM_TOKEN_REFRESH_DATE';
const ENV_EXPIRES_IN_VAR = 'INSTAGRAM_TOKEN_EXPIRES_IN';

/**
 * Faz o refresh do token do Instagram Basic Display API
 * e atualiza o .env com o novo token, data e validade.
 */
async function refreshInstagramToken() {
  const oldToken = process.env[ENV_VAR];
  if (!oldToken) {
    throw new Error(`Variável ${ENV_VAR} não encontrada no .env`);
  }

  // Faz o refresh do token
  const url = 'https://graph.instagram.com/refresh_access_token';
  const resp = await axios.get(url, {
    params: {
      grant_type: 'ig_refresh_token',
      access_token: oldToken,
    },
  });

  if (!resp.data.access_token) {
    throw new Error(`Resposta inesperada do Instagram: ${JSON.stringify(resp.data)}`);
  }

  const { access_token, expires_in } = resp.data;
  const nowISOString = new Date().toISOString();

  console.log(`🔄 Novo token obtido, expira em ${Math.floor(expires_in / 86400)} dias`);

  // Atualiza ou adiciona as variáveis no .env
  let envContents = fs.readFileSync(ENV_PATH, 'utf8');

  function replaceOrAdd(key, value) {
    const regex = new RegExp(`^${key}=.*`, 'm');
    if (regex.test(envContents)) {
      envContents = envContents.replace(regex, `${key}=${value}`);
    } else {
      envContents += `\n${key}=${value}`;
    }
  }

  replaceOrAdd(ENV_VAR, access_token);
  replaceOrAdd(ENV_REFRESH_DATE_VAR, nowISOString);
  replaceOrAdd(ENV_EXPIRES_IN_VAR, expires_in);

  fs.writeFileSync(ENV_PATH, envContents, 'utf8');
  console.log('✅ .env atualizado com token, data de refresh e validade');

  return { access_token, expires_in };
}

module.exports = { refreshInstagramToken };
