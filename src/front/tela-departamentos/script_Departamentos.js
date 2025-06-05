const menuButton = document.querySelector('.menu-button');
const sidebar = document.querySelector('.sidebar');

menuButton.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
});

let listaEmprestimos = document.getElementById("listaEmprestimos");

window.onload = () =>{

    imprimeEmprestimos();
}

const pesquisar = () => {
    
    let inputNome = document.getElementById("inputNome").value;
    inputNome = inputNome.toLowerCase();

    let selectPeca = document.getElementById("selectPeca").value;
    let selectDepartamento = document.getElementById("selectDepartamento").value

    let emprestimo = document.getElementsByClassName("emprestimo")
    let nomes = document.getElementsByClassName("nomes");
    let ferramentaCod = document.getElementsByClassName("ferramentaCod");
    let departamentos = document.getElementsByClassName("departamentos");

    for (let i = 0; i < nomes.length; i++) {
        

        if (nomes[i].innerHTML.toLowerCase().includes(inputNome) && selectPeca == "vazio" && selectDepartamento == "vazio") {
            
            emprestimo[i].style.display = "flex"

        }else if(nomes[i].innerHTML.toLowerCase().includes(inputNome) && ferramentaCod[i].innerHTML.toLowerCase().includes(selectPeca) && selectDepartamento == "vazio"){
            
            emprestimo[i].style.display = "flex"

        }else if(nomes[i].innerHTML.toLowerCase().includes(inputNome) && departamentos[i].innerHTML.includes(selectDepartamento) && selectPeca == "vazio"){
            
            emprestimo[i].style.display = "flex"

        }else if(nomes[i].innerHTML.toLowerCase().includes(inputNome) && ferramentaCod[i].innerHTML.toLowerCase().includes(selectPeca) && departamentos[i].innerHTML.includes(selectDepartamento)){

            emprestimo[i].style.display = "flex"

        }else{

            emprestimo[i].style.display = "none";
        }
    }

}

function imprimeEmprestimos() {
    
    let str = '';
    let nomes = ["Getúlio vargas", "Ana Maria", "Veronica Almeida", "Theordor Vieira", "Arthur Gomes"]
    let departamentos = ["Construção", "Administração", "Operação", "Recursos Humanos", "Construção"]
    let codigos = ["1287-01", "3242-73", "8923-21", "8392-32", "1282-21"]

    for(let i = 0 ; i < 5 ; i++){

        str += `<div class="emprestimo">

              <div id="grupo1">

                <div>
                  <p class="label">Nome</p>
                  <p class="text nomes">${nomes[i]}</p>
                </div>

                <div>
                  <p class="label">Data de Empréstimo</p>
                  <p class="text">02/12/24 - 12:39</p>
                </div>

              </div>
              
              <div id="grupo2">

                <div>
                  <p class="label">Departamento</p> 
                  <p class="text departamentos">${departamentos[i]}</p>
                </div>

                <div>
                  <p class="label">Ferramenta</p>
                  <p class="text ferramentaCod">${codigos[i]}</p>
                </div>              
              </div>

              <div id="grupo3">

                <div>
                  
                  <p class="label">Data de Devolução <i class="material-icons icon_circle">brightness_1</i></p>
                  
                  <p class="text">02/12/24</p>
                </div>

                <button type="submit">Devolver</button>

              </div>
            </div>`
    }

    listaEmprestimos.innerHTML = str;
}