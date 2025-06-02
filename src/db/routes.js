const express = require('express');
const router = express.Router();
const db = require('./db'); // certifique-se de que esse arquivo exporta sua conexão com o MySQL

// Função genérica para criar rotas GET de cada tabela
function criarRotaParaTabela(nomeTabela) {
  router.get(`/${nomeTabela.toLowerCase()}`, async (req, res) => {
    try {
      const [rows] = await db.query(`SELECT * FROM ${nomeTabela}`);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: `Erro ao buscar dados da tabela ${nomeTabela}` });
    }
  });
}

// Lista de tabelas
const tabelas = [
  'Departamento',
  'Funcionario',
  'Administrador',
  'Operario',
  'Evento',
  'Lembrete',
  'Compra',
  'Material',
  'Compra_Material',
  'Ferramenta',
  'Emprestimo',
  'Emprestimo_Ferramenta'
];

// Cria as rotas automaticamente
tabelas.forEach(criarRotaParaTabela);

module.exports = router;
