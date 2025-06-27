import React, { useState, useEffect } from 'react';
import { updateEmployee, deleteEmployee } from '../services/api.js';

// Funções de máscara... (continua igual)
const mascaraCPF = (value) => { /* ...código da máscara... */ return value.replace(/\D/g,'').slice(0,11).replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2')};
const mascaraTelefone = (value) => { /* ...código da máscara... */ let v=value.replace(/\D/g,'').slice(0,11); if(v.length<=10){return v.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3')}else{return v.replace(/(\d{2})(\d{5})(\d{0,4})/,'($1) $2-$3')}};

// 👇 As props onSave e onDelete foram renomeadas para onSuccess
const EditEmployeeModal = ({ isOpen, onClose, onSuccess, employeeData }) => {
  
  const [formData, setFormData] = useState({});

  useEffect(() => {

    if (employeeData){

      const formattedData = {

        ...employeeData,
        Data_Nascimento: employeeData.Data_Nascimento 
          ? new Date(employeeData.Data_Nascimento).toISOString().split('T')[0] 
          : '',
      };
      setFormData(formattedData);
    }
  }, [employeeData]);

  const handleChange = (e) => {

    const { name, value } = e.target;
    let finalValue = value;

    if (name === 'CPF') finalValue = mascaraCPF(value);
    if (name === 'Telefone') finalValue = mascaraTelefone(value);

    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      await updateEmployee(formData.Codigo, formData);
      onSuccess(); // 👇 Notifica o sucesso

    } catch (error) {
      
      console.error("Erro ao atualizar:", error);
      alert(`Erro ao atualizar: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Tem certeza que deseja excluir ${formData.Nome}?`)) {
      try {
        await deleteEmployee(formData.Codigo);
        onSuccess(); // 👇 Notifica o sucesso
      } catch (error) {
        console.error("Erro ao excluir:", error);
        alert(`Erro ao excluir: ${error.message}`);
      }
    }
  };

  if (!isOpen) return null;

  return (
    // O JSX do formulário continua exatamente o mesmo
    <div id="Popup-EditarFuncionario" style={{ display: 'block' }}>
      <div className="popup-conteudo">
        <div id="botaofechar"><i className="fa fa-x" onClick={onClose}></i></div>
        <form id="ajustaflex" onSubmit={handleUpdate}>
            {/* ...todos os seus inputs... */}
            <label htmlFor="cod-funci-popup-editar">Código</label>
            <input type="number" name="Codigo" id="cod-funci-popup-editar" value={formData.Codigo || ''} readOnly />

            <label htmlFor="cargo-funci-popup-editar">Cargo:</label>
            <input type="text" name="Cargo" id="cargo-funci-popup-editar" value={formData.Cargo || ''} onChange={handleChange} />

            <label htmlFor="nome-funci-popup-editar">Nome:</label>
            <input type="text" name="Nome" id="nome-funci-popup-editar" value={formData.Nome || ''} onChange={handleChange} required />

            <label htmlFor="telefone-funci-popup-editar">Telefone:</label>
            <input type="text" name="Telefone" id="telefone-funci-popup-editar" value={formData.Telefone || ''} onChange={handleChange} />

            <label htmlFor="datanasc-funci-popup-editar">Data de Nascimento:</label>
            <input type="date" name="Data_Nascimento" id="datanasc-funci-popup-editar" value={formData.Data_Nascimento || ''} onChange={handleChange} />

            <label htmlFor="rua-funci-popup-editar">Rua:</label>
            <input type="text" name="Rua" id="rua-funci-popup-editar" value={formData.Rua || ''} onChange={handleChange} />

            <label htmlFor="numero-funci-popup-editar">Número:</label>
            <input type="number" name="Numero" id="numero-funci-popup-editar" value={formData.Numero || ''} onChange={handleChange} />

            <label htmlFor="cidade-funci-popup-editar">Cidade:</label>
            <input type="text" name="Cidade" id="cidade-funci-popup-editar" value={formData.Cidade || ''} onChange={handleChange} />

            <label htmlFor="cpf-funci-popup-editar">CPF:</label>
            <input type="text" name="CPF" id="cpf-funci-popup-editar" value={formData.CPF || ''} onChange={handleChange} required />

            <label htmlFor="departamento-funci-popup-editar">Departamento:</label>
            <input type="number" name="Departamento_Codigo" id="departamento-funci-popup-editar" value={formData.Departamento_Codigo || ''} onChange={handleChange} />
            <div id="ajustarobotao">
                <button type="submit" id="Salvar-Funcionario-Editar">Salvar</button>
                <button type="button" id="Excluir-Funcionario" onClick={handleDelete}>Excluir</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;