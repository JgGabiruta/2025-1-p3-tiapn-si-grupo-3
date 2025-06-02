const menuButton = document.querySelector('.menu-button');
const sidebar = document.querySelector('.sidebar');

// Botão de menu lateral
menuButton.addEventListener('click', () => {
  sidebar.classList.toggle('hidden');
});

/* -----------------------Widgets: Contagem------------------- */

// Animação da contagem
document.querySelectorAll(".count").forEach(countElement => {
  countElement.addEventListener("mouseenter", () => {
    const target = +countElement.getAttribute("data-count");
    let current = 0;
    const increment = Math.ceil(target / 50);
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        countElement.textContent = target;
        clearInterval(interval);
      } else {
        countElement.textContent = current;
      }
    }, 20);
  });
});

/* -----------------------Widgets: Lembretes------------------- */

const reminderInput = document.getElementById("reminderInput");
const reminderList = document.getElementById("reminderList");

// Adiciona lembrete ao pressionar Enter
reminderInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && this.value.trim() !== "") {
    addReminder(this.value.trim());
    this.value = "";
  }
});

// Adiciona lembrete visualmente e funcionalmente
function addReminder(text) {
  // Remove aviso "nenhum lembrete"
  clearEmptyReminder();

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.addEventListener("change", () => {
    li.classList.toggle("done");
  });

  const span = document.createElement("span");
  span.textContent = text;

  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "🗑️";
  deleteBtn.classList.add("delete");
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateEmptyState();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  reminderList.appendChild(li);
  updateEmptyState();
}

// Atualiza estado vazio
function updateEmptyState() {
  if (reminderList.children.length === 0) {
    reminderList.innerHTML = `
      <li class="empty-reminder">
        <i class="fa fa-info-circle"></i>
        Nenhum lembrete adicionado ainda.
      </li>
    `;
  }
}

// Remove mensagem de "nenhum lembrete" se presente
function clearEmptyReminder() {
  const empty = reminderList.querySelector(".empty-reminder");
  if (empty) empty.remove();
}

// Inicializa
updateEmptyState();
