// MAPA BRASIL:::

// Seleciona o elemento da imagem
const img = document.getElementById("mapa-brasil");

// Variáveis para controlar o zoom
let zoomLevel = 1;    // Nível inicial
const zoomMax = 4;    // Nível máximo de zoom
const zoomStep = 1;   // Incremento de zoom

// Função para alternar o zoom, tratando clique e teclado
function toggleZoom(e) {
  // Se for evento de teclado, e a tecla não for Enter, não faz nada.
  if (e.type === "keydown" && e.key !== "Enter" && e.keyCode !== 13) {
    return;
  }

  // Define as posições x e y para a origem do zoom.
  // Para evento de clique, calculamos baseado na posição do mouse.
  // Para evento de teclado, utilizamos valores padrão (centro da imagem).
  let x, y;
  if (e.type === "click") {
    const rect = img.getBoundingClientRect();
    x = ((e.clientX - rect.left) / rect.width) * 100;
    y = ((e.clientY - rect.top) / rect.height) * 100;
  } else {
    // Para teclado, definimos o centro da imagem
    x = 70;
    y = 70;
  }

  // Aplica o zoom ou reseta se atingir o máximo
  if (zoomLevel < zoomMax) {
    zoomLevel += zoomStep;
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = `scale(${zoomLevel})`;
  } else {
    zoomLevel = 1;
    img.style.transformOrigin = "center";
    img.style.transform = "scale(1)";
  }
}

// Registra os listeners para clique e teclado
img.addEventListener("click", toggleZoom);
img.addEventListener("keydown", toggleZoom);

// NEWSLETTER:::

const emailInput = document.getElementById('email');

// Regex para validar e-mails
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Adiciona um listener para o evento de digitação
emailInput.addEventListener('input', () => {
  const emailValue = emailInput.value;

  // Valida o e-mail com a regex
  if (emailRegex.test(emailValue)) {
    emailInput.classList.add('is-valid');
    emailInput.classList.remove('is-invalid');
  } else {
    emailInput.classList.add('is-invalid');
    emailInput.classList.remove('is-valid');
  }
});

// Listener pra pegar e descer até a newslleter caso o link seja clicado
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const scrollTo = urlParams.get("scrollTo");

  if (scrollTo === "newsletter") {
    const target = document.getElementById("newsletter-container");

    if (target) {
      setTimeout(() => {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 500); // dá um tempo para o conteúdo carregar antes de rolar
    }
  }
});