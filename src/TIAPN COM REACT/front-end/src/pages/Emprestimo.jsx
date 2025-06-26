import { useState } from 'react';
import './../styles/emprestimo.css';
import Nav from './../components/Header.jsx'
import Aside from './../components/SideBar.jsx'
import Menu from './../components/Menu.jsx'

function Emprestimo() {

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
