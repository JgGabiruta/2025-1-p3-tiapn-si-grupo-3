import React, { useState, useEffect } from 'react';

// Seus componentes de autenticação
import AuthPage from './components/AuthPage';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
//import Sidebar from './components/SideBar';
//import Header from './components/Header';
//import StockPage from './components/StockPage';
//import Agenda from './components/Agenda';
//import SubscriptionPage from './components/SubscriptionPage';

// Componente de carregamento para o Dashboard
const Dashboard = ({ activePage, setActivePage }) => {
  const renderDashboardPage = () => {
    switch (activePage) {
      // case 'Estoque': return <StockPage />;
      // case 'Agenda': return <Agenda />;
      default: return <div><h1>Página Principal (Ex: Agenda)</h1></div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* <Header /> */}
      <div className="flex flex-1">
        {/* <Sidebar activeItem={activePage} setActiveItem={setActivePage} /> */}
        <div className="flex-1 flex flex-col">
          {renderDashboardPage()}
        </div>
      </div>
    </div>
  );
};


function App() {
  const [activePage, setActivePage] = useState('Login');
  const [resetToken, setResetToken] = useState(null);

  // Efeito para verificar se a URL é de redefinição de senha na carga inicial
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token && window.location.pathname.includes('reset-password')) {
      setResetToken(token);
      setActivePage('ResetPassword');
    }
  }, []); // O array vazio [] faz com que isso rode apenas uma vez

  const handleNavigate = (page) => setActivePage(page);
  const handleLoginSuccess = () => setActivePage('Dashboard'); // Vai para o Dashboard

  const authPages = ['Login', 'ForgotPassword', 'ResetPassword'];

  if (authPages.includes(activePage)) {
    switch (activePage) {
      case 'Login':
        return <AuthPage onLoginSuccess={handleLoginSuccess} onNavigate={handleNavigate} />;
      case 'ForgotPassword':
        return <ForgotPassword onNavigate={handleNavigate} />;
      case 'ResetPassword':
        // Passa o token e a função de navegação como props
        return <ResetPassword onNavigate={handleNavigate} token={resetToken} />;
      default:
        return <AuthPage onLoginSuccess={handleLoginSuccess} onNavigate={handleNavigate} />;
    }
  }

  // Se não for uma página de autenticação, renderiza o Dashboard
  return <Dashboard activePage={activePage} setActivePage={setActivePage} />;
}

export default App;