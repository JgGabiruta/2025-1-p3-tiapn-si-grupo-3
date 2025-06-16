import React, { useState } from 'react';
import '../styles/forgot.css'; // Importa os estilos CSS

/**
 * Componente para a funcionalidade de esqueci a senha.
 * Permite que o usuário insira seu e-mail para receber instruções de redefinição.
 */
function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // Estado para mensagens de feedback ao usuário
  const [messageType, setMessageType] = useState(''); // 'success' ou 'error'

  /**
   * Lida com o envio do formulário de redefinição de senha.
   * @param {Event} e - O evento de envio do formulário.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Enviando e-mail..."); // Mensagem de feedback inicial
    setMessageType(''); // Limpa o tipo de mensagem anterior

    try {
      const res = await fetch('/api/forgot-password', {
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
        <input
          type="email"
          name="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Continuar</button>
      </form>
      {/* Exibe a mensagem de feedback se houver uma */}
      {message && (
        <p className={`message-box ${messageType === 'success' ? 'message-success' : 'message-error'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ForgotPassword;
