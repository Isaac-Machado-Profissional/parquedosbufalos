const fetch = require('node-fetch');

const getInstagramMedia = async (accessToken, userId) => {
    const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

module.exports = { getInstagramMedia };
