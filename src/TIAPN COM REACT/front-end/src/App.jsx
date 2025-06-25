import React, { useState, useEffect } from "react";

// =================================================================
// 1. IMPORTE TODOS OS COMPONENTES NECESSÁRIOS DE AMBAS AS BRANCHES
// =================================================================

// Componentes da sua branch (Autenticação)
import AuthPage from "./components/AuthPage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

// Componentes da branch do seu time (Dashboard)
import Header from "./components/Header";
import Sidebar from "./components/SideBar"; // Corrigido de SideBar para Sidebar se for o caso
import Agenda from "./pages/Agenda";
import StockPage from "./pages/StockPage";
// import SubscriptionPage from './components/SubscriptionPage'; // Descomente se necessário

// =================================================================
// 2. O COMPONENTE APP PRINCIPAL QUE GERENCIA TUDO
// =================================================================

function App() {
  // O estado principal controla se estamos na autenticação ou no dashboard
  // Começamos na tela de 'Login'
  const [appState, setAppState] = useState("Auth");

  // Estado para controlar a PÁGINA ATIVA DENTRO do dashboard
  const [activeDashboardPage, setActiveDashboardPage] = useState("Agenda");

  // Estado para o token de redefinição de senha
  const [resetToken, setResetToken] = useState(null);

  // Estado para a página ativa DENTRO da autenticação
  const [activeAuthPage, setActiveAuthPage] = useState("Login");

  // Efeito para verificar se a URL é de redefinição de senha
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token && window.location.pathname.includes("reset-password")) {
      setResetToken(token);
      setActiveAuthPage("ResetPassword");
    }
  }, []);

  // Funções para controlar a navegação
  const handleAuthNavigate = (page) => setActiveAuthPage(page);
  const handleLoginSuccess = () => setAppState("Dashboard"); // Muda o estado geral para o dashboard

  // =================================================================
  // 3. RENDERIZAÇÃO CONDICIONAL
  // =================================================================

  // Se o estado for de Autenticação, renderiza as páginas de login/cadastro/etc.
  if (appState === "Auth") {
    switch (activeAuthPage) {
      case "Login":
        return (
          <AuthPage
            onLoginSuccess={handleLoginSuccess}
            onNavigate={handleAuthNavigate}
          />
        );
      case "ForgotPassword":
        return <ForgotPassword onNavigate={handleAuthNavigate} />;
      case "ResetPassword":
        return (
          <ResetPassword onNavigate={handleAuthNavigate} token={resetToken} />
        );
      default:
        return (
          <AuthPage
            onLoginSuccess={handleLoginSuccess}
            onNavigate={handleAuthNavigate}
          />
        );
    }
  }

  // Se o estado for de Dashboard, renderiza o layout principal com a página interna correta
  if (appState === "Dashboard") {
    const renderDashboardPage = () => {
      switch (activeDashboardPage) {
        case "Estoque":
          return <StockPage />;
        case "Agenda":
          return <Agenda />;
        case "Empréstimos":
        // return <PlaceholderPage title="Empréstimos" />;
        case "Funcionários":
        //  return <PlaceholderPage title="Funcionários" />;
        case "Configuração":
        // return <PlaceholderPage title="Configuração" />;
        case "Departamento":
          // return <PlaceholderPage title="Departamento" />;
          return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <h1 className="text-4xl font-bold mb-4">{activeDashboardPage}</h1>
              <p className="text-lg">Esta página está em construção.</p>
            </div>
          );
        default:
          return <Agenda />;
      }
    };

    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <div
          className="flex flex-1"
          style={{ minHeight: "calc(100vh - 80px)" }}
        >
          <Sidebar
            activeItem={activeDashboardPage}
            setActiveItem={setActiveDashboardPage}
          />
          <div className="flex-1 flex flex-col">{renderDashboardPage()}</div>
        </div>
      </div>
    );
  }

  // Fallback para garantir que algo seja sempre renderizado
  return (
    <AuthPage
      onLoginSuccess={handleLoginSuccess}
      onNavigate={handleAuthNavigate}
    />
  );
}

export default App;
