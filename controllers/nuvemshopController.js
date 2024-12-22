const axios = require("axios");

const getToken = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Código de autorização ausente." });
  }

  try {
    // Troca o código de autorização por um token de acesso
    const response = await axios.post("https://www.nuvemshop.com.br/apps/authorize/token", {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.REDIRECT_URI,
    });

    const { access_token, user_id } = response.data;

    console.log("Token de acesso:", access_token);
    console.log("ID da loja:", user_id);

    res.json({ message: "Autenticação bem-sucedida!", access_token, user_id });
  } catch (error) {
    console.error("Erro ao obter o token:", error.response?.data || error.message);
    res.status(500).json({ error: "Erro ao obter o token." });
  }
};

module.exports = { getToken };
