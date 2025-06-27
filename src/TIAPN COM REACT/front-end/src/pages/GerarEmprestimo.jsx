import React, { useEffect, useState } from 'react';
import Nav from '../components/Header'
import Aside from '../components/SideBar'
import Forms from '../components/Forms'

import gerarEmprestimoStylesHref from './../styles/emprestimo.css?url';

const STYLESHEET_ID = 'emprestimo-styles';
function GerarEmprestimo(){
    useEffect(() => {
    const link = document.createElement('link');
    link.id = STYLESHEET_ID;
    link.rel = 'stylesheet';
    link.href = gerarEmprestimoStylesHref;
    
    document.head.appendChild(link);

    // Função de limpeza
    return () => {
      const styleElement = document.getElementById(STYLESHEET_ID);
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

    return(

        <div>

            <Nav/>

            <div id="layout">

                <Aside/>
                <Forms/>

            </div>
        </div>

    )
}

export default GerarEmprestimo