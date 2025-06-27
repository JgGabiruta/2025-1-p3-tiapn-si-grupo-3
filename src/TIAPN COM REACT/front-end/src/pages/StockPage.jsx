import React, { useEffect, useState } from 'react';
import StockTable from '../components/StockTable';
import AddItemModal from '../components/AddItemModal';
import { PlusIcon } from '../components/IconComponents';
import { getFerramentas, addFerramenta, updateFerramenta, deleteFerramenta } from '../services/api';

// Importa os componentes de layout
import HeaderTailwind from '../components/HeaderTailwind';
import SideBarTailwind from '../components/SideBarTailwind';

import tailwindStylesHref from '../index.css?url'; 

const STYLESHEET_ID = 'tailwind-dynamic-stockpage-styles';

function StockPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [stockItems, setStockItems] = useState([]);
  const [filteredStockItems, setFilteredStockItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.id = STYLESHEET_ID;
    link.rel = 'stylesheet';
    link.href = tailwindStylesHref;
    document.head.appendChild(link);

    return () => {
      const styleElement = document.getElementById(STYLESHEET_ID);
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  const fetchStockItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getFerramentas();
      setStockItems(data);
      setFilteredStockItems(data);
    } catch (err) {
      console.error("Failed to fetch stock items:", err);
      setError("Não foi possível carregar os itens de estoque.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStockItems();
  }, []);

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const results = stockItems.filter(item =>
      (item.Nome?.toLowerCase() || '').includes(lowercasedSearchTerm) ||
      (String(item.Codigo) || '').toLowerCase().includes(lowercasedSearchTerm) ||
      (item.Tipo?.toLowerCase() || '').includes(lowercasedSearchTerm) ||
      (item.Quantidade !== undefined && String(item.Quantidade).toLowerCase().includes(lowercasedSearchTerm)) ||
      (item.Localizacao?.toLowerCase() || '').includes(lowercasedSearchTerm)
    );
    setFilteredStockItems(results);
  }, [searchTerm, stockItems]);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => { setIsModalOpen(false); setCurrentItem(null); };

  // --- FUNÇÕES PREENCHIDAS ---

  const handleEditItemStart = (itemCodigo) => {
    const itemToEdit = stockItems.find(i => i.Codigo === itemCodigo);
    if (itemToEdit) {
      setCurrentItem(itemToEdit);
      openModal();
    }
  };

  const handleSaveItem = async (itemDataFromModal) => {
    const processedData = {
      nome: itemDataFromModal.nome,
      tipo: itemDataFromModal.tipo,
      quantidade: parseInt(itemDataFromModal.quantidade, 10),
      localizacao: itemDataFromModal.localizacao
    };

    try {
      if (currentItem) {
        await updateFerramenta(currentItem.Codigo, processedData);
        alert('Item atualizado com sucesso!');
      } else {
        await addFerramenta(processedData);
        alert('Item adicionado com sucesso!');
      }
      await fetchStockItems();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar item:', error);
      alert('Erro ao salvar item. Verifique o console para mais detalhes.');
    }
  };

  const handleDeleteItem = async (codigo) => {
    if (!window.confirm(`Tem certeza que deseja excluir o item com código ${codigo}?`)) {
      return;
    }
    try {
      await deleteFerramenta(codigo);
      alert('Item excluído com sucesso!');
      await fetchStockItems();
    } catch (error) {
      console.error('Erro ao excluir item:', error);
      alert('Erro ao excluir item. Verifique o console para mais detalhes.');
    }
  };

  const handleSearchChange = (event) => { setSearchTerm(event.target.value); };

  // ... o resto do código (isLoading, error, return) continua exatamente o mesmo ...
  
  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <HeaderTailwind />
        <div className="flex">
          <SideBarTailwind />
          <main className="flex-1 flex justify-center items-center p-8">
            <p>Carregando dados...</p>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <HeaderTailwind />
        <div className="flex">
          <SideBarTailwind />
          <main className="flex-1 flex justify-center items-center p-8 text-red-600">
            <p>{error}</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeaderTailwind />
      <div className="flex">
        <SideBarTailwind />
        <main className="flex-1 p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Estoque</h1>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Pesquisar no Estoque..."
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 w-full max-w-xs md:w-80"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button
                onClick={() => {
                  setCurrentItem(null);
                  openModal();
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-slate-800 font-semibold py-2.5 px-5 rounded-md flex items-center transition-colors duration-200"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Nova Ferramenta</span>
              </button>
            </div>
          </div>
          <StockTable
            dataToDisplay={filteredStockItems}
            onDeleteItem={handleDeleteItem}
            onEditItem={handleEditItemStart}
          />
        </main>
      </div>
      <AddItemModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSaveItem={handleSaveItem}
        itemToEdit={currentItem}
      />
    </div>
  );
}

export default StockPage;