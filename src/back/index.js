const express = require("express");
const db = require('./../db/db');
const cors = require('cors');

const app = express();
const path = require('path');


app.use('/Tela-Home', express.static(path.join(__dirname, 'src', 'Tela-Home')));


app.use(cors());
app.use(express.json());

const teste = require("./routes")
app.use(teste)

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));