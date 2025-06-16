import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

// Um placeholder simples para sua página inicial
const HomePage = () => {
  const navigate = useNavigate(); // Usando useNavigate para navegação programática

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove o usuário do localStorage
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bem-vindo à Manejo GR!</h1>
      <p>Você está logado.</p>
      <button onClick={handleLogout}
              style={{
                backgroundColor: '#141E5A',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 20px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#141E6A'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#141E5A'}
      >
        Sair
      </button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota para a página de autenticação (login/cadastro) */}
        <Route path="/login" element={<AuthPage />} />
        {/* Rota para a página de esqueci a senha */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Rota para a página de redefinir senha */}
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Rota para a página inicial após o login */}
        <Route path="/home" element={<HomePage />} />
        {/* Redirecionamento padrão para /login se a rota não for reconhecida */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
