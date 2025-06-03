const menuButton = document.querySelector('.menu-button');
const sidebar = document.querySelector('.sidebar');

menuButton.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
});

const botaoAbrir = document.getElementById("btnFerramenta");
    const modal = document.getElementById("formModal");
    const botaoFechar = document.getElementById("fecharModal");

    botaoAbrir.addEventListener("click", () => {
  document.getElementById("idEdicao").value = '';
  document.querySelector("#formModal h2").textContent = 'Nova Ferramenta';
  modal.classList.remove("hidden");
  modal.classList.add("flex");
});

    botaoFechar.addEventListener("click", () => {
      modal.classList.remove("flex");
      modal.classList.add("hidden");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("flex");
        modal.classList.add("hidden");
      }
    });


    document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formularioNovaFerramenta");
  const tabela = document.getElementById("tbEstoque");
  const modal = document.getElementById("formModal");

 formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const id = document.getElementById("idEdicao").value;
  const nome = document.getElementById("nome").value;
  const quantidade = document.getElementById("quantidade").value;
  const categoria = document.getElementById("categoria").value;
  const localizacao = document.getElementById("localizacao").value;

  if (id) {
    const linha = document.querySelector(`.btn-editar[data-id="${id}"]`).closest('tr');
    linha.cells[1].textContent = nome;
    linha.cells[2].textContent = quantidade;
    linha.cells[3].textContent = categoria;
    linha.cells[4].textContent = localizacao;
  } else {
    const codigo = tabela.rows.length + 1;
    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
      <td>${codigo.toString().padStart(3, '0')}</td>
      <td>${nome}</td>
      <td>${quantidade}</td>
      <td>${categoria}</td>
      <td>${localizacao}</td>
      <td><a href="#" class="btn-editar" data-id="${codigo}"><i class="fa fa-pen-to-square text-warning"></i></a></td>
    `;
    tabela.appendChild(novaLinha);
  }

  formulario.reset();
  document.getElementById("idEdicao").value = '';
  modal.classList.remove("flex");
  modal.classList.add("hidden");

  window.atualizarFiltros && window.atualizarFiltros();
});

  document.addEventListener('click', function(e) {
    if (e.target.closest('.btn-editar')) {
      e.preventDefault();
      const btnEditar = e.target.closest('.btn-editar');
      const id = btnEditar.getAttribute('data-id');
      editarFerramenta(id);
    }
  });

  function editarFerramenta(id) {
    const linha = document.querySelector(`.btn-editar[data-id="${id}"]`).closest('tr');
    
    const codigo = linha.cells[0].textContent;
    const nome = linha.cells[1].textContent;
    const quantidade = linha.cells[2].textContent;
    const categoria = linha.cells[3].textContent;
    const localizacao = linha.cells[4].textContent;
    document.getElementById('nome').value = nome;
    document.getElementById('quantidade').value = quantidade;
    document.getElementById('categoria').value = categoria;
    document.getElementById('localizacao').value = localizacao;

    const modal = document.getElementById('formModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');

  
    modal.querySelector('h2').textContent = 'Editar Ferramenta';


    document.getElementById('idEdicao').value = id;
  }
});


function filtrarTabela() {
  const inputPesquisa = document.querySelector('.form-control'); 
  const selectLocalizacao = document.querySelector('.form-select'); 
  const tabela = document.getElementById('tbEstoque');
  const linhas = tabela.getElementsByTagName('tr');

  const termoPesquisa = inputPesquisa.value.toLowerCase();
  const localizacaoSelecionada = selectLocalizacao.value;

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i];
    const colunas = linha.getElementsByTagName('td');
    let deveMostrar = true;

   
    if (termoPesquisa) {
      const nome = colunas[1].textContent.toLowerCase();
      const codigo = colunas[0].textContent.toLowerCase();
      const categoria = colunas[3].textContent.toLowerCase();
      
      if (!nome.includes(termoPesquisa) && !categoria.includes(termoPesquisa) && !codigo.includes(termoPesquisa)) {
        deveMostrar = false;
      }
    }

    if (localizacaoSelecionada && localizacaoSelecionada !== 'Localização') {
      const localizacao = colunas[4].textContent;
      if (localizacao !== localizacaoSelecionada) {
        deveMostrar = false;
      }
    }

    if (deveMostrar) {
      linha.style.display = '';
    } else {
      linha.style.display = 'none';
    }
  }


const linhasVisiveis = Array.from(linhas).filter(linha => linha.style.display !== 'none');
if (linhasVisiveis.length === 0) {

  const mensagem = document.getElementById('mensagem-sem-resultados') || 
    document.createElement('div');
  mensagem.id = 'mensagem-sem-resultados';
  mensagem.className = 'alert alert-info mt-3';
  mensagem.textContent = 'Nenhum resultado encontrado.';
  
  if (!document.getElementById('mensagem-sem-resultados')) {
    tabela.parentNode.insertAdjacentElement('afterend', mensagem);
  }
} else {
  const mensagem = document.getElementById('mensagem-sem-resultados');
  if (mensagem) mensagem.remove();
}
}


document.addEventListener('DOMContentLoaded', function() {

  document.querySelector('.form-control').addEventListener('input', filtrarTabela);
  

  document.querySelector('.form-select').addEventListener('change', filtrarTabela);
});

document.addEventListener("DOMContentLoaded", function() {

  function extrairLocalizacoesUnicas() {
    const tabela = document.getElementById('tbEstoque');
    const linhas = tabela.getElementsByTagName('tr');
    const localizacoes = new Set(); 


    localizacoes.add("AA07CD");
    localizacoes.add("AA05BE");
    
 
    for (let i = 0; i < linhas.length; i++) {
      const colunas = linhas[i].getElementsByTagName('td');
      if (colunas.length > 4) { 
        const localizacao = colunas[4].textContent.trim();
        if (localizacao) {
          localizacoes.add(localizacao);
        }
      }
    }
    
    return Array.from(localizacoes).sort(); 
  }


  function popularFiltroLocalizacao() {
    const select = document.getElementById('filtroLocalizacao');
    const localizacoes = extrairLocalizacoesUnicas();
    

    while (select.options.length > 1) {
      select.remove(1);
    }
    

    localizacoes.forEach(localizacao => {
      const option = document.createElement('option');
      option.value = localizacao;
      option.textContent = localizacao;
      select.appendChild(option);
    });
  }


  popularFiltroLocalizacao();

  window.atualizarFiltros = popularFiltroLocalizacao;
});

  
