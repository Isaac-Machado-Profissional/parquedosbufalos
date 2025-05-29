// src/javascript/instagramLoad.js

// Importa as funções que você precisa de instagramPosts.js
import { loadInstagramFeed, toggleInstagramFeed, renderInstagramPosts } from "./components/instagramPosts.js";

// Cache de elementos
const outputDiv = document.getElementById("output-instagram");
const buttonImg = document.getElementById("buttonImg"); // Este elemento é crucial para a animação

// Se os elementos não existirem, loga um erro mas não impede o resto do JS de rodar.
// A lógica dentro de loadInstagramFeed/toggleInstagramFeed já verifica null.
if (!outputDiv || !buttonImg) {
  console.warn("Elemento #output-instagram ou #buttonImg não encontrado. O lazy-load do Instagram pode não funcionar nesta página.");
}

document.addEventListener("DOMContentLoaded", () => {
  if (outputDiv && buttonImg) { // Só inicializa se os elementos existirem
    // Placeholder inicial leve (CSS puro)
    outputDiv.innerHTML = `<div class="instagram-loading"></div>`;

    // Callback para IntersectionObserver
    const onIntersect = (entries, obs) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        obs.disconnect(); // Para de observar assim que o elemento se torna visível

        // Executa load quando o navegador estiver ocioso
        // Correção: Chama loadInstagramFeed diretamente, que já cuida da renderização.
        if ('requestIdleCallback' in window) {
          requestIdleCallback(loadInstagramFeed);
        } else {
          setTimeout(loadInstagramFeed, 200);
        }
      }
    };

    // Observer dispara apenas quando 50% do elemento estiver visível
    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      threshold: 0.5,
      rootMargin: '0px 0px 0px 0px'
    });

    observer.observe(outputDiv);

    // Botões de toggle para abrir/fechar manualmente
    document.querySelectorAll(".midias-container button").forEach(btn => {
      btn.addEventListener("click", toggleInstagramFeed);
    });
  }
});