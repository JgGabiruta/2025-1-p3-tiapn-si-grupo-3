const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Conexão com o MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'empresa'
});

// Testar conexão
connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao MySQL');
  }
});

// Rota GET para listar todos os funcionários
app.get('/funcionario', (req, res) => {
  connection.query('SELECT * FROM funcionario', (err, results) => {
    if (err) {
      res.status(500).send('Erro no banco de dados');
    } else {
      res.json(results);
    }
  });
});

// Rota GET por ID
app.get('/funcionario/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM funcionario WHERE id = ?', [id], (err, results) => {
    if (err || results.length === 0) {
      res.status(404).send('Funcionário não encontrado');
    } else {
      res.json(results[0]);
    }
  });
});

// Rota POST para adicionar funcionário
app.post('/funcionario', (req, res) => {
  const { nome, codigo, cpf, telefone, celular } = req.body;
  const sql = 'INSERT INTO funcionario (nome, codigo, cpf, telefone, celular) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [nome, codigo, cpf, telefone, celular], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao inserir funcionário');
    } else {
      res.status(201).send('Funcionário criado com sucesso');
    }
  });
});

app.put('/funcionario/:id', (req, res) => {
  const id = req.params.id;
  const { nome, codigo, cpf, telefone, celular, departamento } = req.body;
  const sql = 'UPDATE funcionario SET nome = ?, codigo = ?, cpf = ?, telefone = ?, celular = ?, departamento = ? WHERE id = ?';
  connection.query(sql, [nome, codigo, cpf, telefone, celular, departamento, id], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao atualizar funcionário');
    } else {
      res.send('Funcionário atualizado');
    }
  });
});

app.delete('/funcionario/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM funcionario WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao excluir funcionário');
    } else {
      res.send('Funcionário excluído');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
