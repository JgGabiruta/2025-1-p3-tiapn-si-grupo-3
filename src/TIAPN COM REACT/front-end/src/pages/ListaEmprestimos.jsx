import './../App.css'
import Nav from './../components/Header.jsx'
import Aside from './../components/SideBar.jsx'
import PesquisaEmprestimo from '../components/PesquisaEmprestimo.jsx'

function ListaEmprestimos(){

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