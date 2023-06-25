import express from 'express';
import cors from 'cors';
import Route from './src/routes/routes.js';

const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use(cors({
  origin: '*', // Coloque o endereço do seu aplicativo aqui
  // Outras opções de configuração...
}));

app.use(express.json());
app.use('/', Route);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
