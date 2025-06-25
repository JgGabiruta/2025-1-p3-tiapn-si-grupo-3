import React, { useState } from 'react';

// Recebe onLoginSuccess e onNavigate como props
function SignInForm({ onLoginSuccess, onNavigate }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const backendUrl = 'http://localhost:3001'; // Corrigido para a porta do backend

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
      const response = await fetch(`${backendUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      const data = await response.json();

      if (response.ok) {
        setMessage('Login bem-sucedido!');
        setMessageType('success');
        localStorage.setItem('user', JSON.stringify(data.user));
        // Chama a função de sucesso do App.jsx em vez de navegar diretamente
        onLoginSuccess();
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
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <button type="submit">Entrar</button>
        {/* Link para "Esqueceu a senha?" agora chama a prop onNavigate */}
        <p><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('ForgotPassword'); }}>Esqueceu a senha?</a></p>
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