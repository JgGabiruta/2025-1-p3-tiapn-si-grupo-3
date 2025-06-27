import React, { useState } from 'react';
import { createEmployee } from '../services/api.js';

// Funções de máscara... (continua igual)
const mascaraCPF = (value) => { /* ...código da máscara... */ return value.replace(/\D/g,'').slice(0,11).replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2')};
const mascaraTelefone = (value) => { /* ...código da máscara... */ let v=value.replace(/\D/g,'').slice(0,11); if(v.length<=10){return v.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3')}else{return v.replace(/(\d{2})(\d{5})(\d{0,4})/,'($1) $2-$3')}};


// 👇 A prop onSave foi renomeada para onSuccess para maior clareza
const AddEmployeeModal = ({ isOpen, onClose, onSuccess }) => { 
  const initialFormState = {
    Cargo: '', Nome: '', Telefone: '', Data_Nascimento: '',
    Rua: '', Numero: '', Cidade: '', CPF: '', Departamento_Codigo: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
      const { name, value } = e.target;
      let finalValue = value;
      if (name === 'CPF') finalValue = mascaraCPF(value);
      if (name === 'Telefone') finalValue = mascaraTelefone(value);
      setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
          ...formData,
          Departamento_Codigo: formData.Departamento_Codigo ? parseInt(formData.Departamento_Codigo, 10) : null,
          Numero: formData.Numero ? parseInt(formData.Numero, 10) : null,
      }
      await createEmployee(dataToSend); // Apenas esperamos a confirmação de que salvou
      onSuccess(); // 👇 Apenas notificamos o App.jsx do sucesso
      setFormData(initialFormState);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert(`Erro ao salvar: ${error.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    // O JSX do formulário continua exatamente o mesmo
    <div id="Popup-NovoFuncionario" style={{ display: 'block' }}>
      <div className="popup-conteudo">
        <div id="botaofechar"><i className="fa fa-x" onClick={onClose}></i></div>
        <form id="ajustaflex" onSubmit={handleSubmit}>
          {/* ...todos os seus inputs... */}
          <label htmlFor="cargo-funci-popup">Cargo</label>
          <input type="text" name="Cargo" value={formData.Cargo} onChange={handleChange} id="cargo-funci-popup" />

          <label htmlFor="nome-funci-popup">Nome:</label>
          <input type="text" name="Nome" value={formData.Nome} onChange={handleChange} id="nome-funci-popup" required />

          <label htmlFor="telefone-funci-popup">Telefone</label>
          <input type="text" name="Telefone" value={formData.Telefone} onChange={handleChange} id="telefone-funci-popup" />

          <label htmlFor="datanasc-funci-popup">Data De Nascimento</label>
          <input type="date" name="Data_Nascimento" value={formData.Data_Nascimento} onChange={handleChange} id="datanasc-funci-popup" />

          <label htmlFor="rua-funci-popup">Rua</label>
          <input type="text" name="Rua" value={formData.Rua} onChange={handleChange} id="rua-funci-popup" />

          <label htmlFor="numero-funci-popup">Numero</label>
          <input type="number" name="Numero" value={formData.Numero} onChange={handleChange} id="numero-funci-popup" />

          <label htmlFor="cidade-funci-popup">Cidade</label>
          <input type="text" name="Cidade" value={formData.Cidade} onChange={handleChange} id="cidade-funci-popup" />

          <label htmlFor="cpf-funci-popup">CPF</label>
          <input type="text" name="CPF" value={formData.CPF} onChange={handleChange} id="cpf-funci-popup" required />
          
          <label htmlFor="departamento-funci-popup">Departamento:</label>
          <input type="number" name="Departamento_Codigo" value={formData.Departamento_Codigo} onChange={handleChange} id="departamento-funci-popup" />

          <button type="submit" id="Salvar-Funcionario">Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;