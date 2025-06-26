import './../styles/emprestimo.css'
import Axios from 'axios'
import { BsCalendar3 } from "react-icons/bs";
import {useEffect, useState, useRef} from 'react'

function Forms(){

  const [codFunc, setCodFunc] = useState([]);
  const [codFerr, setCodFerr] = useState([]);
  const [emprestimos, setEmprestimos] = useState([])

  const [selectFerr, setSelectFerr] = useState("ferramenta")
  const [selectFunc, setSelectFunc] = useState("funcionario")
  const [quantidade, setQuantidade] = useState("")
  const [dataEm, setData] = useState("")
  const [descricao, setDescricao] = useState("")

  useEffect(() =>{

    Axios.get("http://localhost:3000/funcionario").then((data) => {

      setCodFunc(data.data)
    })
  },[codFunc])

  useEffect(() =>{

    Axios.get("http://localhost:3000/ferramenta").then((data) => {

      setCodFerr(data.data)
    })
  },[codFerr])

  useEffect(() =>{

    Axios.get("http://localhost:3000/emprestimo").then((data) => {

      setEmprestimos(data.data)
    })
  },[emprestimos])

  function criaEmprestimo() {

    const date = new Date();
    let ano = date.getFullYear();
    let dia = date.getDate();
    let mes = date.getMonth() + 1;

    if(dia < 10 )
        dia = "0" + dia

    if(mes < 10)
        mes = "0" + mes 
    
    let data = {
        
      codigo_func: selectFunc,
      codigo_ferr: selectFerr,
      quantidade: quantidade,
      data_dev: dataEm,
      data_ret: ano + "-" + mes + "-" + dia,
      desc:descricao,
      codigo_emp: emprestimos.length + 5
    }

    fetch('http://localhost:3000/Emprestimo',{

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify(data)
    })
    .then(response => console.log(response.status))
}

  return (

    <main>        
      <article>

        <h1>Gerar Novo Empréstimo</h1>

        <div className="divider"></div>

        <div className="container">

          <div className="container2">
        
            <div className="container4">

              <div className="grupo2">

                <div id="grupo2-sub1">
                  <p>Código Funcionário:</p>

                  <select name="selectCodFunc" id="selectFuncionario" value={selectFunc} onChange={(event) => setSelectFunc(event.target.value)}>

                    {codFunc.map((codigo) => (

                      <option value={codigo.Codigo}>{codigo.Codigo}</option>
                    ))}
                                      
                  </select>
                </div>

                <div id="grupo2-sub2">
                  <p>Código Da Ferramenta</p>
                  <select name="selectCodFerr" id="selectFerramenta" value={selectFerr} onChange={(event) => setSelectFerr(event.target.value)}>
                            
                    {codFerr.map((codigo) => (

                      <option value={codigo.Codigo}>{codigo.Codigo}</option>
                    ))}
                  </select>
                </div>
                    
              </div>

              <div className="grupo2">

                <div id="grupo2-sub1" className="corrigeEspc" style={{marginRight: 70 + 'px'}}>

                  <p>Quantida de Empréstimo</p>

                  <input type="text" 
                  value={quantidade} 
                  onChange={(event) => setQuantidade(event.target.value)}
                  id="inputQuantidade" placeholder="Insria a quantidade" className='teste'></input>

                </div>

                <div id="grupo2-sub2">
                        
                  <p>Data para Devolução</p>

                  <div className="input-icons">
                    <i><BsCalendar3/></i>
                    <input type="text" id="inputData" placeholder="AAAA-MM-DD" value={dataEm} onChange={(event) => setData(event.target.value)} style={{textIndent: 40 + 'px'}}/>
                  </div>   

                </div>                
              </div>

              <div className="grupo2" >

                <div id="grupo2-sub1" style={{marginRight: 0 + 'px'}}>

                  <p>Descrição</p>
                  <input type="text" value={descricao}
                  onChange={(event) => setDescricao(event.target.value)} id="inputDescricao" placeholder="Insria a descricao"/>

                </div>
                  
                <button className="btn-forms" onClick={()=> criaEmprestimo()}>Emprestar</button>
              </div>
            </div>

            <div id="erro" className="container5" style={{display:'none'}}>

              <h1>Error: Funcionario bloqueado para o emprestimo</h1>

              <p>Alguns possiveis motivos: Setor não tem autorização para emprestimo da ferramenta especifica, funcionario penalizado etc</p>

              <div className="button-icons">

                <i id="icon_error_outline" className="material-icons">error_outline</i>

                <button>Emprestar mesmo assim</button>
              </div>   
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}

export default Forms