import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoManejo from '../assets/Logo_Manejo_Laranja.png';
import logoEmpresa from '../assets/Logo_Fernandes_Prado.png';

// Componente da Sideba
let navigate
const Sidebar = ({ isVisible }) => (

  <aside className={`sidebar ${!isVisible ? 'hidden' : ''}`}>
    {navigate = useNavigate()}
    <nav className="sidebar-nav">
      <ul>

        <li>
          <a onClick={() => navigate('/Home')}>
            <i className="fa fa-house"></i>
            <span>Início</span>
          </a>
        </li>

        <li>
          <a onClick={() => navigate (`/Emprestimo`)}>
            <i className="fa fa-cart-shopping"></i>
            <span>Empréstimos</span>
          </a>
        </li>

        <li className="active">
          <a onClick={() => navigate (`/Funcionarios`)}>
            <i className="fa fa-user"></i>
            <span>Funcionários</span>
          </a>
        </li>

        <li>
          <a onClick={() => navigate (`/Agenda`)}>
            <i className="fa fa-calendar"></i>
            <span>Agenda</span>
          </a>
        </li>

        <li>
          <a onClick={() => navigate (`/Estoque`)}>
            <i className="fa fa-wrench"></i>
            <span>Estoque</span>
          </a>
        </li>

        <li>
          <a onClick={() => navigate (`/Configuracao`)}>
            <i className="fa fa-gear"></i>
            <span>Configuração</span>
          </a>
        </li>

        <li><a onClick={() => navigate (`/Departamento`)}><i className="fa fa-folder"></i><span>Departamento</span></a></li>
      </ul>
    </nav>
  </aside>
);

// Componente da Navbar
const Navbar = ({ onMenuClick, searchTerm, onSearchChange }) => (
  <nav className="navbar">
    <div className="navbar-left">
      <button className="menu-button" onClick={onMenuClick}>&#9776;</button>
      <a href="#">
        <img src={logoManejo} alt="Logo Manejo" className="logo-img" />
      </a>
    </div>
    <div className="navbar-center">
      <input
        type="text"
        placeholder="Pesquise por Ferramentas e Funcionários"
        className="search-input"
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
    <div className="navbar-right">
      <button className="notification-button" aria-label="Notificações">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFFFFF" className="bi bi-bell" viewBox="0 0 16 16">
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
        </svg>
      </button>
      <div className="divider"></div>
      <a href="#">
        <div className="user-info">
          <img src={logoEmpresa} alt="Logo Fernandes Prado" className="logo-empresa" />
          <div className="user-text">
            <p className="user-name">Alessandra</p>
            <p className="user-company">Fernandes Prado</p>
          </div>
        </div>
      </a>
    </div>
  </nav>
);

// Componente de Layout principal
const Layout = ({ children, searchTerm, onSearchChange }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <Navbar onMenuClick={toggleSidebar} searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <div id="layout">
        <Sidebar isVisible={isSidebarVisible} />
        <main>
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;