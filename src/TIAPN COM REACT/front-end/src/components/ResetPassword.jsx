// Em src/components/ResetPassword.jsx

import React, { useState, useEffect } from 'react'; // ✅ Passo 1: Adicionado o useEffect

// ✅ Passo 2: Importando a URL do CSS, em vez do arquivo inteiro
import forgotStylesHref from '../styles/forgot.css?url';

// Recebe onNavigate e o token como props
function ResetPassword({ onNavigate, token }) {
  const backendUrl = 'http://localhost:3001';
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // ✅ Passo 3: Adicionado o useEffect para gerenciar o CSS
  useEffect(() => {
    const link = document.createElement('link');
    link.href = forgotStylesHref;
    link.rel = 'stylesheet';
    link.id = 'reset-password-styles'; // ID único para este estilo

    document.head.appendChild(link);

    // Função de limpeza que remove o CSS quando o componente sai da tela
    return () => {
      const linkElement = document.getElementById('reset-password-styles');
      if (linkElement) {
        document.head.removeChild(linkElement);
      }
    };
  }, []); // Array vazio para rodar apenas ao montar/desmontar

  // Nenhuma alteração necessária na sua lógica de formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    if (!token) {
      setMessage('Token de redefinição de senha inválido ou ausente.');
      setMessageType('error');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('As senhas não coincidem. Tente novamente.');
      setMessageType('error');
      return;
    }
    if (newPassword.length < 6) {
      setMessage('A nova senha deve ter pelo menos 6 caracteres.');
      setMessageType('error');
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/api/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, novaSenha: newPassword })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || 'Senha redefinida com sucesso!');
        setMessageType('success');
        setTimeout(() => {
          onNavigate('Login');
        }, 2000);
      } else {
        setMessage(data.error || 'Erro ao redefinir senha. Tente novamente.');
        setMessageType('error');
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      setMessage('Erro ao conectar ao servidor. Tente novamente mais tarde.');
      setMessageType('error');
    }
  };

  return (
    <div className="container">
      <h1>Redefinir senha</h1>
      <p>Crie uma nova senha forte para sua conta.</p>
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="Nova senha" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        <input type="password" placeholder="Confirme a nova senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit" className='forgotbtn'>Redefinir</button>
        <button type="button" className='forgotbtn' onClick={() => onNavigate('Login')}>Voltar</button>
      </form>
      {message && (
        <p className={`message-box ${messageType === 'success' ? 'message-success' : 'message-error'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ResetPassword;