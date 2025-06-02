const path = require('path');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const routes = require('./routes');



const app = express();
app.use(express.static(path.join(__dirname, '..', 'front')));
app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'E-mail é obrigatório.' });

  // 1. Verifica se o usuário existe
  db.query('SELECT id FROM Administrador WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor.' });
    if (results.length === 0) return res.status(404).json({ error: 'E-mail não cadastrado.' });

    // 2. Gera token e definição de expiração
    const token = crypto.randomBytes(20).toString('hex');
    const expires = new Date(Date.now() + 3600 * 1000); // 1h

    // 3. Armazena no banco
    db.query(
      'UPDATE Administrador SET reset_token = ?, reset_expires = ? WHERE email = ?',
      [token, expires, email],
      async (err) => {
        if (err) return res.status(500).json({ error: 'Erro ao salvar token.' });

        // 4. Envia o e-mail
        const transporter = nodemailer.createTransport({
          service: 'yahoo',
          auth: {
            user: 'jg.gabiruta@yahoo.com',
            pass: 'cpbmgxniplmaoafb'
          }
        });

        const resetUrl = `http://localhost:3000/reset-password.html?token=${token}`;
        const mailOptions = {
          from: 'EquipeManejo <jg.gabiruta@yahoo.com>',
          to: email,
          subject: 'Redefinição de senha',
          text: `Clique aqui para redefinir sua senha:\n\n${resetUrl}\n\nO link expira em 1 hora.`
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'E-mail de redefinição enviado.' });
      }
    );
  });
});
app.post('/api/reset-password', (req, res) => {
  const { token, senha } = req.body;
  if (!token || !senha) return res.status(400).json({ error: 'Token e senha são obrigatórios.' });

  // 1. Verifica token e expiração
  db.query(
    'SELECT id, reset_expires FROM Administrador WHERE reset_token = ?',
    [token],
    async (err, results) => {
      if (err) return res.status(500).json({ error: 'Erro no servidor.' });
      if (results.length === 0 || new Date(results[0].reset_expires) < new Date()) {
        return res.status(400).json({ error: 'Token inválido ou expirado.' });
      }
      const userId = results[0].id;
      // 2. Hash da nova senha
      const hashed = await bcrypt.hash(senha, 10);
      // 3. Atualiza senha e limpa token
      db.query(
        'UPDATE Administrador SET senha = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?',
        [hashed, userId],
        (err) => {
          if (err) return res.status(500).json({ error: 'Erro ao salvar nova senha.' });
          res.json({ message: 'Senha alterada com sucesso.' });
        }
      );
    }
  );
});

// Configurar a conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb'
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados MySQL.');
});

// Rota para cadastro de usuário
app.post('/api/administrador', async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const query = 'INSERT INTO Administrador (nome, email, senha) VALUES (?, ?, ?)';
    db.query(query, [nome, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Erro ao cadastrar usuário:', err);
        return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
      }
      res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
    });
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Rota para login de usuário
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  const query = 'SELECT * FROM Administrador WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const administrador = results[0];
    const senhaValida = await bcrypt.compare(senha, administrador.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    res.status(200).json({ message: 'Login bem-sucedido.', 
      user: {
        id: administrador.id,
        nome: administrador.nome,
        email: administrador.email
      }
    });
  });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
