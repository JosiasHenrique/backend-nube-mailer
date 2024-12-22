const express = require("express");
const { getToken } = require("../controllers/nuvemshopController");

const router = express.Router();

// Rota de callback para autenticação
router.get("/callback", getToken);

module.exports = router;
