// Em src/components/AuthPage.jsx

import React, { useState, useEffect } from 'react'; // Passo 1: Importe o useEffect
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

// Passo 2: Importe a URL do CSS para o Vite
import loginStylesHref from '../styles/login.css?url';

function AuthPage({ onLoginSuccess, onNavigate }) {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  // Passo 3: Adicione o useEffect que gerencia o CSS
  useEffect(() => {
    // Cria o elemento <link>
    const link = document.createElement('link');
    link.href = loginStylesHref;
    link.rel = 'stylesheet';
    link.id = 'login-styles'; // ID para encontrar e remover depois

    // Adiciona o CSS ao <head> da página
    document.head.appendChild(link);

    // Função de limpeza: será executada quando o componente sair da tela
    return () => {
      const linkElement = document.getElementById('login-styles');
      if (linkElement) {
        document.head.removeChild(linkElement);
      }
    };
  }, []); // O array vazio [] garante que isso rode só uma vez

  const handleSignUpClick = () => setIsRightPanelActive(true);
  const handleSignInClick = () => setIsRightPanelActive(false);
  const handleSignUpSuccess = () => setIsRightPanelActive(false);

  return (
    <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
      <SignInForm onLoginSuccess={onLoginSuccess} onNavigate={onNavigate} />
      <SignUpForm onSignUpSuccess={handleSignUpSuccess} />

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h2>Bem-vindo de volta ao</h2>
            <h1>Manejo GR!</h1>
            <p>Já possui uma conta?</p>
            <button id="sign-in" onClick={handleSignInClick}>Entrar</button>
            <img src="/imgs/Logo.png" alt="Logo Manejo" width="110" />
          </div>
          <div className="overlay-panel overlay-right">
            <h2>Bem-vindo ao</h2>
            <h1>Manejo GR!</h1>
            <p>Novo por aqui?</p>
            <button id="sign-up" onClick={handleSignUpClick}>Criar Conta</button>
            <img src="/imgs/Logo.png" alt="Logo Manejo" width="110" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;