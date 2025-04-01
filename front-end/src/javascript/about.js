// Captura o campo de entrada
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
