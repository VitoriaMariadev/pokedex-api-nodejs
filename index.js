import express from 'express';
import cors from 'cors';
import Route from './src/routes/routes.js';

const app = express();
const port = 3000;

app.use(cors({
  origin: '*', // Coloque o endereço do seu aplicativo aqui
  // Outras opções de configuração...
}));

app.use(express.json());
app.use('/', Route);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
