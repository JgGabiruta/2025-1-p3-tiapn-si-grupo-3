import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import Logo from '../assets/Logo.png';  // Importando a imagem do logo

/**
 * Componente principal da página de autenticação, que alterna entre os formulários de login e cadastro.
 */
function AuthPage() {
  // Estado para controlar qual painel está ativo (login ou cadastro)
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  // Função para ativar o painel de cadastro
  const handleSignUpClick = () => setIsRightPanelActive(true);
  // Função para ativar o painel de login
  const handleSignInClick = () => setIsRightPanelActive(false);
  // Callback para quando o cadastro é bem-sucedido, volta para o painel de login
  const handleSignUpSuccess = () => setIsRightPanelActive(false);

  return (
    <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
      {/* Componente do formulário de login */}
      <SignInForm />
      {/* Componente do formulário de cadastro, passando a função de sucesso */}
      <SignUpForm onSignUpSuccess={handleSignUpSuccess} />

      {/* Container do overlay que contém os painéis de alternância */}
      <div className="overlay-container">
        <div className="overlay">
          {/* Painel esquerdo do overlay (aparece quando o painel de login está ativo) */}
          <div className="overlay-panel overlay-left">
            <h2>Bem-vindo de volta à</h2>
            <h1>Manejo GR!</h1>
            <p>Já possui uma conta?</p>
            <button id="sign-in" onClick={handleSignInClick}>Entrar</button>
            {/* Imagem do logo */}
            {/* Certifique-se de que o caminho '../assets/Logo.png' está correto e o arquivo existe. */}
            <img src={Logo} alt="Logo Manejo" width="110" />
          </div>
          {/* Painel direito do overlay (aparece quando o painel de cadastro está ativo) */}
          <div className="overlay-panel overlay-right">
            <h2>Bem-vindo à</h2>
            <h1>Manejo GR!</h1>
            <p>Novo por aqui?</p>
            <button id="sign-up" onClick={handleSignUpClick}>Criar Conta</button>
            {/* Imagem do logo */}
            <img src={Logo} alt="Logo Manejo" width="110" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
