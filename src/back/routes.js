const express = require('express');
const router = express.Router();
const db = require('../db/db'); // certifique-se de que esse arquivo exporta sua conexão com o MySQL
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const JWT_SECRET = 'MINHA_CHAVE_SUPER_SECRETA';
const FRONTEND_URL = 'http://localhost:3000';
const MAIL_USER = 'jg.gabiruta@yahoo.com';
const MAIL_PASS = 'cpbmgxniplmaoafb';

// Função genérica para criar rotas GET de cada tabela
function criarRotaParaTabela(nomeTabela) {
  router.get(`/${nomeTabela}`, async (req, res) => {

    try {
      const [rows] = await db.query(`SELECT * FROM ${nomeTabela}`);
      res.json(rows);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: `Erro ao buscar dados da tabela ${nomeTabela}` });
    }
  });
}

function EmprestimoFuncionario() {

  router.get(`/EmprestimoFuncionario`, async (req, res) => {

    try {

      const [rows] = await db.query(`SELECT Funcionario.Nome, Departamento.nome, Emprestimo.Data_Retirada, Emprestimo.Data_Devolucao, Emprestimo_Ferramenta.Codigo_Ferramenta, Emprestimo.Codigo FROM Funcionario inner join Emprestimo on Funcionario.Codigo = Emprestimo.Operario_Funcionario_Codigo inner join Departamento on Funcionario.Departamento_Codigo = Departamento.Codigo inner join Emprestimo_Ferramenta on Emprestimo.Codigo = Emprestimo_Ferramenta.Emprestimo_Codigo`);
      res.json(rows);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: `Erro ao buscar dados da tabela ` });
    }
  });
}

function deletaEmprestimo() {

  router.delete(`/emprestimo/delete/:id`, async (req, res) => {

    let aux = req.params.id.split(":");

    let id = aux[1];

    try {

      const [rows] = await db.query(`DELETE FROM Emprestimo WHERE codigo = ${id}`);
      res.json(rows);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: `Erro ao buscar dados da tabela ` });
    }
  })
}

function EmprestimoAtrasado() {

  router.get(`/EmprestimoAtrasado`, async (req, res) => {

    try {

      const [rows] = await db.query(`SELECT Funcionario.Nome, Ferramenta.nome, Emprestimo_Ferramenta.Codigo_Ferramenta, Emprestimo.Data_Devolucao FROM Emprestimo inner join Funcionario on Emprestimo.Operario_Funcionario_Codigo = Funcionario.Codigo inner join Ferramenta inner join Emprestimo_Ferramenta on Emprestimo_Ferramenta.Codigo_Ferramenta = Ferramenta.Codigo`);
      res.json(rows);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: `Erro ao buscar dados da tabela ` });
    }
  });
}

function insereEmprestimo() {

  router.post('/Emprestimo', async (req, res) => {

    let codigo_func = req.body.codigo_func;
    let codigo_ferr = req.body.codigo_ferr;
    let quantidade = req.body.quantidade;
    let data_dev = req.body.data_dev;
    let data_ret = req.body.data_ret;
    let desc = req.body.desc;
    let codigo_emp = req.body.codigo_emp;

    try {

      const [result] = await db.query(`INSERT INTO Emprestimo (Codigo, Descricao, Data_Retirada, Data_Devolucao, Operario_Funcionario_Codigo) VALUES (?,?,?,?,?)`, [codigo_emp, desc, data_ret, data_dev, codigo_func]);

      const [result2] = await db.query(`INSERT INTO Emprestimo_Ferramenta (Codigo_Ferramenta, Emprestimo_Codigo) VALUES (?,?)`, [codigo_ferr, codigo_emp]);

    } catch (err) {
      console.error("Erro ao inserir ferramenta:", err);
      res.status(500).json({ error: 'Erro ao cadastrar a ferramenta.' });
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

EmprestimoFuncionario();
EmprestimoAtrasado()
deletaEmprestimo();
insereEmprestimo()

router.post('/Ferramenta', async (req, res) => {
  // Extrai os dados do corpo da requisição
  const { nome, tipo, quantidade, localizacao } = req.body;

  // Validação simples
  if (!nome || !tipo || !quantidade || !localizacao) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const query = 'INSERT INTO Ferramenta (nome, Tipo, Quantidade, Localizacao) VALUES (?, ?, ?, ?)';
    // No seu schema do DB, o nome da coluna é 'Localização'? Se for, ajuste abaixo.
    // Estou assumindo que seja 'Localizacao' sem o 'ç' e 'ã' para compatibilidade.
    const [result] = await db.query(query, [nome, tipo, quantidade, localizacao]);

    // Retorna o novo item criado com seu ID
    res.status(201).json({
      id: result.insertId,
      nome,
      tipo,
      quantidade,
      localizacao
    });

  } catch (err) {
    console.error("Erro ao inserir ferramenta:", err);
    res.status(500).json({ error: 'Erro ao cadastrar a ferramenta.' });
  }
});


// ROTA PARA ATUALIZAR (PUT) UMA FERRAMENTA EXISTENTE
router.put('/Ferramenta/:id', async (req, res) => {
  const { id } = req.params; // Pega o ID da URL
  const { nome, tipo, quantidade, localizacao } = req.body;

  // Validação
  if (!nome || !tipo || !quantidade || !localizacao) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const query = 'UPDATE Ferramenta SET nome = ?, Tipo = ?, Quantidade = ?, Localizacao = ? WHERE Codigo = ?';
    const [result] = await db.query(query, [nome, tipo, quantidade, localizacao, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ferramenta não encontrada.' });
    }

    res.json({ message: 'Ferramenta atualizada com sucesso.' });

  } catch (err) {
    console.error("Erro ao atualizar ferramenta:", err);
    res.status(500).json({ error: 'Erro ao atualizar a ferramenta.' });
  }
});


// (Opcional) ROTA PARA DELETAR (DELETE) UMA FERRAMENTA
router.delete('/Ferramenta/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM Ferramenta WHERE Codigo = ?';
    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ferramenta não encontrada.' });
    }

    res.status(200).json({ message: 'Ferramenta deletada com sucesso.' });

  } catch (err) {
    console.error("Erro ao deletar ferramenta:", err);
    res.status(500).json({ error: 'Erro ao deletar a ferramenta.' });
  }
});

// Rotas para Lembrete

// GET /Lembrete
router.get('/Lembrete', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT Codigo, Observacao FROM Lembrete ORDER BY Codigo DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar lembretes' });
  }
});



function Rotas() {
  // POST /Lembrete
  router.post('/Lembrete', async (req, res) => {
    const { observacao, administrador_codigo } = req.body;

    console.log(req.body);

    if (!observacao || !administrador_codigo) {
      return res.status(400).json({ error: 'Os campos observacao e administrador_codigo são obrigatórios.' });
    }

    try {
      const [result] = await db.query(
        `INSERT INTO Lembrete (Observacao, Administrador_Funcionario_Codigo) VALUES (?, ?)`,
        [observacao, administrador_codigo]
      );
      res.status(201).json({ Codigo: result.insertId, Observacao: observacao });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao inserir lembrete', detalhes: err.sqlMessage });
    }

  });
}

Rotas();

// DELETE /Lembrete/:id
router.delete('/Lembrete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM Lembrete WHERE Codigo = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Lembrete não encontrado.' });
    }
    res.status(200).json({ message: 'Lembrete deletado com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar lembrete' });
  }
});

// -------------------------------------------------
// Rota de cadastro de Administrador
// -------------------------------------------------
router.post('/administrador', async (req, res) => {
  const { email, senha, funcionario_codigo } = req.body;
  if (!email || !senha || !funcionario_codigo) {
    return res.status(400).json({ error: 'email, senha e funcionario_codigo são obrigatórios.' });
  }

  try {
    // Gera hash da senha antes de salvar
    const senhaHash = await bcrypt.hash(senha, 10);

    const [result] = await db.query(
      'INSERT INTO Administrador (Email, Senha, Funcionario_Codigo) VALUES (?, ?, ?)',
      [email, senhaHash, funcionario_codigo]
    );
    return res
      .status(201)
      .json({ message: 'Administrador cadastrado com sucesso.', id: result.insertId });
  } catch (err) {
    console.error('Erro ao cadastrar administrador:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Já existe um administrador com este e-mail.' });
    }
    return res.status(500).json({ error: 'Erro interno ao cadastrar administrador.' });
  }
});

// -------------------------------------------------
// Rota de cadastro de Funcionário
// -------------------------------------------------

router.post('/funcionario', async (req, res) => {
  let {
    Cargo,
    Nome,
    Telefone,
    Data_Nascimento,
    Rua,
    Numero,
    Cidade,
    CPF,
    Departamento_Codigo
  } = req.body;

  // Validação dos campos obrigatórios
  if (!Nome || !Cargo || !CPF) {
    return res.status(400).json({ error: 'Campos Nome, Cargo e CPF são obrigatórios.' });
  }

  let dataFormatada = null;
  if (Data_Nascimento) {
    dataFormatada = Data_Nascimento.split('T')[0]; 
  }

  try {
    const [result] = await db.query(
      `INSERT INTO Funcionario
         (Cargo, Nome, Telefone, Data_Nascimento, Rua, Numero, Cidade, CPF, Departamento_Codigo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      
      [
        Cargo,
        Nome,
        Telefone || null,
        dataFormatada,
        Rua || null,
        Numero || null,
        Cidade || null,
        CPF,
        Departamento_Codigo || null
      ]
    );
    return res
      .status(201)
      .json({ message: 'Funcionário cadastrado com sucesso.', id: result.insertId });
  } catch (err) {
    console.error('Erro ao cadastrar funcionário:', err);

    
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ error: 'O Departamento informado não existe.' });
    }
    
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Este CPF ou outro campo único já está cadastrado.' });
    }

    return res.status(500).json({ error: 'Erro interno ao cadastrar funcionário.' });
  }
});


// -------------------------------------------------
// Rota de abrir Funcionário ESPECIFICO
// -------------------------------------------------

router.get('/funcionario/:codigo', async (req, res) => {
  const { codigo } = req.params;

  try {
    
    const [rows] = await db.query('SELECT * FROM Funcionario WHERE Codigo = ?', [codigo]);

   
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Funcionário não encontrado.' });
    }

   
    res.json(rows[0]);

  } catch (err) {
    console.error('Erro ao buscar funcionário:', err);
    res.status(500).json({ error: 'Erro interno ao buscar dados do funcionário.' });
  }
});

// -------------------------------------------------
// Rota de EXCLUSÃO de Funcionário
// -------------------------------------------------

router.delete('/funcionario/:codigo', async (req, res) => {
  const { codigo } = req.params;

  try {
    
    const [result] = await db.query('DELETE FROM Funcionario WHERE Codigo = ?', [codigo]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Funcionário não encontrado para exclusão.' });
    }

    res.status(200).json({ message: 'Funcionário excluído com sucesso.' });

  } catch (err) {
    console.error('Erro ao excluir funcionário:', err);
    
    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(400).json({ error: 'Este funcionário não pode ser excluído pois possui registros associados a ele (como empréstimos ou logins).' });
    }
    
    res.status(500).json({ error: 'Erro interno ao excluir o funcionário.' });
  }
});

// -------------------------------------------------
// Rota de Editar de Funcionário
// -------------------------------------------------

router.put('/funcionario/:codigo', async (req, res) => {
  const { codigo } = req.params; // Pega o código da URL

  const {
    Cargo,
    Nome,
    Telefone,
    Data_Nascimento,
    Rua,
    Numero,
    Cidade,
    CPF,
    Departamento_Codigo
  } = req.body;

  if (!Nome || !Cargo || !CPF) {
    return res.status(400).json({ error: 'Campos Nome, Cargo e CPF são obrigatórios.' });
  }

  try {
    
    const sql = `
      UPDATE Funcionario
      SET
        Cargo = ?, Nome = ?, Telefone = ?, Data_Nascimento = ?,
        Rua = ?, Numero = ?, Cidade = ?, CPF = ?, Departamento_Codigo = ?
      WHERE
        Codigo = ?
    `;

   
    const [result] = await db.query(sql, [
      Cargo, Nome, Telefone, Data_Nascimento, Rua, Numero,
      Cidade, CPF, Departamento_Codigo, codigo
    ]);

    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Funcionário não encontrado para atualização.' });
    }

  
    res.json({ message: 'Funcionário atualizado com sucesso.' });

  } catch (err) {
    console.error('Erro ao atualizar funcionário:', err);

    
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Este CPF já pertence a outro funcionário.' });
    }
    
    res.status(500).json({ error: 'Erro interno ao atualizar o funcionário.' });
  }
});




// -------------------------------------------------
// Rota de Login (POST /login)
// -------------------------------------------------
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  try {
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
      const match = await bcrypt.compare(senha, admin.administrador_hash);
      if (match) {
        return res.json({
          message: 'Login de administrador bem-sucedido.',
          user: {
            id: admin.administrador_id,
            nome: admin.funcionario_nome,
            email: admin.administrador_email,
            tipo: 'administrador'
          }
        });
      } else {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }
    }

    return res.status(404).json({ error: 'Usuário não encontrado.' });
  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});











// -------------------------------------------------
// Rota para iniciar recuperação de senha (POST /forgot-password)
// -------------------------------------------------
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'O e-mail é obrigatório.' });
  }

  try {
    // 1) Verifica se esse e-mail existe em Administrador (JOIN para obter Nome)
    const [admRows] = await db.query(
      `
      SELECT
        a.Funcionario_Codigo AS administrador_id,
        a.Email              AS administrador_email,
        f.Nome               AS funcionario_nome
      FROM Administrador AS a
      JOIN Funcionario     AS f
        ON f.Codigo = a.Funcionario_Codigo
      WHERE a.Email = ?
      `,
      [email]
    );

    if (admRows.length === 0) {
      return res.status(404).json({ error: 'E-mail não cadastrado.' });
    }
    const admin = admRows[0];

    // 2) Gera o JWT que expira em 1 hora
    const jwtPayload = { administradorId: admin.administrador_id };
    const token = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: '1h' });

    // 3) Monta o link de reset
    const resetUrl = `${FRONTEND_URL}/Tela-Login/reset-password.html?token=${token}`;

    // 4) Envia o e-mail com o link de reset
    const transporter = nodemailer.createTransport({
      service: 'yahoo',
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
      }
    });

    const mailOptions = {
      from: `EquipeManejo <${MAIL_USER}>`,
      to: admin.administrador_email,
      subject: 'Redefinição de senha',
      text:
        `Olá ${admin.funcionario_nome},\n\n` +
        `Clique no link abaixo para redefinir sua senha:\n\n` +
        `${resetUrl}\n\n` +
        `Este link expira em 1 hora.\n\n` +
        `Se você não solicitou a redefinição, ignore este e-mail.`
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      message: `Link de recuperação enviado para ${admin.administrador_email}.`
    });
  } catch (err) {
    console.error('Erro na rota /forgot-password:', err);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

// -------------------------------------------------
// Rota para finalizar redefinição de senha (POST /reset-password)
// -------------------------------------------------
router.post('/reset-password', async (req, res) => {
  const { token, novaSenha } = req.body;
  if (!token || !novaSenha) {
    return res.status(400).json({ error: 'Token e nova senha são obrigatórios.' });
  }

  try {
    // 1) Verifica e decodifica o JWT
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ error: 'Token inválido ou expirado.' });
    }

    const administradorId = payload.administradorId;

    // 2) Faz hash da nova senha
    const novaSenhaHash = await bcrypt.hash(novaSenha, 10);

    // 3) Atualiza a senha no banco
    await db.query(
      'UPDATE Administrador SET Senha = ? WHERE Funcionario_Codigo = ?',
      [novaSenhaHash, administradorId]
    );

    return res.json({ message: 'Senha redefinida com sucesso!' });
  } catch (err) {
    console.error('Erro na rota /reset-password:', err);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});


module.exports = router;
