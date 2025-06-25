// backend/routes.js
const express    = require('express');
const bcrypt     = require('bcrypt');
const jwt        = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const router     = express.Router();
const db         = require('./db/db'); // seu pool mysql2/promise
const JWT_SECRET   = 'MINHA_CHAVE_SUPER_SECRETA'; 
const FRONTEND_URL = 'http://localhost:5173';
const MAIL_USER    = 'jg.gabiruta@yahoo.com'; 
const MAIL_PASS    = 'cpbmgxniplmaoafb';
const express = require('express');


function criarRotaParaTabela(nomeTabela) {
    router.get(`/${nomeTabela}`, async (req, res) => {
        try {
            const [rows] = await db.query(`SELECT * FROM ${nomeTabela}`);
            res.json(rows);
        } catch (err) {
            console.error(`Erro ao buscar dados da tabela ${nomeTabela}:`, err);
            res.status(500).json({ error: `Erro ao buscar dados da tabela ${nomeTabela}` });
        }
    });
}


// --- Rotas ESPECÍFICAS para Ferramenta (GET, POST, PUT, DELETE) ---
router.get('/Ferramenta', async (req, res) => {
    console.log('Requisição GET /api/Ferramenta recebida!');
    try {
        const [rows] = await db.query(`SELECT Codigo, Nome, Tipo, Quantidade, Localizacao FROM Ferramenta`);
        res.json(rows);
    } catch (err) {
        console.error('Erro ao buscar ferramentas:', err);
        res.status(500).json({ error: 'Erro ao buscar ferramentas.' });
    }
});

router.post('/Ferramenta', async (req, res) => {
    console.log('Requisição POST /api/Ferramenta recebida!');
    // AQUI: A desestruturação do req.body em camelCase está correta.
    const { nome, tipo, quantidade, localizacao } = req.body;

    if (!nome || !tipo || quantidade === undefined || !localizacao) {
        return res.status(400).json({ error: 'Todos os campos (nome, tipo, quantidade, localizacao) são obrigatórios para a ferramenta.' });
    }
    try {
        // AQUI: Use os nomes das colunas como estão no seu DB (PascalCase).
        // Os valores (?, ?, ?, ?) receberão os dados em camelCase.
        const query = 'INSERT INTO Ferramenta (Nome, Tipo, Quantidade, Localizacao) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [nome, tipo, quantidade, localizacao]); // Passando os valores em camelCase
        res.status(201).json({ message: 'Ferramenta adicionada com sucesso.', id: result.insertId });
    } catch (err) {
        console.error('Erro ao adicionar ferramenta:', err);
        res.status(500).json({ error: 'Erro ao adicionar ferramenta.' });
    }
});


router.put('/Ferramenta/:codigo', async (req, res) => {
    console.log(`Requisição PUT /api/Ferramenta/${req.params.codigo} recebida!`);
    const { codigo } = req.params; // Parâmetro de rota
   
    const { nome, tipo, quantidade, localizacao } = req.body; 

    if (!nome || !tipo || quantidade === undefined || !localizacao) {
        return res.status(400).json({ error: 'Todos os campos (nome, tipo, quantidade, localizacao) são obrigatórios para a atualização da ferramenta.' });
    }
    try {
        // AQUI: Use os nomes das colunas como estão no seu DB (PascalCase).
        // Os valores (?, ?, ?, ?) receberão os dados em camelCase.
        const query = 'UPDATE Ferramenta SET Nome = ?, Tipo = ?, Quantidade = ?, Localizacao = ? WHERE Codigo = ?';
        const [result] = await db.query(query, [nome, tipo, quantidade, localizacao, codigo]); // Passando os valores em camelCase
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Ferramenta não encontrada.' });
        }
        res.json({ message: 'Ferramenta atualizada com sucesso.' });
    } catch (err) {
        console.error('Erro ao atualizar ferramenta:', err);
        res.status(500).json({ error: 'Erro ao atualizar ferramenta.' });
    }
});

router.delete('/Ferramenta/:codigo', async (req, res) => {
    console.log(`Requisição DELETE /api/Ferramenta/${req.params.codigo} recebida!`);
    const { codigo } = req.params;
    try {
        const query = 'DELETE FROM Ferramenta WHERE Codigo = ?';
        const [result] = await db.query(query, [codigo]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Ferramenta não encontrada.' });
        }
        res.json({ message: 'Ferramenta excluída com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir ferramenta:', err);
        res.status(500).json({ error: 'Erro ao excluir ferramenta.' });
    }
});


router.get(`/EmprestimoFuncionario`, async (req, res) => {
    console.log('Requisição GET /api/EmprestimoFuncionario recebida!');
    try {
        const [rows] = await db.query(`SELECT Funcionario.Nome, Funcionario.Departamento_Codigo, Emprestimo.Data_Retirada, Emprestimo.Data_Devolucao FROM Funcionario inner join Emprestimo on Funcionario.Codigo = Emprestimo.Operario_Funcionario_Codigo`);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Erro ao buscar dados da tabela ` });
    }
});

// ROTA PARA BUSCAR EMPRÉSTIMOS PARA A AGENDA
router.get('/Emprestimos', async (req, res) => {
  console.log('Requisição GET /api/Emprestimos recebida!');
  try {
       
 const query = `
            SELECT 
                e.Codigo, 
                e.Descricao, 
                e.Data_Retirada, 
                e.Data_Devolucao,
                f.Nome as FuncionarioNome
            FROM Emprestimo as e
            LEFT JOIN Funcionario as f ON e.Operario_Funcionario_Codigo = f.Codigo
        `;
 const [rows] = await db.query(query);
 res.json(rows);
  } catch (err) {
 console.error('Erro ao buscar empréstimos:', err);
 res.status(500).json({ error: 'Erro ao buscar dados de empréstimos.' });
  }
});

router.get('/Eventos', async (req, res) => {
  console.log('Requisição GET /api/Eventos recebida!');
  try {
       
 const query = `
            SELECT 
                ev.Codigo, 
                ev.Titulo, 
                ev.Data, 
                f.Nome as AdminNome
            FROM Evento as ev
            LEFT JOIN Funcionario as f ON ev.Administrador_Funcionario_Codigo = f.Codigo
        `;
 const [rows] = await db.query(query);
 res.json(rows);
  } catch (err) {
 console.error('Erro ao buscar eventos:', err);
 res.status(500).json({ error: 'Erro ao buscar dados de eventos.' });
  }
});

router.post('/Eventos', async (req, res) => {
    console.log('Requisição POST /api/Eventos recebida!');
    const {title, date} = req.body;
     const adminCodigo = 14;

    if (!title || !date) {
        return res.status(400).json({ error: 'Os campos título e data são obrigatórios para o evento.' });
    }
    try {
        const query = 'INSERT INTO Evento (Titulo, Data, Administrador_Funcionario_Codigo) VALUES (?, ?, ?)';
        const [result] = await db.query(query, [title, date, adminCodigo]); 
        res.status(201).json({ message: 'Evento adicionado com sucesso.', id: result.insertId });
    } catch (err) {
        console.error('Erro ao adicionar evento:', err);
        res.status(500).json({ error: 'Erro ao adicionar evento.' });
    }   
});

router.put('/Eventos/:codigo', async (req, res) => {
    console.log(`Requisição PUT /api/Eventos/${req.params.codigo} recebida!`);
    const { codigo } = req.params; 
    const { title, date } = req.body; 

    if (!title || !date) {
        return res.status(400).json({ error: 'Campos título e data são obrigatórios para eventos.' });
    }
    try {
        const query = 'UPDATE Evento SET Titulo = ?, Data = ? WHERE Codigo = ?';
        const [result] = await db.query(query, [title, date, codigo]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Evento não encontrado.' });
        }
        res.json({ message: 'Evento atualizado com sucesso.' });
    } catch (err) {
        console.error('Erro ao atualizar evento:', err);
        res.status(500).json({ error: 'Erro ao atualizar evento.' });
    }
});

router.delete('/Eventos/:codigo', async (req, res) => {
    console.log(`Requisição DELETE /api/Eventos/${req.params.codigo} recebida!`);
    const { codigo } = req.params;
    try {
        const query = 'DELETE FROM Evento WHERE Codigo = ?';
        const [result] = await db.query(query, [codigo]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Evento não encontrado.' });
        }
        res.json({ message: 'Evento excluído com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir evento:', err);
        res.status(500).json({ error: 'Erro ao excluir evento.' });
    }
});




// -------------------------------------------------
// Função genérica para GET em todas as tabelas
// -------------------------------------------------
function criarRotaParaTabela(nomeTabela) {
  router.get(`/${nomeTabela}`, async (req, res) => {
    try {
      const [rows] = await db.query(`SELECT * FROM \`${nomeTabela}\``);
      return res.json(rows);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: `Erro ao buscar dados da tabela ${nomeTabela}` });
    }
  });
}

// -------------------------------------------------
// Rota de JOIN de exemplo (mantém igual)
// -------------------------------------------------
function EmprestimoFuncionario() {
  router.get('/EmprestimoFuncionario', async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT F.Nome, F.Departamento_Codigo, E.Data_Retirada, E.Data_Devolucao
        FROM Funcionario AS F
        INNER JOIN Emprestimo AS E
          ON F.Codigo = E.Operario_Funcionario_Codigo
      `);
      return res.json(rows);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar dados de EmprestimoFuncionario' });
    }
  });
}

// -------------------------------------------------
// Rota ÚNICA e SEGURA de Cadastro com Transação
// -------------------------------------------------
router.post('/api/register', async (req, res) => {
  // 1. Pega todos os dados do corpo da requisição
  const {
    nome, email, senha, cargo, cpf, telefone,
    nascimento, rua, numero, cidade
  } = req.body;

  // Validação básica
  if (!email || !senha || !nome) {
    return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios.' });
  }

  let connection;
  try {
    // Inicia uma conexão do pool para controlar a transação
    connection = await db.getConnection();
    await connection.beginTransaction();

    // 2. VERIFICA PRIMEIRO SE O E-MAIL JÁ EXISTE
    const [existingAdmin] = await connection.query(
      'SELECT Email FROM Administrador WHERE Email = ?', [email]
    );

    // Se encontrou um e-mail, interrompe a operação
    if (existingAdmin.length > 0) {
      await connection.rollback(); // Cancela a transação
      connection.release();       // Libera a conexão de volta para o pool
      return res.status(409).json({ error: 'Este e-mail já está em uso.' }); // 409 Conflict
    }

    // 3. Se o e-mail for único, insere o Funcionário
    const [funcResult] = await connection.query(
      `INSERT INTO Funcionario (Nome, Cargo, Telefone, Data_Nascimento, Rua, Numero, Cidade, CPF)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, cargo, telefone, nascimento, rua, numero, cidade, cpf || null]
    );
    const funcionarioId = funcResult.insertId;

    // 4. Insere o Administrador, associando ao funcionário recém-criado
    const senhaHash = await bcrypt.hash(senha, 10);
    await connection.query(
      'INSERT INTO Administrador (Email, Senha, Funcionario_Codigo) VALUES (?, ?, ?)',
      [email, senhaHash, funcionarioId]
    );

    // 5. Se tudo correu bem, confirma as alterações no banco
    await connection.commit();

    return res.status(201).json({ message: 'Cadastro realizado com sucesso!', id: funcionarioId });

  } catch (err) {
    // 6. Se qualquer erro ocorreu, desfaz todas as operações da transação
    if (connection) {
      await connection.rollback();
    }
    console.error('Erro na transação de cadastro:', err);
    return res.status(500).json({ error: 'Erro interno ao realizar o cadastro.' });

  } finally {
    // 7. Libera a conexão de volta para o pool em qualquer cenário (sucesso ou erro)
    if (connection) {
      connection.release();
    }
  }
});

// -------------------------------------------------
// Rota de Login (POST /login)
// -------------------------------------------------
router.post('/api/login', async (req, res) => {
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
            id:   admin.administrador_id,
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
router.post('/api/forgot-password', async (req, res) => {
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
    const resetUrl = `${FRONTEND_URL}/reset-password?token=${token}`;

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
router.post('/api/reset-password', async (req, res) => {
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

// -------------------------------------------------
// Rotas GET automáticas e JOIN
// -------------------------------------------------
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
EmprestimoFuncionario();

module.exports = router;
