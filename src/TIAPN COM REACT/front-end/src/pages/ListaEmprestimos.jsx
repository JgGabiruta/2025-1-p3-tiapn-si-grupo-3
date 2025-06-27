import React, { useEffect, useState } from 'react';
import Nav from './../components/Header.jsx'
import Aside from './../components/SideBar.jsx'
import PesquisaEmprestimo from '../components/PesquisaEmprestimo.jsx'

import listarEmprestimoStylesHref from './../styles/emprestimo.css?url';

const STYLESHEET_ID = 'emprestimo-styles';


function ListaEmprestimos(){
    useEffect(() => {
    const link = document.createElement('link');
    link.id = STYLESHEET_ID;
    link.rel = 'stylesheet';
    link.href = listarEmprestimoStylesHref;
    
    document.head.appendChild(link);

    // Função de limpeza
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

                <Aside/>
                <PesquisaEmprestimo/>

            </div>
        </div>
    )
}

export default ListaEmprestimos;