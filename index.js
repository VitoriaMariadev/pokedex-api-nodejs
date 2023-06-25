import express from 'express';
import cors from 'cors';
import Route from './src/routes/routes.js';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv"

dotenv.config()

const app = express();
const port = 3000;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    next();
  });
app.use(cors())

app.use(cookieParser())
app.use(express.json());
app.use('/', Route);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
