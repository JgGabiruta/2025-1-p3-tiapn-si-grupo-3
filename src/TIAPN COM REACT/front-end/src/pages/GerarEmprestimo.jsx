import './../App.css'
import Nav from '../components/Header'
import Aside from '../components/SideBar'
import Forms from '../components/Forms'
function GerarEmprestimo(){

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