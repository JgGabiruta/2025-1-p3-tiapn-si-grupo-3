import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/forgot.css'; // Reutilizando os estilos de forgot password

/**
 * Componente para redefinição de senha.
 * Recebe um token da URL e permite que o usuário defina uma nova senha.
 */
function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(''); // Estado para mensagens de feedback
  const [messageType, setMessageType] = useState(''); // 'success' ou 'error'
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  // Efeito para extrair o token da URL ao carregar o componente
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const extractedToken = params.get('token');
    if (extractedToken) {
      setToken(extractedToken);
    } else {
      setMessage('Token de redefinição de senha não encontrado.');
      setMessageType('error');
    }
  }, [location.search]); // Dependência em location.search para re-executar se a URL mudar

  /**
   * Lida com o envio do formulário para redefinir a senha.
   * @param {Event} e - O evento de envio do formulário.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Limpa mensagens anteriores
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
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, novaSenha: newPassword })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || 'Senha redefinida com sucesso!');
        setMessageType('success');
        // Redireciona para a página de login após um pequeno atraso para o usuário ver a mensagem
        setTimeout(() => {
          navigate('/login');
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
        <input
          type="password"
          placeholder="Nova senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirme a nova senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className='forgotbtn'>Redefinir</button>
        <button type="button" className='forgotbtn' onClick={() => navigate('/login')}>Voltar</button>
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

export default ResetPassword;
