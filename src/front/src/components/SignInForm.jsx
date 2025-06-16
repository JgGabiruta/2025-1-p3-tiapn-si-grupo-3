import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState(''); // Padronizado para 'senha' e 'setSenha'
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    if (!email || !senha) { // Usa 'senha'
      setMessage('Por favor, preencha todos os campos!');
      setMessageType('error');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }) // Envia 'senha'
      });
      const data = await response.json();

      if (response.ok) {
        setMessage('Login bem-sucedido!');
        setMessageType('success');
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/home');
      } else {
        setMessage(data.error || 'Credenciais inválidas.');
        setMessageType('error');
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      setMessage('Erro ao conectar ao servidor. Tente novamente.');
      setMessageType('error');
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleSubmit}>
        <h1>Entrar</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha} // Usa 'senha'
          onChange={(e) => setSenha(e.target.value)} // Usa 'setSenha'
          required
        />
        <button type="submit">Entrar</button>
        <p><Link to="/forgot-password">Esqueceu a senha?</Link></p>
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