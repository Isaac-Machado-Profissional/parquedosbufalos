import "../css/style.css";
import { showTextParkManagement } from "./components/text/textsPlain";
showTextParkManagement();

// Importa funções de Instagram
import { loadInstagramFeed, toggleInstagramFeed } from "./components/instagramPosts";

// Cache de elementos
const outputDiv = document.getElementById("output-instagram");
const buttonImg = document.getElementById("buttonImg");

if (!outputDiv || !buttonImg) {
  console.error("Elemento #output-instagram ou #buttonImg não encontrado.");
} else {
  document.addEventListener("DOMContentLoaded", () => {
    // Placeholder inicial leve (CSS puro)
    outputDiv.innerHTML = `<div class="instagram-loading"></div>`;

    // Callback para IntersectionObserver
    const onIntersect = (entries, obs) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        obs.disconnect(); // Para de observar

        // Executa load quando o navegador estiver ocioso
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => loadInstagramFeed());
        } else {
          setTimeout(() => loadInstagramFeed(), 200);
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
  });
}
