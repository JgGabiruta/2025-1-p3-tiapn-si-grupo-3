import React, { useEffect, useState } from 'react';
import Nav from './../components/Header.jsx'
import Aside from './../components/SideBar.jsx'
import Menu from './../components/Menu.jsx'

import emprestimoStylesHref from './../styles/emprestimo.css?url';

const STYLESHEET_ID = 'emprestimo-styles';

function Emprestimo() {

  useEffect(() => {
    const link = document.createElement('link');
    link.id = STYLESHEET_ID;
    link.rel = 'stylesheet';
    link.href = emprestimoStylesHref;
    
    document.head.appendChild(link);

    // Função de limpeza que remove o CSS quando o componente sai da tela
    return () => {
      const styleElement = document.getElementById(STYLESHEET_ID);
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return (  
    
    <div>
      <Nav />

      <div id="layout">

        <Aside />
        <Menu />
      </div>
    </div>
  )
}

export default Emprestimo
