// login.js

//------------------------------------------
// Funções para passar para próximo e anterior (multi-etapas)
let currentStep = 0;
const steps = document.querySelectorAll('.sign-up-container .step');

function showStep(index) {
  steps.forEach((step, i) =>
    step.classList.toggle('active', i === index)
  );
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
}

//------------------------------------------
// Funções para formatar CPF e telefone
function formatarTelefone(input) {
  let v = input.value.replace(/\D/g, '');
  if (v.length > 11) v = v.slice(0, 11);
  v = v.replace(/(\d{2})(\d)/, '($1) $2');
  v = v.replace(/(\d{5})(\d)/, '$1-$2');
  input.value = v;
}

function formatarCPF(input) {
  let v = input.value.replace(/\D/g, '');
  if (v.length > 11) v = v.slice(0, 11);
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d{2})$/, '$1-$2');
  input.value = v;
}

//----------------------------------------------
// Cadastro multi-etapas para Funcionário + Administrador
const multiStepForm = document.getElementById('multiStepForm');
multiStepForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;

  // 1) Extrai todos os campos do formulário
  const data = {
    nome:       form.nome.value.trim(),
    cargo:      form.cargo.value.trim(),
    telefone:   form.telefone.value.trim(),
    cpf:        form.cpf.value.trim(),         // se a tabela Funcionario tiver campo `cpf`
    nascimento: form.nascimento.value,         // campo DATE
    rua:        form.rua.value.trim(),
    numero:     form.numero.value.trim(),
    cidade:     form.cidade.value.trim(),

    // Campos para administrador:
    email:      form.email.value.trim(),
    senha:      form.senha.value.trim()
  };

  // 2) Validação mínima dos campos de Funcionario
  if (
    !data.nome ||
    !data.cargo ||
    !data.telefone ||
    !data.cpf ||
    !data.nascimento ||
    !data.rua ||
    !data.numero ||
    !data.cidade
  ) {
    alert('Preencha todos os campos de funcionário!');
    return;
  }

  // 3) Validação dos campos de Administrador
  if (!data.email || !data.senha) {
    alert('Preencha email e senha para o administrador!');
    return;
  }

  try {
    
    // 4) 1º passo: cadastrar o funcionário
    const resFunc = await fetch('http://localhost:3000/funcionario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome:         data.nome,
        cargo:        data.cargo,
        telefone:     data.telefone,
        data_nascimento: data.nascimento,  // OBS: “data_nascimento” deve bater com o nome da coluna no INSERT
        rua:          data.rua,
        numero:       data.numero,
        cidade:       data.cidade,
        cpf:          data.cpf            // só enviar se a coluna existir
      })
    });

    if (!resFunc.ok) {
      const err = await resFunc.json();
      alert(err.error || 'Erro ao cadastrar funcionário');
      return;
    }

    // 5) Ler o JSON de resposta para pegar o ID do funcionário recém-criado
    const jsonFunc = await resFunc.json();
    const funcionarioId = jsonFunc.id; // valor retornado pelo backend (insertId)

    // 6) 2º passo: cadastrar o administrador, informando funcionario_codigo
    const resAdm = await fetch('http://localhost:3000/administrador', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email:      data.email,
        senha:      data.senha,
        funcionario_codigo: funcionarioId
      })
    });

    if (!resAdm.ok) {
      const errAdm = await resAdm.json();
      alert(errAdm.error || 'Erro ao cadastrar administrador');
      return;
    }

    // 7) Se chegamos aqui, ambos deram OK:
    alert('Cadastro realizado com sucesso!');
    form.reset();
    currentStep = 0;
    showStep(currentStep);
    container.classList.remove('right-panel-active');
  } catch (error) {
    console.error(error);
    alert('Erro ao conectar ao servidor');
  }
});

//------------------------------------------
// Controle do painel “Login / Criar Conta”
const container = document.getElementById('container');
document.getElementById('sign-up').addEventListener('click', () => {
  container.classList.add('right-panel-active');
});
document.getElementById('sign-in').addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});

//------------------------------------------
// Login de usuário (rota /login)
const signInForm = document.querySelector('.sign-in-container form');
signInForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // No HTML, o placeholder de senha é "Password"
  const email = signInForm.querySelector('input[placeholder="Email"]').value.trim();
  const senha = signInForm.querySelector('input[placeholder="Password"]').value.trim();

  if (!email || !senha) {
    alert('Preencha todos os campos!');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    const data = await response.json();
    if (response.ok) {
      alert('Login bem-sucedido!');
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/dashboard.html';
    } else {
      alert(data.error || 'Credenciais inválidas.');
    }
  } catch (err) {
    console.error(err);
    alert('Erro ao conectar ao servidor.');
  }
});
