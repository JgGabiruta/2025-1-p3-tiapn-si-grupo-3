import React, { useState, useEffect, useCallback } from "react";
import Calendar from "../components/Calendar";
import AddEventModal from "../components/AddEventModal";
import { CalendarDaysIcon } from "../components/IconComponents";
import {
  getEmprestimos,
  getEventos,
  addEvento,
  updateEvento,
  deleteEvento,
} from "../services/api";

// Importa seus componentes de layout e o CSS
import HeaderTailwind from '../components/HeaderTailwind';
import SideBarTailwind from '../components/SideBarTailwind';
import agendaStylesHref from '../index.css?url'; 

const typeColorMap = {
  Retirada: "bg-green-500",
  Devolução: "bg-yellow-500",
  Evento: "bg-purple-500",
};

const STYLESHEET_ID = 'tailwind-dynamic-agenda-styles';

const Agenda = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
      const link = document.createElement('link');
      link.id = STYLESHEET_ID;
      link.rel = 'stylesheet';
      link.href = agendaStylesHref;
      document.head.appendChild(link);
 
      return () => {
        const styleElement = document.getElementById(STYLESHEET_ID);
        if (styleElement) {
          document.head.removeChild(styleElement);
        }
      };
    }, []);

  // LÓGICA DE BUSCA DE DADOS RESTAURADA
  const fetchAllCalendarData = useCallback(async () => {
    setIsLoading(true);
    try {
      setError(null);
      const [emprestimosFromApi, eventosFromApi] = await Promise.all([
        getEmprestimos(),
        getEventos(),
      ]);

      const emprestimoEvents = [];
      emprestimosFromApi.forEach((emprestimo) => {
        if (emprestimo.Data_Retirada) {
          emprestimoEvents.push({ id: `emp-ret-${emprestimo.Codigo}`, date: emprestimo.Data_Retirada.slice(0, 10), title: `Retirada: ${emprestimo.Descricao}`, type: "Retirada", color: typeColorMap["Retirada"], isManual: false });
        }
        if (emprestimo.Data_Devolucao) {
          emprestimoEvents.push({ id: `emp-dev-${emprestimo.Codigo}`, date: emprestimo.Data_Devolucao.slice(0, 10), title: `Devolução: ${emprestimo.Descricao}`, type: "Devolução", color: typeColorMap["Devolução"], isManual: false });
        }
      });

      const manualEvents = eventosFromApi.map((evento) => ({ id: evento.Codigo, date: evento.Data.slice(0, 10), title: evento.Titulo, color: typeColorMap["Evento"], isManual: true }));
      setEvents([...emprestimoEvents, ...manualEvents]);
    } catch (err) {
      setError("Não foi possível carregar os dados completos da agenda.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllCalendarData();
  }, [fetchAllCalendarData]);

  // HANDLERS (FUNÇÕES DOS BOTÕES) RESTAURADOS
  const handleEventClick = (event) => {
    if (!event.isManual) {
      alert("Eventos de empréstimo não podem ser editados diretamente.");
      return;
    }
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleOpenModalForCreate = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleSaveEvent = async (eventData, eventToEdit) => {
    try {
      if (eventToEdit) {
        await updateEvento(eventToEdit.id, {
          title: eventData.title,
          date: eventData.date,
        });
        alert("Evento atualizado com sucesso!");
      } else {
        await addEvento({ title: eventData.title, date: eventData.date });
        alert("Evento criado com sucesso!");
      }
      handleCloseModal();
      await fetchAllCalendarData();
    } catch (err) {
      alert("Erro ao salvar evento.");
    }
  };

  const handleDeleteEvent = async (eventToDelete) => {
    try {
      await deleteEvento(eventToDelete.id);
      alert("Evento excluído com sucesso!");
      handleCloseModal();
      await fetchAllCalendarData();
    } catch (err) {
      alert("Erro ao excluir evento.");
    }
  };

  // LAYOUT DE LOADING E ERRO CORRIGIDO
  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <HeaderTailwind />
        <div className="flex">
          <SideBarTailwind />
          <main className="flex-1 flex justify-center items-center p-8">
            <p>Carregando agenda...</p>
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
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Agenda</h1>
          <Calendar
            onAddEvent={handleOpenModalForCreate}
            events={events}
            onEventClick={handleEventClick}
          />
          <AddEventModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSaveEvent={handleSaveEvent}
            eventToEdit={selectedEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        </main>
      </div>
    </div>
  );
};

export default Agenda;