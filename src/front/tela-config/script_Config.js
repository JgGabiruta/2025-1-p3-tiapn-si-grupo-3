const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db'); // Conexão com o MySQL

router.post('/alterar-senha', async (req, res) => {
  const { currentUsername, currentPassword, newPassword } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE username = ?', [currentUsername]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const usuario = rows[0];

    const senhaValida = await bcrypt.compare(currentPassword, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha atual incorreta.' });
    }

    const novaSenhaHash = await bcrypt.hash(newPassword, 10);

    await db.query('UPDATE usuarios SET senha = ? WHERE username = ?', [novaSenhaHash, currentUsername]);

    res.json({ message: 'Senha alterada com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao alterar a senha.' });
  }
});

module.exports = router;