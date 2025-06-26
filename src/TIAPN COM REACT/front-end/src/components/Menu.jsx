import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom";
import Axios from 'axios'
import './../styles/emprestimo.css'
import { BsBagFill, BsPencilFill, BsPlusCircleFill} from "react-icons/bs";
import { getEmprestimoAtrasado } from '../services/api';

function Menu(){

    const [emprestimos, setEmprestimos] = useState([]);
    let aux = ""
    let data = ""

    const fetchEmprestimos = async () => {
    
        try{
          
          const data = await getEmprestimoAtrasado();
          setEmprestimos(data);
    
        }catch(err){
    
          console.log(err);
        }
      }

    useEffect(() => {

      fetchEmprestimos();

    },[emprestimos])

    const navigate = useNavigate()

    function ListaEmprestimosPagina(){

        navigate(`/ListaEmprestimos`)
    }

    function GerarEmprestimoPagina(){

        navigate(`/GerarEmprestimo`)
    }

    return(
        
        <main>
            <article>

                <h1>Menu Rápido</h1>

                <a>
                    <button onClick={() => ListaEmprestimosPagina()}>Listar Emprestimos</button>
                </a>

                <a >
                    <button onClick={() => GerarEmprestimoPagina()}>Emprestimo de Material</button>
                </a>

                <div className="divider"></div>

                <div className="container" id="container_index">

                    <div id="links_pags">

                        <div className="link_pag">
                            <a href="#">
                                <i>
                                    <BsPencilFill />
                                </i>
                                <div className="divider"></div>
                                <p>Editar Departamentos</p>
                            </a>
                        </div>

                        <div className="link_pag">
                            <a onClick={() => GerarEmprestimoPagina()}>
                                <i>
                                    <BsPlusCircleFill />
                                </i>
                                <div className="divider"></div>
                                <p>Empréstimo de Material</p>
                            </a>
                        </div>

                        <div className="link_pag">
                            <a href="#">
                               
                                <i>
                                    <BsBagFill />
                                </i>
                                <div className="divider"></div>
                                <p>Bloquear Empréstimo</p>
                            </a>
                        </div>
                
                    </div>

                    <div id="lista_emprestimo">
               
                        {emprestimos == "" ? "" :  
                        
                            <div className="emprestimo container3" id={emprestimos[0].Codigo}>

                                <div id="grupo1">

                                    <div>
                                        
                                        <p className="label">Nome</p>
                                        <p className="text nomes">{emprestimos[0].Nome}</p>
                                    </div>

                                </div>
                            
                                <div id="grupo2">

                                    <div>
                                        <p className="label">Ferramenta</p>
                                        <p className="text">{emprestimos[0].nome}</p>
                                    </div>  
                        
                                    <div>
                                        <p className="label">Codigo</p>
                                        <p className="text ferramentaCod">{emprestimos[0].Codigo_Ferramenta}</p>
                                    </div>
                        
                                    <div>      
                                        <p className="label">Data de Devolução</p>

                                        <p style={{display:'none'}}>{aux = emprestimos[0].Data_Devolucao.split("-")}</p> 

                                        <p className="text">{data = aux[2] + "/" + aux[1] + "/" + aux[0]}</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </article>
        </main>
    )
}

export default Menu