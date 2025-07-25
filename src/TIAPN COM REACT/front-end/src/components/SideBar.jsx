import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {

  const navigate = useNavigate()
  const location = useLocation();

  console.log(location.pathname)
  let teste = location.pathname

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li className={teste == "/Home" ? "active" : ""}>
            <a onClick={() => navigate (`/Home`)}>
              <i className="fa fa-house"></i> <span>Início</span>
            </a>
          </li>
          <li className={teste == "/Emprestimo" || teste == "/ListaEmprestimos" || teste == "/GerarEmprestimo" ? "active" : ""}>
            <a onClick={() => navigate (`/Emprestimo`)}>
              <i className="fa fa-cart-shopping"></i> <span>Empréstimos</span>
            </a>
          </li>
          <li>
            <a onClick={() => navigate (`/Funcionarios`)}>
              <i className="fa fa-user"></i> <span>Funcionários</span>
            </a>
          </li>
          <li>
            <a onClick={() => navigate (`/Agenda`)}>
              <i className="fa fa-calendar"></i> <span>Agenda</span>
            </a>
          </li>
          <li>
            <a onClick={() => navigate (`/Estoque`)}>
              <i className="fa fa-wrench"></i> <span>Estoque</span>
            </a>
          </li>
          <li>
            <a onClick={() => navigate (`/Configuracao`)}>
              <i className="fa fa-gear"></i> <span>Configuração</span>
            </a>
          </li>
          <li>
            <a onClick={() => navigate (`/Departamento`)}>
              <i className="fa fa-folder"></i> <span>Departamento</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
