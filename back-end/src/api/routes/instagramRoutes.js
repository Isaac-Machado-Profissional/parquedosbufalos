// Rota para o feed do Instagram
const express = require('express');
const router = express.Router();
const instagramController = require('../controllers/instagramController');

// Rota para obter o feed do Instagram
router.get('/instagram-feed', instagramController.getInstagramFeed); // Certifique-se de que a rota seja '/instagram-feed'

module.exports = router;
