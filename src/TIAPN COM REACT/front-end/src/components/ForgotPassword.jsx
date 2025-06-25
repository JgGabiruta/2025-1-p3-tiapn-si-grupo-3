import React, { useState } from 'react';
import '../styles/forgot.css';

function ForgotPassword({ onNavigate }) { // Recebe a prop onNavigate
  const backendUrl = 'http://localhost:3001'; // Corrigido para a porta do backend
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Enviando e-mail...");
    setMessageType('');

    try {
      const res = await fetch(`${backendUrl}/api/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || 'Instruções enviadas para o seu e-mail.');
        setMessageType('success');
      } else {
        setMessage(data.error || 'Erro ao enviar e-mail. Tente novamente.');
        setMessageType('error');
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setMessage("Erro ao conectar ao servidor. Tente novamente mais tarde.");
      setMessageType('error');
    }
  };

  return (
    <div className="container">
      <h1>Esqueceu sua senha?</h1>
      <p>Informe seu e-mail cadastrado no site para enviarmos as instruções de redefinição da senha.</p>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button className='forgotbtn' type="submit">Continuar</button>
        {/* Botão Voltar agora chama a prop onNavigate */}
        <button className='forgotbtn' type="button" onClick={() => onNavigate('Login')}>Voltar</button>
      </form>
      {message && (
        <p className={`message-box ${messageType === 'success' ? 'message-success' : 'message-error'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ForgotPassword;