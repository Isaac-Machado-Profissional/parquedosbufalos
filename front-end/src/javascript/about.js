// MAPA BRASIL:::

const img = document.getElementById("mapa-brasil");
    let zoomLevel = 1; // Começa no nível normal
    const zoomMax = 4; // Define o nível máximo de zoom
    const zoomStep = 1; // Define de quanto em quanto o zoom aumenta

    img.addEventListener("click", (e) => {
      const rect = img.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      if (zoomLevel < zoomMax) {
        zoomLevel += zoomStep; // Aumenta o zoom
        img.style.transformOrigin = `${x}% ${y}%`; // Define o foco do zoom
        img.style.transform = `scale(${zoomLevel})`;
      } else {
        zoomLevel = 1; // Reseta o zoom quando atinge o máximo
        img.style.transformOrigin = "center";
        img.style.transform = "scale(1)";
      }
    });


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
