const axios = require('axios');
const querystring = require('querystring');
const dotenv = require('dotenv');

dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

// Redirecionar para a página de autorização da Nuvemshop
const redirectToAuth = (req, res) => {
  const scope = 'read_write'; // Escopo desejado para sua aplicação
  
  const authUrl = `https://app.nuvemshop.com.br/admin/oauth/authorize?${querystring.stringify({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: scope,
  })}`;

  res.redirect(authUrl); // Redireciona o usuário para autorizar
};

// Receber o código de autorização e trocar por um token de acesso
const handleAuthCallback = async (req, res) => {
  const { code } = req.query; // O código de autorização recebido na URL

  if (!code) {
    return res.status(400).json({ message: 'Code parameter missing' });
  }

  try {
    const response = await axios.post('https://api.nuvemshop.com.br/v1/oauth/token', {
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    });

    const { access_token, store } = response.data; // O access token e dados da loja

    // Aqui você pode salvar o access token no banco de dados ou na sessão
    res.status(200).json({
      message: 'Authorization successful',
      access_token,
      store,
    });

  } catch (error) {
    console.error('Error exchanging code for access token:', error);
    res.status(500).json({ message: 'Error during authentication' });
  }
};

module.exports = { redirectToAuth, handleAuthCallback };
