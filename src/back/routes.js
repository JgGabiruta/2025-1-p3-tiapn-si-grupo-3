const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db/db'); // pool mysql2/promise apontando para o seu banco

// ------------------------------
// Função genérica para GET em cada tabela
// ------------------------------
function criarRotaParaTabela(nomeTabela) {
  router.get(`/${nomeTabela}`, async (req, res) => {
    try {
      const [rows] = await db.query(`SELECT * FROM \`${nomeTabela}\``);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: `Erro ao buscar dados da tabela ${nomeTabela}` });
    }
  });
}

// ------------------------------
// Rota personalizada de JOIN: EmprestimoFuncionario
// ------------------------------
function EmprestimoFuncionario() {
  router.get('/EmprestimoFuncionario', async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT F.Nome, F.Departamento_Codigo, E.Data_Retirada, E.Data_Devolucao
        FROM Funcionario AS F
        INNER JOIN Emprestimo AS E
          ON F.Codigo = E.Operario_Funcionario_Codigo
      `);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar dados de EmprestimoFuncionario' });
    }
  });
}

// ------------------------------
// Rotas de Cadastro (POST)
// ------------------------------

// 1) Cadastro de Administrador
// Ajuste na rota de cadastro de Administrador para receber funcionario_codigo
router.post('/administrador', async (req, res) => {
  // Agora esperamos 3 campos no body: email, senha e funcionario_codigo
  const { email, senha, funcionario_codigo } = req.body;
  if (!email || !senha || !funcionario_codigo) {
    return res
      .status(400)
      .json({ error: 'email, senha e funcionario_codigo são obrigatórios.' });
  }

  try {
    // Insere na tabela Administrador TENDO a FK funcionario_codigo disponível
    const [result] = await db.query(
      'INSERT INTO Administrador (email, senha, Funcionario_Codigo) VALUES (?, ?, ?)',
      [email, senha, funcionario_codigo]
    );
    res
      .status(201)
      .json({ message: 'Administrador cadastrado com sucesso.', id: result.insertId });
  } catch (err) {
    console.error('Erro ao cadastrar administrador:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res
        .status(409)
        .json({ error: 'Já existe um administrador com este e-mail ou funcionário.' });
    }
    res.status(500).json({ error: 'Erro interno ao cadastrar administrador.' });
  }
});


// 2) Cadastro de Funcionário
router.post('/funcionario', async (req, res) => {
  const {
    nome,
    cargo,
    telefone,
    data_nascimento,
    rua,
    numero,
    cidade
  } = req.body;

  // Retirei email e senha daqui, pois a tabela Funcionario não as possui
  if (!nome || !cargo || !telefone || !data_nascimento || !rua || !numero || !cidade) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    // INSIRA NA TABELA Funcionario APENAS OS CAMPOS EXISTENTES:
    const [result] = await db.query(
      `INSERT INTO Funcionario
        (nome, cargo, telefone, data_nascimento, rua, numero, cidade)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        nome,
        cargo,
        telefone,
        data_nascimento, // formato YYYY-MM-DD esperado pelo tipo DATE
        rua,
        numero,
        cidade
      ]
    );
    res.status(201).json({ message: 'Funcionário cadastrado com sucesso.', id: result.insertId });
  } catch (err) {
    console.error('Erro ao cadastrar funcionário:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      // Pode ajustar a mensagem ou a lógica caso você tenha alguma coluna UNIQUE na tabela Funcionario
      return res.status(409).json({ error: 'Erro de duplicação no cadastro de funcionário.' });
    }
    res.status(500).json({ error: 'Erro interno ao cadastrar funcionário.' });
  }
});

// ------------------------------
// Rota de Login (POST)
// ------------------------------
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  try {
    // 1) Buscar na tabela Administrador, fazendo JOIN com Funcionario para capturar o nome
    const [admRows] = await db.query(
      `
      SELECT
        a.Funcionario_Codigo AS administrador_id,
        a.Email              AS administrador_email,
        a.Senha              AS administrador_hash,
        f.Nome               AS funcionario_nome
      FROM Administrador AS a
      JOIN Funcionario   AS f
        ON f.Codigo = a.Funcionario_Codigo
      WHERE a.Email = ?
      `,
      [email]
    );

    if (admRows.length > 0) {
      const admin = admRows[0];
      // Aqui comparamos a senha em texto (senha) com o hash armazenado (administrador_hash)
      //const match = await bcrypt.compare(senha, admin.administrador_hash);
      if (senha === admin.administrador_hash) {
        // Retorna o objeto user com o nome vindo de Funcionario.Nome
        return res.json({
          message: 'Login de administrador bem-sucedido.',
          user: {
            id:   admin.administrador_id,     // usa o alias correto
            nome: admin.funcionario_nome,
            email: admin.administrador_email,
            tipo: 'administrador'
          }
        });
      } else {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }
    }

    // 2) Se não encontrar em Administrador, retorna “Usuário não encontrado.”
    return res.status(404).json({ error: 'Usuário não encontrado.' });
  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});


// ------------------------------
// Rotas GET automáticas para todas as tabelas listadas
// ------------------------------
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
tabelas.forEach(criarRotaParaTabela);

// Rota personalizada
EmprestimoFuncionario();

module.exports = router;
