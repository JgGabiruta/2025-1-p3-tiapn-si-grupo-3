const express = require("express");
const db = require('./../db/db');
const cors = require('cors');
const routes = require('./routes')
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '..', 'front')));

app.use(routes);
app.use(cors());
app.use(express.json());


// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));