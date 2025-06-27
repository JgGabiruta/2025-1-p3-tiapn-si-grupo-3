import "../App.css";
import React, { useEffect, useState } from "react";
import Nav from "./../components/Header.jsx";
import Aside from "./../components/SideBar.jsx";
import Form from "./../components/ConfigForm.jsx";
import Menu from "./../components/Menu.jsx";

import configStylesHref from "./../styles/configuracao.css?url";
import ConfigForm from "./../components/ConfigForm.jsx";

const STYLESCONFIG_ID = "config-styles";

function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.id = STYLESCONFIG_ID;
    link.rel = "stylesheet";
    link.href = configStylesHref;

    document.head.appendChild(link);

    return () => {
      const styleElement = document.getElementById(STYLESCONFIG_ID);
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <>
      <Nav />

      <div id="layout">
        <Aside />
        <main>
          <article>
            <h1>Configuração</h1>
            <div className="divider"></div>
            <ConfigForm />
          </article>
        </main>
      </div>
    </>
  );
}

export default App;
