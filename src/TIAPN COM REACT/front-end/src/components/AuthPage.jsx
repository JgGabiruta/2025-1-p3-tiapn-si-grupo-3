import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import Logo from '/public/imgs/Logo.png';

// Recebe as props de App.jsx e as passa para os filhos
function AuthPage({ onLoginSuccess, onNavigate }) {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => setIsRightPanelActive(true);
  const handleSignInClick = () => setIsRightPanelActive(false);
  const handleSignUpSuccess = () => setIsRightPanelActive(false);

  return (
    <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
      {/* Passa as props necessárias para o SignInForm */}
      <SignInForm onLoginSuccess={onLoginSuccess} onNavigate={onNavigate} />
      <SignUpForm onSignUpSuccess={handleSignUpSuccess} />

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h2>Bem-vindo de volta ao</h2>
            <h1>Manejo GR!</h1>
            <p>Já possui uma conta?</p>
            <button id="sign-in" onClick={handleSignInClick}>Entrar</button>
            <img src={Logo} alt="Logo Manejo" width="110" />
          </div>
          <div className="overlay-panel overlay-right">
            <h2>Bem-vindo ao</h2>
            <h1>Manejo GR!</h1>
            <p>Novo por aqui?</p>
            <button id="sign-up" onClick={handleSignUpClick}>Criar Conta</button>
            <img src={Logo} alt="Logo Manejo" width="110" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;