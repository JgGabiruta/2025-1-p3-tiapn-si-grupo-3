import './../styles/home.css';
import Logo from './../assets/Logo_Manejo_Laranja.png';
import logoFP from './../assets/Logo_Fernandes_Prado.png';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-button">☰</button>
        <img src= {Logo} alt="Logo Manejo" className="logo-img" />
      </div>
      <div className="navbar-center">
        <input
          type="text"
          placeholder="Pesquise por Ferramentas e Funcionários"
          className="search-input"
        />
      </div>
      <div className="navbar-right">
        <button className="notification-button" aria-label="Notificações">
          <i className="fa fa-bell">
          </i>
        </button>
        <div className="divider"></div>
        <div className="user-info">
          <img
            src= {logoFP}
            alt="Logo Fernandes Prado"
            className="logo-empresa"
          />
          <div className="user-text">
            <p className="user-name">Alessandra</p>
            <p className="user-company">Fernandes Prado</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
