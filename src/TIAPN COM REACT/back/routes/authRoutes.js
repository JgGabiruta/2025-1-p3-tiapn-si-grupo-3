// backend/routes/authRoutes.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const router = express.Router();
const db = require('../db/db'); // <-- O caminho para o db mudou para '../'

// Suas constantes de configuração
const JWT_SECRET = 'MINHA_CHAVE_SUPER_SECRETA'; 
const FRONTEND_URL = 'http://localhost:5173';
const MAIL_USER = 'jg.gabiruta@yahoo.com'; 
const MAIL_PASS = 'cpbmgxniplmaoafb';

// Rota de Cadastro - POST /register
router.post('/register', async (req, res) => {
    const { nome, email, senha, cargo, cpf, telefone, nascimento, rua, numero, cidade } = req.body;
    if (!email || !senha || !nome) return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios.' });

    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const [existingAdmin] = await connection.query('SELECT Email FROM Administrador WHERE Email = ?', [email]);
        if (existingAdmin.length > 0) {
            await connection.rollback();
            connection.release();
            return res.status(409).json({ error: 'Este e-mail já está em uso.' });
        }

        const [funcResult] = await connection.query(
            `INSERT INTO Funcionario (Nome, Cargo, Telefone, Data_Nascimento, Rua, Numero, Cidade, CPF) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [nome, cargo, telefone, nascimento, rua, numero, cidade, cpf || null]
        );
        const funcionarioId = funcResult.insertId;

        const senhaHash = await bcrypt.hash(senha, 10);
        await connection.query(
            'INSERT INTO Administrador (Email, Senha, Funcionario_Codigo) VALUES (?, ?, ?)',
            [email, senhaHash, funcionarioId]
        );

        await connection.commit();
        return res.status(201).json({ message: 'Cadastro realizado com sucesso!', id: funcionarioId });
    } catch (err) {
        if (connection) await connection.rollback();
        console.error('Erro na transação de cadastro:', err);
        return res.status(500).json({ error: 'Erro interno ao realizar o cadastro.' });
    } finally {
        if (connection) connection.release();
    }
});

// Rota de Login - POST /login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ error: 'Email e senha são obrigatórios.' });

    try {
        const [admRows] = await db.query(
            `SELECT a.Funcionario_Codigo AS id, a.Email AS email, a.Senha AS hash, f.Nome AS nome
             FROM Administrador AS a JOIN Funcionario AS f ON f.Codigo = a.Funcionario_Codigo
             WHERE a.Email = ?`, [email]
        );

        if (admRows.length === 0) return res.status(401).json({ error: 'Credenciais inválidas.' });
        
        const admin = admRows[0];
        const match = await bcrypt.compare(senha, admin.hash);

        if (!match) return res.status(401).json({ error: 'Credenciais inválidas.' });
        
        // Se precisar de token JWT no futuro, aqui é o lugar para gerar
        // const token = jwt.sign({ id: admin.id, tipo: 'administrador' }, JWT_SECRET, { expiresIn: '8h' });

        return res.json({
            message: 'Login de administrador bem-sucedido.',
            user: { id: admin.id, nome: admin.nome, email: admin.email, tipo: 'administrador' }
        });
    } catch (err) {
        console.error('Erro no login:', err);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
});

// Rota para iniciar recuperação de senha - POST /forgot-password
router.post('/forgot-password', async (req, res) => {
    // ... (sua lógica de forgot-password, sem alterações)
});

// Rota para finalizar redefinição de senha - POST /reset-password
router.post('/reset-password', async (req, res) => {
    // ... (sua lógica de reset-password, sem alterações)
});


module.exports = router;