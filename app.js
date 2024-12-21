const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Usar as rotas de autenticação
app.use('/auth', authRoutes);

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('Bem-vindo ao Nube Mailer!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
