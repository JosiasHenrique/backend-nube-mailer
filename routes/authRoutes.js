const express = require('express');
const { redirectToAuth, handleAuthCallback } = require('../controllers/authController');

const router = express.Router();

// Rota para redirecionar para a página de autorização da Nuvemshop
router.get('/nuvemshop', redirectToAuth);

// Rota para receber o código de autorização e trocar por um token de acesso
router.get('/nuvemshop/callback', handleAuthCallback);

module.exports = router;
