import React from 'react';

const EmployeeCard = ({ employee, onEdit }) => {
  return (
    <div className="funcionario">
      <div className="img-funcionario"></div>
      <div className="info-funcionario">
        <div className="nome-funci"><p>Nome: {employee.Nome}</p></div>
        <div className="cod-funci"><p>Código: {employee.Codigo}</p></div>
        <div className="cpf-funci"><p>CPF: {employee.CPF}</p></div>
      </div>
      <span className="iconefunci" onClick={() => onEdit(employee.Codigo)}>
        <i className="fa fa-pencil"></i>
      </span>
    </div>
  );
};

export default EmployeeCard;