const express = require("express");
const db = require('./../db/db');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const teste = require("./routes")
app.use(teste)

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));