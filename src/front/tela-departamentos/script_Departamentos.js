const menuButton = document.querySelector('.menu-button');
const sidebar = document.querySelector('.sidebar');

menuButton.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
});

let listaDeptos = document.getElementById("listaDeptos");

window.onload = () =>{

    imprimeDeptos();
}

const pesquisar = () => {
    
    let inputDepartamento = document.getElementById("inputDepartamento").value;
    inputDepartamento = inputDepartamento.toLowerCase();

    let selectPeca = document.getElementById("selectPeca").value;
    let selectNome = document.getElementById("selectNome").value

    let Depto = document.getElementsByClassName("Depto")
    let Departamentos = document.getElementsByClassName("Departamentos");
    let ferramentaCod = document.getElementsByClassName("ferramentaCod");
    let Nomes = document.getElementsByClassName("Nomes");

    for (let i = 0; i < Departamentos.length; i++) {
        

        if (Departamentos[i].innerHTML.toLowerCase().includes(inputDepartamento) && selectPeca == "vazio" && selectNome == "vazio") {
            
            Depto[i].style.display = "flex"

        }else if(Departamentos[i].innerHTML.toLowerCase().includes(inputDepartamento) && ferramentaCod[i].innerHTML.toLowerCase().includes(selectPeca) && selectNome == "vazio"){
            
            Depto[i].style.display = "flex"

        }else if(Departamentos[i].innerHTML.toLowerCase().includes(inputDepartamento) && Nomes[i].innerHTML.includes(selectNome) && selectPeca == "vazio"){
            
            Depto[i].style.display = "flex"

        }else if(Departamentos[i].innerHTML.toLowerCase().includes(inputDepartamento) && ferramentaCod[i].innerHTML.toLowerCase().includes(selectPeca) && Nomes[i].innerHTML.includes(selectNome)){

            Depto[i].style.display = "flex"

        }else{

            Depto[i].style.display = "none";
        }
    }

}

function imprimeDeptos() {
    
    let str = '';
    let Departamentos = ["Construção", "Administração", "Operação", "Recursos Humanos"]
    let Nomes = ["Getúlio vargas", "Ana Maria", "Veronica Almeida", "Theordor Vieira"]
    let codigos = ["1287-01", "3242-73", "8923-21", "8392-32",]

    for(let i = 0 ; i < 4 ; i++){

        str += `<div class="Depto">

              <div id="grupo1">

                <div>
                  <p class="label">Departamento</p>
                  <p class="text Departamentos">${Departamentos[i]}</p>
                </div>

                <div>
                  <p class="label">Código</p>
                  <p class="text ferramentaCod">${codigos[i]}</p>
                </div> 

                

              </div>
              
              <div id="grupo2">

                <div>
                  <p class="label">Responsável</p> 
                  <p class="text Nomes">${Nomes[i]}</p>
                </div>

                             
              </div>

              <div id="grupo3">

                <div>
                  
                  <p class="label">Data de Criação <i class="material-icons icon_circle">brightness_1</i></p>
                  
                  <p class="text">02/12/24</p>
                </div>

                <button type="submit">Detalhes</button>

              </div>
            </div>`
    }

    listaDeptos.innerHTML = str;
}