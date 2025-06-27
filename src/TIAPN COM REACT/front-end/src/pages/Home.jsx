import React, { useEffect, useState } from 'react';
import Navbar from '../components/Header';
import Widget from '../components/Widget';
import ReminderList from '../components/ReminderList';
import Sidebar from '../components/SideBar';

import homeStylesHref from './../styles/home.css?url';

const STYLESHEET_ID = 'home-styles';

export default function Home() {
  let username = 'Usuário'; // Define um valor padrão
  try {
    const userStored = localStorage.getItem('user');
    // Verifica se o item existe e não é a string "undefined"
    if (userStored && userStored !== 'undefined') {
      const userData = JSON.parse(userStored);
      username = userData?.nome || 'Usuário'; // Pega o nome ou usa o valor padrão
    }
  } catch (e) {
    console.error("Falha ao analisar os dados do usuário do localStorage", e);
  }
  
   useEffect(() => {
    const link = document.createElement('link');
    link.id = STYLESHEET_ID;
    link.rel = 'stylesheet';
    link.href = homeStylesHref;
    
    document.head.appendChild(link);

    // Função de limpeza que remove o CSS
    return () => {
      const styleElement = document.getElementById(STYLESHEET_ID);
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);
  
  return (
    <>
      <Navbar size={100}/>
      <div id="layout">
        <Sidebar />
        <main className="main-content">
          <div className="dashboard-header">
            <h2 className="welcome-message">Bem vindo, <span id="username">{username}</span>!</h2>
            <a href="/funcionarios" className="new-employee-btn">
              <i className="fa fa-user-plus"></i> Novo Funcionário
            </a>
          </div>
          <hr className="dashboard-separator" />

          <div className="dashboard-widgets">
            <div className="widget-funcionarios">
              <Widget title="Funcionários ativos" count={50} icon="fa-user-group" />
            </div>
            <div className="widget-ferramentas">
              <Widget title="Ferramentas em Estoque" count={120} icon="fa-wrench" />
            </div>
            <div className="widget-lembretes">
              <ReminderList />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
