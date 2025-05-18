// newTimeForRead.js
document.addEventListener('DOMContentLoaded', () => {
    const timeEl = document.querySelector('.tempo-leitura');
    if (!timeEl) return;
  
    // Pega todo o texto “visível” dentro do bloco da notícia
    const templateEl = document.querySelector('.new-Template');
    if (!templateEl) {
      timeEl.textContent = 'Até 1 min. de leitura';
      return;
    }
  
    // textContent traz todo texto sem as tags HTML
    let fullText = templateEl.textContent || '';
    fullText = fullText.trim();
  
    // Se for muito curto ou vazio, fallback
    if (!fullText) {
      timeEl.textContent = 'Até 1 min. de leitura';
      return;
    }
  
    // Contagem de palavras (separa por espaços)
    const words = fullText.split(/\s+/).length;
    const minutos = Math.ceil(words / 200);
  
    // Exibição final
    timeEl.textContent = minutos <= 1
      ? 'Até 1 min. de leitura'
      : `${minutos} min. de leitura`;
  });
  