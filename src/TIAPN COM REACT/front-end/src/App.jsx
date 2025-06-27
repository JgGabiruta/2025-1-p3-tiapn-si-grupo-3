import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// Importe os componentes para cada etapa do fluxo
import AuthPage from "./components/AuthPage";
import SubscriptionPage from './pages/SubscriptionPage';

function App() {
  // Este estado controla em qual etapa o usuário está
  const [userFlow, setUserFlow] = useState('AUTH'); // AUTH, SUBSCRIPTION, DASHBOARD
  const navigate = useNavigate();

  // Função para ser chamada quando o login for bem-sucedido
  const handleLoginSuccess = () => {
    // Muda o fluxo para a etapa de assinatura
    setUserFlow('SUBSCRIPTION');
  };

  // Função para ser chamada quando a assinatura for concluída
  const handleSubscriptionSuccess = () => {
    // Muda o fluxo para o painel principal
    setUserFlow('DASHBOARD');
  };

  // Este efeito "escuta" as mudanças no estado do fluxo
  useEffect(() => {
    // Se o fluxo chegou em 'DASHBOARD', é hora de navegar para a Home
    if (userFlow === 'DASHBOARD') {
      navigate('/Home');
    }
  }, [userFlow, navigate]); // Roda sempre que userFlow ou navigate mudarem

  // Renderiza o componente correto baseado no estado do fluxo
  switch (userFlow) {
    case 'SUBSCRIPTION':
      return <SubscriptionPage onSubscriptionSuccess={handleSubscriptionSuccess} />;
    
    case 'AUTH':
    default:
      return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }
}

export default App;