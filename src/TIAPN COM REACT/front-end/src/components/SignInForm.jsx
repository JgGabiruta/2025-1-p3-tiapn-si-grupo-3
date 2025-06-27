import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../services/api';
// Recebe onLoginSuccess e onNavigate como props
function SignInForm({onLoginSuccess}) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
//  const backendUrl = 'http://localhost:3000'; // Corrigido para a porta do backend

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    if (!email || !senha) {
      setMessage('Por favor, preencha todos os campos!');
      setMessageType('error');
      return;
    }

    try {
      // 1. A chamada com api.post está correta!
      const response = await api.post('/auth/login', { email, senha });
      
      // 2. Se a linha acima não deu erro, o login foi um sucesso.
      const data = response.data;
      
      setMessage('Login bem-sucedido!');
      setMessageType('success');
      localStorage.setItem('user', JSON.stringify(data.user));
      onLoginSuccess(); // Chama a função para navegar para a próxima página

    } catch (err) {
      // 3. Se o login falhou (senha errada, etc.), o código cairá AQUI.
      const errorMsg = err.response?.data?.error || 'Erro ao conectar ao servidor.';
      setMessage(errorMsg); // Mostra a mensagem de erro vinda do back-end ("Credenciais inválidas.")
      setMessageType('error');
      console.error("Erro na requisição de login:", err);
    }
};

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleSubmit}>
        <h1>Entrar</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <button type="submit">Entrar</button>
        {/* Link para "Esqueceu a senha?" agora chama a prop onNavigate */}
        <p><Link to = "/RecuperarSenha">Esqueceu a senha?</Link></p>
        {message && (
          <p className={`message-box ${messageType === 'success' ? 'message-success' : 'message-error'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default SignInForm;
