const instagramService = require('../services/instagramService');

exports.getInstagramFeed = async (req, res) => {
  try {
    // Pega os valores do .env
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

   if (!accessToken || !userId) {
      return res.status(500).json({ error: 'Variáveis de ambiente não configuradas' });
    }

    // Chama o serviço com os parâmetros necessários
    const data = await instagramService.getInstagramMedia(accessToken, userId);
    res.json(data);
  } catch (error) {
    console.error("Erro ao obter o feed do Instagram:", error);
    res.status(500).send("Erro ao obter o feed do Instagram");
  }
};
