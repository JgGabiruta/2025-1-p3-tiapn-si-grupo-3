// backend/server.js

const express = require("express");
const cors = require('cors');
const path = require('path');
require('dotenv').config(); 

// Forçando commit do back
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();


app.use(cors()); 
app.use(express.json()); 


app.use('/api/auth', authRoutes); 


app.use('/api', apiRoutes);

/* COMENTANDO PARA HOSPEDAR
app.use(express.static(path.join(__dirname, '..', 'front', 'dist'))); // Assumindo que a pasta do build é 'dist'


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'front', 'dist', 'index.html'));
});*/

// 5. Inicia o servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
