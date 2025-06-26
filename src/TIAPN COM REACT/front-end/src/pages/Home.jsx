import Navbar from '../components/Header';
import Widget from '../components/Widget';
import ReminderList from '../components/ReminderList';
import Sidebar from '../components/SideBar';
import './../styles/home.css'


export default function Home() {
  const username = JSON.parse(localStorage.getItem('user'))?.nome || 'Usuário';
  
  

  return (
    <>
      <Navbar />
      <div id="layout">
        <Sidebar />
        <main className="main-content">
          <div className="dashboard-header">
            <h2 className="welcome-message">Bem vindo, <span id="username">{username}</span>!</h2>
            <a href="/funcionarios" className="new-employee-btn">
              <i className="fa fa-user-plus"></i> Novo Funcionário
            </a>
          </div>
          <hr className="dashboard-separator" />

          <div className="dashboard-widgets">
            <div className="widget-funcionarios">
              <Widget title="Funcionários ativos" count={50} icon="fa-user-group" />
            </div>
            <div className="widget-ferramentas">
              <Widget title="Ferramentas em Estoque" count={120} icon="fa-wrench" />
            </div>
            <div className="widget-lembretes">
              <ReminderList />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
