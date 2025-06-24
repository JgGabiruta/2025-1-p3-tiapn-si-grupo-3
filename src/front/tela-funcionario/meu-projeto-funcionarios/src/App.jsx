import React, { useState, useEffect, useMemo } from 'react';
import Layout from './components/Layout';
import EmployeeCard from './components/EmployeeCard';
import AddEmployeeModal from './components/AddEmployeeModal';
import EditEmployeeModal from './components/EditEmployeeModal';
import { getEmployees, getEmployeeById } from './services/employeeService';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Função para buscar os funcionários (nossa fonte da verdade)
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredEmployees = useMemo(() =>
    employees.filter(emp =>
      emp.Nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.Codigo.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ), [employees, searchTerm]);

  const handleOpenEditModal = async (codigo) => {
    try {
      const employeeData = await getEmployeeById(codigo);
      setSelectedEmployee(employeeData);
      setEditModalOpen(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCloseModals = () => {
    setAddModalOpen(false);
    setEditModalOpen(false);
    setSelectedEmployee(null);
  };
  
  // 👇 LÓGICA CORRIGIDA AQUI 👇
  // Agora, após qualquer operação, apenas fechamos o modal e buscamos a lista inteira de novo.
  const handleSuccess = () => {
    handleCloseModals();
    fetchEmployees();
  };

  return (
    <Layout searchTerm={searchTerm} onSearchChange={handleSearchChange}>
      <div id="form-funcionario">
        <input 
          type="text" 
          id="search-funcionario" 
          placeholder="Buscar Funcionario"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{display: 'none'}}
        />
        <i className="fa fa-search" style={{display: 'none'}}></i>
      </div>

      <button id="Novo-funcionario" onClick={() => setAddModalOpen(true)}>
        Novo Funcionario <i className="fa fa-plus-circle"></i>
      </button>

      <section id="lista-funcionarios">
        {loading && <p>Carregando funcionários...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && filteredEmployees.map(employee => (
          <EmployeeCard key={employee.Codigo} employee={employee} onEdit={handleOpenEditModal} />
        ))}
      </section>

      {/* Passando a nova função handleSuccess para os modais */}
      <AddEmployeeModal 
        isOpen={isAddModalOpen}
        onClose={handleCloseModals}
        onSuccess={handleSuccess}
      />
      
      <EditEmployeeModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModals}
        onSuccess={handleSuccess}
        employeeData={selectedEmployee}
      />
    </Layout>
  );
}

export default App;