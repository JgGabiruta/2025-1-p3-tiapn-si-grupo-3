import React, { StrictMode } from 'react';
import {ReactDOM, createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import StockPage from './pages/StockPage.jsx';
import Emprestimo from './pages/Emprestimo.jsx'
import GerarEmprestimo from './pages/GerarEmprestimo.jsx'
import ListaEmprestimos from './pages/ListaEmprestimos.jsx'
import Agenda from './pages/Agenda.jsx';
import Funcionarios from './pages/Funcionarios.jsx'
import ForgotPassword from './components/ForgotPassword.jsx';
import ResetPassword from './components/ResetPassword.jsx';

// Cria a raiz da aplicação usando a API moderna do React 18
//const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([

  {

    path: "/",
    element: <App/>

  }, {

    path: "/Home",
    element: <Home/>

  }, {
    path: "/Estoque",
    element: <StockPage/>
  },{
    path: "/Emprestimo",
    element: <Emprestimo/>
  },{
    path: "/GerarEmprestimo",
    element: <GerarEmprestimo/>
  },{
    path: "/ListaEmprestimos",
    element: <ListaEmprestimos/>
  },{
     path: "/Agenda",
    element: <Agenda/>
  },{
    path: "/Funcionarios",
    element: <Funcionarios/>
  },{
    path: "/RecuperarSenha",
    element: <ForgotPassword/>
  },{
    path: "/TrocarSenha",
    element: <ResetPassword/>
  }
])

// Renderiza a aplicação
/*root.render(
  <React.StrictMode>

    <BrowserRouter>
      <App />
    </BrowserRouter>
    
  </React.StrictMode>
);*/

createRoot (document.getElementById ('root')).render(
  <StrictMode>
    <RouterProvider router ={router} />
  </StrictMode>
)