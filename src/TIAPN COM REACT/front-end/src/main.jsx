import React, { StrictMode } from 'react';
import {ReactDOM, createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import StockPage from './pages/StockPage.jsx';


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