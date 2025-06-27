import React from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom'; // 1. Importa os hooks necessários
import {
  HomeIcon,
  ShoppingCartIcon,
  UsersIcon,
  CalendarDaysIcon,
  WrenchIcon,
  Cog6ToothIcon,
  BuildingOfficeIcon,
} from './IconComponents'; 

// 2. O componente não precisa mais receber props para controlar o estado
const SideBarTailwind = () => {
  const navigate = useNavigate(); // Hook para navegar
  const location = useLocation(); // Hook para saber a URL atual

  // 3. Adicionamos a propriedade "path" em cada item
  const navItems = [
    { name: 'Início', icon: HomeIcon, path: '/Home' },
    { name: 'Empréstimos', icon: ShoppingCartIcon, path: '/Emprestimo' },
    { name: 'Funcionários', icon: UsersIcon, path: '/Funcionarios' },
    { name: 'Agenda', icon: CalendarDaysIcon, path: '/Agenda' },
    { name: 'Estoque', icon: WrenchIcon, path: '/Estoque' },
    { name: 'Configuração', icon: Cog6ToothIcon, path: '/Configuracao' },
    { name: 'Departamento', icon: BuildingOfficeIcon, path: '/Departamento' },
  ];

  return (
    <aside className="w-64 bg-gray-100 text-gray-800 flex-shrink-0">
      <nav className="p-4">
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            // 4. A SideBarTailwind agora sabe qual item está ativo comparando o path
            const isActive = location.pathname === item.path; 

            return (
              <li key={item.name} className="px-2 mb-1">
                <a
                  href={item.path} // É uma boa prática manter o href por acessibilidade
                  onClick={(e) => {
                    e.preventDefault(); // Previne o recarregamento da página
                    navigate(item.path); // 5. Usa o navigate para mudar de página
                  }}
                  className={`flex items-center py-2.5 px-4 rounded-md transition-colors duration-200
                  ${isActive
                    ? 'bg-gray-300 text-violet-900 font-bold shadow-sm'
                    : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className={`w-6 h-6 mr-3 ${isActive ? 'text-yellow-500' : 'text-gray-500'}`} />
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBarTailwind;