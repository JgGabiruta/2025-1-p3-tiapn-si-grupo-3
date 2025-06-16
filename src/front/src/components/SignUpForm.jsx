import React, { useState } from 'react';

/**
 * Componente do formulário de cadastro em múltiplas etapas.
 * Gerencia o cadastro de um novo funcionário e seu respectivo administrador.
 * @param {object} props - As propriedades do componente.
 * @param {function} props.onSignUpSuccess - Callback para ser executado após um cadastro bem-sucedido.
 */
function SignUpForm({ onSignUpSuccess }) {
  const [currentStep, setCurrentStep] = useState(0); // Controla a etapa atual do formulário
  const [message, setMessage] = useState(''); // Estado para mensagens de feedback
  const [messageType, setMessageType] = useState(''); // 'success' ou 'error'

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    cargo: '',
    cpf: '',
    telefone: '',
    nascimento: '',
    rua: '',
    numero: '',
    cidade: ''
  });

  /**
   * Atualiza o estado do formulário conforme o usuário digita.
   * Aplica formatação para CPF e Telefone.
   * @param {Event} e - O evento de mudança do input.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'telefone') {
      setFormData(prev => ({ ...prev, [name]: formatarTelefone(value) }));
    } else if (name === 'cpf') {
      setFormData(prev => ({ ...prev, [name]: formatarCPF(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  /**
   * Formata uma string de telefone para o padrão (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.
   * @param {string} value - O valor do telefone.
   * @returns {string} O telefone formatado.
   */
  const formatarTelefone = (value) => {
    let v = value.replace(/\D/g, ''); // Remove tudo que não é dígito
    if (v.length > 11) v = v.slice(0, 11); // Limita a 11 dígitos

    // Aplica a formatação
    v = v.replace(/(\d{2})(\d)/, '($1) $2');
    v = v.replace(/(\d{5})(\d)/, '$1-$2');
    return v;
  };

  /**
   * Formata uma string de CPF para o padrão XXX.XXX.XXX-XX.
   * @param {string} value - O valor do CPF.
   * @returns {string} O CPF formatado.
   */
  const formatarCPF = (value) => {
    let v = value.replace(/\D/g, ''); // Remove tudo que não é dígito
    if (v.length > 11) v = v.slice(0, 11); // Limita a 11 dígitos

    // Aplica a formatação
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{2})$/, '$1-$2');
    return v;
  };

  /**
   * Avança para a próxima etapa do formulário, com validação.
   */
  const nextStep = () => {
    setMessage(''); // Limpa mensagens anteriores
    setMessageType('');

    // Validação da Etapa 1
    if (currentStep === 0) {
      if (!formData.nome || !formData.email || !formData.senha) {
        setMessage('Por favor, preencha nome, e-mail e senha para prosseguir.');
        setMessageType('error');
        return;
      }
      // Validação de e-mail básico
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setMessage('Por favor, insira um e-mail válido.');
        setMessageType('error');
        return;
      }
      // Validação de senha mínima
      if (formData.senha.length < 6) {
        setMessage('A senha deve ter pelo menos 6 caracteres.');
        setMessageType('error');
        return;
      }
    }
    // Validação da Etapa 2
    else if (currentStep === 1) {
      if (!formData.cargo || !formData.cpf || !formData.telefone || !formData.nascimento) {
        setMessage('Por favor, preencha todos os campos de funcionário para prosseguir.');
        setMessageType('error');
        return;
      }
      // Validação básica de CPF e telefone
      if (formData.cpf.replace(/\D/g, '').length !== 11) {
        setMessage('Por favor, insira um CPF válido (11 dígitos).');
        setMessageType('error');
        return;
      }
      if (formData.telefone.replace(/\D/g, '').length < 10) {
        setMessage('Por favor, insira um telefone válido (mínimo 10 dígitos com DDD).');
        setMessageType('error');
        return;
      }
    }

    setCurrentStep(prev => prev + 1);
  };

  /**
   * Volta para a etapa anterior do formulário.
   */
  const prevStep = () => {
    setMessage(''); // Limpa mensagens
    setMessageType('');
    setCurrentStep(prev => prev - 1);
  };

  /**
   * Lida com o envio final do formulário após todas as etapas.
   * @param {Event} e - O evento de envio do formulário.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Limpa mensagens anteriores
    setMessageType('');

    // Validação final de todos os campos antes de enviar
    if (
      !formData.nome || !formData.email || !formData.senha ||
      !formData.cargo || !formData.cpf || !formData.telefone || !formData.nascimento ||
      !formData.rua || !formData.numero || !formData.cidade
    ) {
      setMessage('Por favor, preencha todos os campos do formulário para finalizar o cadastro.');
      setMessageType('error');
      return;
    }

    try {
      // 1º passo: cadastrar o funcionário
      const resFunc = await fetch('/api/funcionario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          cargo: formData.cargo,
          telefone: formData.telefone.replace(/\D/g, ''), // Envia apenas dígitos
          data_nascimento: formData.nascimento,
          rua: formData.rua,
          numero: formData.numero,
          cidade: formData.cidade,
          cpf: formData.cpf.replace(/\D/g, '') // Envia apenas dígitos
        })
      });

      if (!resFunc.ok) {
        const err = await resFunc.json();
        setMessage(err.error || 'Erro ao cadastrar funcionário.');
        setMessageType('error');
        return;
      }

      const jsonFunc = await resFunc.json();
      const funcionarioId = jsonFunc.id; // Assumindo que o ID do funcionário é retornado

      // 2º passo: cadastrar o administrador, informando funcionario_codigo
      const resAdm = await fetch('/api/administrador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          senha: formData.senha,
          funcionario_codigo: funcionarioId // Associa o administrador ao funcionário recém-criado
        })
      });

      if (!resAdm.ok) {
        const errAdm = await resAdm.json();
        setMessage(errAdm.error || 'Erro ao cadastrar administrador.');
        setMessageType('error');
        return;
      }

      setMessage('Cadastro realizado com sucesso!');
      setMessageType('success');
      // Limpa o formulário
      setFormData({
        nome: '', email: '', senha: '', cargo: '', cpf: '',
        telefone: '', nascimento: '', rua: '', numero: '', cidade: ''
      });
      setCurrentStep(0); // Volta para a primeira etapa
      onSignUpSuccess(); // Chama o callback para o componente pai (AuthPage)
    } catch (error) {
      console.error("Erro na requisição:", error);
      setMessage('Erro ao conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.');
      setMessageType('error');
    }
  };

  return (
    <div className="form-container sign-up-container">
      <h1>Criar conta</h1>
      <form id="multiStepForm" onSubmit={handleSubmit}>
        {/* Etapa 1: Dados básicos do administrador */}
        <div className={`step ${currentStep === 0 ? 'active' : ''}`}>
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={nextStep}>Próximo</button>
        </div>

        {/* Etapa 2: Dados do funcionário (pessoais) */}
        <div className={`step ${currentStep === 1 ? 'active' : ''}`}>
          <input
            type="text"
            name="cargo"
            placeholder="Cargo"
            value={formData.cargo}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            maxLength="14"
            value={formData.cpf} // O formatarCPF já está sendo chamado no onChange
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            maxLength="15"
            value={formData.telefone} // O formatarTelefone já está sendo chamado no onChange
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="nascimento"
            placeholder="Data de nascimento"
            value={formData.nascimento}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={prevStep}>Voltar</button>
          <button type="button" onClick={nextStep}>Próximo</button>
        </div>

        {/* Etapa 3: Dados de endereço do funcionário */}
        <div className={`step ${currentStep === 2 ? 'active' : ''}`}>
          <input
            type="text"
            name="rua"
            placeholder="Rua"
            value={formData.rua}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="numero"
            placeholder="Número"
            value={formData.numero}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cidade"
            placeholder="Cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={prevStep}>Voltar</button>
          <button type="submit">Criar Conta</button>
        </div>
      </form>
      {/* Exibe a mensagem de feedback se houver uma */}
      {message && (
        <p className={`message-box ${messageType === 'success' ? 'message-success' : 'message-error'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default SignUpForm;
