// Em src/components/ForgotPassword.jsx

import React, { useEffect } from 'react';

// Passo 1: Importe a URL do CSS do formulário de "esqueci a senha"
import forgotStylesHref from '../styles/forgot.css?url';
import { Link } from 'react-router-dom';

function ForgotPassword({ onNavigate }) {

  // Passo 2: Adicione o useEffect para gerenciar o ciclo de vida do CSS
  useEffect(() => {
    const link = document.createElement('link');
    link.href = forgotStylesHref;
    link.rel = 'stylesheet';
    link.id = 'forgot-styles'; // ID único para este CSS

    document.head.appendChild(link);

    // Função de limpeza para remover o estilo ao sair da página
    return () => {
      const linkElement = document.getElementById('forgot-styles');
      if (linkElement) {
        document.head.removeChild(linkElement);
      }
    };
  }, []); // Array vazio para rodar apenas ao montar/desmontar


  return (
    <div className="container">
      <h1>Recuperar Senha</h1>
      <p>Digite seu e-mail para receber um link de recuperação.</p>
      <form>
        <input type="email" placeholder="Seu e-mail" required />
        <button type="submit">Enviar Link</button>
        <Link to="/">
        <button type="button" className="forgotbtn" style={{ marginTop: '10px'}}>
          Voltar para o Login
        </button>
        </Link>
      </form>
    </div>
  );
}

export default ForgotPassword;