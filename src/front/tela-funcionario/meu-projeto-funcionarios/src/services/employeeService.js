const API_URL = "http://localhost:3000/funcionario";

// Função para buscar todos os funcionários
export const getEmployees = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Erro ao buscar funcionários.");
  return response.json();
};

// Função para buscar um único funcionário pelo código
export const getEmployeeById = async (codigo) => {
  const response = await fetch(`${API_URL}/${codigo}`);
  if (!response.ok) throw new Error("Erro ao buscar dados do funcionário.");
  return response.json();
};

// Função para criar um novo funcionário
export const createEmployee = async (employeeData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employeeData)
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao salvar funcionário.");
  }
  return response.json();
};

// Função para atualizar um funcionário
export const updateEmployee = async (codigo, employeeData) => {
  const response = await fetch(`${API_URL}/${codigo}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employeeData)
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao atualizar funcionário.");
  }
  return response.json();
};

// Função para excluir um funcionário
export const deleteEmployee = async (codigo) => {
  const response = await fetch(`${API_URL}/${codigo}`, {
    method: "DELETE"
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao excluir funcionário.");
  }
  return response.json();
};