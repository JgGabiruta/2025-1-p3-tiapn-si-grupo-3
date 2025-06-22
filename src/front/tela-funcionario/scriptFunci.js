// ------------ Sessão Menu e Sidebar ------------
const menuButton = document.querySelector('.menu-button');
const sidebar = document.querySelector('.sidebar');

menuButton.addEventListener('click', () => {
  sidebar.classList.toggle('hidden');
});

// ------------ Sessão de Abertura e Fechamento de Popups ------------
function AbrirNovoFuncionario() {
  document.getElementById("Popup-NovoFuncionario").style.display = "block";
}

function fecharPopup() {
  document.getElementById("Popup-NovoFuncionario").style.display = "none";
  document.getElementById("Popup-EditarFuncionario").style.display = "none";
}

// ------------ Sessão de Referência aos Inputs (Novo Funcionário) ------------

const nomeFuncionarioNovo = document.getElementById("nome-funci-popup");
const cargoFuncionarioNovo = document.getElementById("cargo-funci-popup");
const telefoneFuncionarioNovo = document.getElementById("telefone-funci-popup");
const dataNascFuncionarioNovo = document.getElementById("datanasc-funci-popup");
const ruaFuncionarioNovo = document.getElementById("rua-funci-popup");
const numeroFuncionarioNovo = document.getElementById("numero-funci-popup");
const cidadeFuncionarioNovo = document.getElementById("cidade-funci-popup");
const cpfFuncionarioNovo = document.getElementById("cpf-funci-popup");
const depFuncionarioNovo = document.getElementById("departamento-funci-popup");
const salvarFunc = document.getElementById("Salvar-Funcionario");

// ------------ Sessão Máscara de Input ------------
function aplicarMascaraCPF(input) {
  input.addEventListener("input", function () {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    input.value = value;
  });
}

function aplicarMascaraTelefone(input) {
  input.addEventListener("input", function () {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length <= 10) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    input.value = value;
  });
}

// Aplicando máscaras
aplicarMascaraCPF(cpfFuncionarioNovo);
aplicarMascaraTelefone(telefoneFuncionarioNovo);
aplicarMascaraCPF(document.getElementById("cpf-funci-popup-editar"));
aplicarMascaraTelefone(document.getElementById("telefone-funci-popup-editar"));

// ------------ Sessão Carregar Lista de Funcionários ------------
document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista-funcionarios");

  fetch("http://localhost:3000/funcionario")
    .then(res => res.json())
    .then(funcionarios => {
      lista.innerHTML = ''; // Limpa a lista antes de adicionar os itens
      funcionarios.forEach(f => {
        const funcionarioHTML = `
          <div class="funcionario" data-id="${f.Codigo}">
            <div class="img-funcionario"></div>
            <div class="info-funcionario">
                <div class="nome-funci"><p>Nome: ${f.Nome}</p></div>
                <div class="cod-funci"><p>Código: ${f.Codigo}</p></div>
                <div class="cpf-funci"><p>CPF: ${f.CPF}</p></div>
            </div>
            <span class="iconefunci" onclick="abrirEditarFuncionario('${f.Codigo}')">
                <i class="fa fa-pencil"></i>
            </span>
          </div>
        `;
        lista.innerHTML += funcionarioHTML;
      });
    })
    .catch(erro => console.error("Erro ao carregar funcionários:", erro));
});

// ------------ Sessão Editar Funcionário ------------

// Variável para guardar o código do funcionário que está sendo editado
let funcionarioEditandoCodigo = null;

function abrirEditarFuncionario(codigo) {
  // Guarda o código do funcionário para usar ao salvar ou excluir
  funcionarioEditandoCodigo = codigo;

  // Faz a requisição para a nova rota da API que criamos
  fetch(`http://localhost:3000/funcionario/${codigo}`)
  
    .then(res => {
      if (!res.ok) {
        throw new Error(`Erro ao buscar dados: ${res.statusText}`);
      }
      return res.json();
    })
    .then(f => { // 'f' é o objeto com os dados do funcionário que veio do backend
      
      // Preenche os campos do formulário de EDIÇÃO com os dados recebidos
      document.getElementById("cod-funci-popup-editar").value = f.Codigo;
      document.getElementById("cargo-funci-popup-editar").value = f.Cargo;
      document.getElementById("nome-funci-popup-editar").value = f.Nome;
      document.getElementById("telefone-funci-popup-editar").value = f.Telefone;

      // Formata a data para o formato YYYY-MM-DD que o input 'date' aceita
      // O '.split('T')[0]' remove a parte da hora (ex: T10:00:00.000Z)
      if (f.Data_Nascimento) {
        document.getElementById("datanasc-funci-popup-editar").value = new Date(f.Data_Nascimento).toISOString().split('T')[0];
      } else {
        document.getElementById("datanasc-funci-popup-editar").value = '';
      }
      
      document.getElementById("rua-funci-popup-editar").value = f.Rua;
      document.getElementById("cidade-funci-popup-editar").value = f.Cidade;
      document.getElementById("cpf-funci-popup-editar").value = f.CPF;
      document.getElementById("departamento-funci-popup-editar").value = f.Departamento_Codigo;
      
      // Preenchendo o campo 'numero' que faltava no seu HTML
      const numeroInput = document.getElementById("numero-funci-popup-editar");
      if(numeroInput) { // Verifica se o campo existe antes de tentar preencher
        numeroInput.value = f.Numero;
      }
      
      // Finalmente, exibe o popup de edição
      document.getElementById("Popup-EditarFuncionario").style.display = "block";
    })
    .catch(err => {
      console.error("Falha ao carregar dados do funcionário para edição:", err);
      alert("Não foi possível carregar os dados do funcionário. Verifique o console para mais detalhes.");
    });
}

// ------------ Sessão Validadores ------------
function validarTelefone(valor) {
  // Aceita (xx) xxxx-xxxx ou (xx) xxxxx-xxxx
  const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return regex.test(valor);
}

function validarCPF(valor) {
  const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return regex.test(valor);
}

// ------------ Sessão Salvar Novo Funcionário ------------
salvarFunc.addEventListener('click', function (event) {
  console.log("Botão 'salvarFunc' foi clicado!");
  event.preventDefault();

  const dadosFuncionario = {

    Cargo: cargoFuncionarioNovo.value.trim(),
    Nome: nomeFuncionarioNovo.value.trim(),
    Telefone: telefoneFuncionarioNovo.value.trim(),
    Data_Nascimento: dataNascFuncionarioNovo.value,
    Rua: ruaFuncionarioNovo.value.trim(),
    Numero: numeroFuncionarioNovo.value.trim(),
    Cidade: cidadeFuncionarioNovo.value.trim(),
    CPF: cpfFuncionarioNovo.value.trim(),
    Departamento_Codigo: depFuncionarioNovo.value.trim()
  };

  console.log("Enviando para o backend:", JSON.stringify(dadosFuncionario, null, 2));

  fetch(`http://localhost:3000/funcionario`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dadosFuncionario)
  })
  .then(response => {
      if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
      }
      return response.json();
  })
  .then(() => {
    fecharPopup();
    location.reload();
  })
   .catch(error => {
       console.error("Erro ao salvar funcionário:", error);
       alert(`Erro ao salvar: ${error.message}`);
   });
});

// ------------ Sessão Salvar Edição de Funcionário ------------
document.getElementById("Salvar-Funcionario-Editar").addEventListener("click", function () {
  if (!funcionarioEditandoCodigo) return;

  const dadosAtualizados = {
    Cargo: document.getElementById("cargo-funci-popup-editar").value.trim(),
    Nome: document.getElementById("nome-funci-popup-editar").value.trim(),
    Telefone: document.getElementById("telefone-funci-popup-editar").value.trim(),
    Data_Nascimento: document.getElementById("datanasc-funci-popup-editar").value,
    Rua: document.getElementById("rua-funci-popup-editar").value.trim(),
    Numero: document.getElementById("numero-funci-popup-editar").value.trim(),
    Cidade: document.getElementById("cidade-funci-popup-editar").value.trim(),
    CPF: document.getElementById("cpf-funci-popup-editar").value.trim(),
    Departamento_Codigo:document.getElementById("departamento-funci-popup-editar").value.trim()
  };

  if (!dadosAtualizados.Nome || !dadosAtualizados.CPF) {
    alert("Preencha os campos obrigatórios: Nome e CPF.");
    return;
  }
   if (dadosAtualizados.Telefone && !validarTelefone(dadosAtualizados.Telefone)) {
     alert("Telefone inválido. Use o formato (XX) XXXXX-XXXX");
     return;
  }
  if (!validarCPF(dadosAtualizados.CPF)) {
      alert("CPF inválido. Use o formato XXX.XXX.XXX-XX");
      return;
  }

  fetch(`http://localhost:3000/funcionario/${funcionarioEditandoCodigo}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dadosAtualizados)
  })
  .then(response => {
      if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
      }
      return response.json();
  })
  .then(() => {
    fecharPopup();
    location.reload();
  })
  .catch(err => {
      console.error("Erro ao atualizar funcionário:", err);
      alert(`Erro ao atualizar: ${err.message}`);
  });
});

// ------------ Sessão Excluir Funcionário ------------
document.getElementById("Excluir-Funcionario").addEventListener("click", function () {
  if (!funcionarioEditandoCodigo) return;

  // if (!confirm(`Tem certeza de que deseja excluir o funcionário de código ${funcionarioEditandoCodigo}?`)) {
  //     return;
  // }

  fetch(`http://localhost:3000/funcionario/${funcionarioEditandoCodigo}`, {
    method: "DELETE"
  })
  .then(response => {
      if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
      }
      return response.json();
  })
  .then(() => {
    fecharPopup();
    location.reload();
  })
  .catch(err => {
      console.error("Erro ao excluir funcionário:", err);
      alert(`Erro ao excluir: ${err.message}`);
  });
});

// ------------ Sessão de Pesquisa ------------
document.getElementById("search-funcionario").addEventListener("input", function () {
  const termo = this.value.toLowerCase();
  const funcionarios = document.querySelectorAll(".funcionario");

  funcionarios.forEach(funcionario => {
    const nome = funcionario.querySelector(".nome-funci p").textContent.toLowerCase();
    const codigo = funcionario.querySelector(".cod-funci p").textContent.toLowerCase();
    
    // Mostra o funcionário se o nome OU o código corresponderem ao termo de busca
    if (nome.includes(termo) || codigo.includes(`código: ${termo}`)){
        funcionario.style.display = "flex";
    } else {
        funcionario.style.display = "none";
    }
  });
});