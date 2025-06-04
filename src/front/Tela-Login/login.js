// Script para que o front da pagina de login funcione devidamente

// Funções para passar para próximo e anterior
let currentStep = 0;
    const steps = document.querySelectorAll('.sign-up-container .step');

    function showStep(index) {
      steps.forEach((step, i) => step.classList.remove('active' /*, i === index */));
      setTimeout(() => {
        steps[index].classList.add('active');
      }, 10);
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
// Funções para formatar o cpf e o telefone
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

  
const container = document.getElementById('container');
document.getElementById('sign-up').addEventListener('click', () => {
  container.classList.add('right-panel-active');
});
document.getElementById('sign-in').addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});

// Cadastro de usuário
const signUpForm = document.querySelector('.sign-up-container form');
signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = signUpForm.querySelector('input[placeholder="Name"]').value.trim();
  const email = signUpForm.querySelector('input[placeholder="Email"]').value.trim();
  const senha = signUpForm.querySelector('input[placeholder="Password"]').value.trim();

  if (!nome || !email || !senha) {
    alert('Preencha todos os campos!');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/administrador', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });
    const data = await response.json();
    if (response.ok) {
      alert('Cadastro realizado com sucesso!');
      container.classList.remove('right-panel-active'); // volta para login
      signUpForm.reset();
    } else {
      alert(data.error || 'Erro ao cadastrar');
    }
  } catch (err) {
    console.error(err);
    alert('Erro ao conectar ao servidor.');
  }
});

// Login de usuário
const signInForm = document.querySelector('.sign-in-container form');
signInForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = signInForm.querySelector('input[placeholder="Email"]').value.trim();
  const senha = signInForm.querySelector('input[placeholder="Password"]').value.trim();

  if (!email || !senha) {
    alert('Preencha todos os campos!');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    const data = await response.json();
    if (response.ok) {
      alert('Login bem-sucedido!');
      localStorage.setItem('user', JSON.stringify(data.user));
      // Redirecionar para área protegida
      window.location.href = '/dashboard.html';
    } else {
      alert(data.error || 'Credenciais inválidas.');
    }
  } catch (err) {
    console.error(err);
    alert('Erro ao conectar ao servidor.');
  }
});
