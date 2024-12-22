const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const nvemshopRoute = require('./routes/nuvemshopRoute');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


app.use('/nuvemshop', nvemshopRoute);

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('Bem-vindo ao Nube Mailer!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});