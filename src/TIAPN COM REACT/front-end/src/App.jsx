import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import AuthPage from "./components/AuthPage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

import Agenda from "./pages/Agenda";
import StockPage from "./pages/StockPage";


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


  return (
    <AuthPage/>    
  )
}

export default App;
