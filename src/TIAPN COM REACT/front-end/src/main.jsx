import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Importa os dois arquivos CSS necessários.
// O index.css provavelmente contém as diretivas do Tailwind.
// O login.css contém os estilos específicos da sua tela de autenticação.
import './index.css';
import './styles/login.css';

// Pega o elemento 'root' do seu HTML
const container = document.getElementById('root');

// Cria a raiz da aplicação usando a API moderna do React 18
const root = createRoot(container);

// Renderiza a aplicação
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);