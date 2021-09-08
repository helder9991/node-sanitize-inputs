const express = require('express');
require('express-async-errors');

const routes = require('./routes');
const handleErrors = require('./middlewares/handleErrors');
const dbConnection = require('./middlewares/db_connection');

const app = express();

app.use(express.json()); // Utiliza apenas inputs e outputs em JSON
app.use(dbConnection); // Cria coneção com o banco de dados
app.use(routes); // Gerencia as rotas da aplicação
app.use(handleErrors); // Gerencia os erros da aplicação

app.listen(3333, () => console.log("Backend started! 🚀"));