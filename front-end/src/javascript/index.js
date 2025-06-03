// Importa e executa textos do gerenciamento de parque
import "./css.js"
import "./src/navbar.js";
import '../assets/libs/video-js-v8.22.0/video.js';
import '../assets/libs/video-js-v8.22.0/video-js.css';
import videojs from 'video.js';
import { showTextParkManagement } from "./src/components/text/textsPlain.js"; // Lógica específica de texto
import "./src/instagramLoad.js";

showTextParkManagement();


// --- Lógica de Video.js (Movida de instagramPosts.js para cá) ---

// Inicialização do player Video.js (verifique se o elemento #videoPlayer existe no seu HTML)
const videoPlayerElement = document.getElementById('videoPlayer');
if (videoPlayerElement) {
  window.videoJsPlayer = videojs('videoPlayer', {
    autoplay: false,
    controls: true,
    fluid: true,
    controlBar: {
      volumePanel: { inline: true },
      subtitlesButton: true,
      liveDisplay: true,
    },
  });
} else {
  console.warn("Elemento #videoPlayer não encontrado. O player Video.js não será inicializado.");
}


// Função global para abrir e tocar vídeo (movida de instagramPosts.js)
// Certifique-se de que o modal com ID 'videoModal' e elementos .modal-caption / #videoModalFooter existam no seu HTML
window.openAndPlayVideo = function (clickedElement) {
  const videoElement = clickedElement.closest('.video-thumbnail');
  const videoUrl = videoElement?.getAttribute('data-video-url');
  const caption = videoElement?.getAttribute('data-caption');

  // Adiciona a verificação de que o player existe
  if (!videoUrl || !window.videoJsPlayer) {
    console.error("URL do vídeo ou player Video.js não disponível.");
    return;
  }

  window.videoJsPlayer.src({ src: videoUrl, type: 'video/mp4' });
  window.videoJsPlayer.load();
  window.videoJsPlayer.play();

  const modalEl = document.getElementById('videoModal');
  // Certifique-se de que o Bootstrap JS esteja carregado (CDN no HTML)
  if (modalEl && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();

    const modalCaption = modalEl.querySelector('.modal-caption');
    if (modalCaption) modalCaption.textContent = caption || 'Sem legenda disponível';

    const modalFooter = modalEl.querySelector('#videoModalFooter');
    if (modalFooter) modalFooter.textContent = caption || 'Título não disponível';

    modalEl.addEventListener('hidden.bs.modal', () => {
      window.videoJsPlayer.pause();
      window.videoJsPlayer.currentTime(0);
      window.videoJsPlayer.src({ src: '', type: '' });
      window.videoJsPlayer.load(); // Reseta o source

      if (modalCaption) modalCaption.textContent = '';
      if (modalFooter) modalFooter.textContent = '';
    }, { once: true });
  } else {
    console.error("Elemento modal de vídeo ou Bootstrap Modal não encontrado. O modal não será exibido.");
  }
};

// Usamos DOMContentLoaded para garantir que o DOM esteja carregado antes de adicionar listeners.
document.addEventListener('DOMContentLoaded', () => {
  const outputInstagram = document.querySelector('#output-instagram');
  if (outputInstagram) { // Verifica se o container do Instagram existe
    // Listener para cliques em miniaturas de vídeo (delegação de eventos)
    outputInstagram.addEventListener('click', function (e) {
      const thumbnail = e.target.closest('.video-thumbnail');
      if (thumbnail) {
        window.openAndPlayVideo(thumbnail);
      }
      // Listener para toggle de legenda (delegação de eventos)
      if (e.target.classList.contains('toggle-caption')) {
        e.preventDefault();
        const captionEl = e.target.closest('.instagram-caption');
        if (!captionEl) return;

        const expanded = captionEl.getAttribute('data-expanded') === 'true';
        captionEl.innerHTML = captionEl.getAttribute(expanded ? 'data-truncatedtext' : 'data-fulltext') || '';
        captionEl.setAttribute('data-expanded', expanded ? 'false' : 'true');
        // Ajuste no margin-bottom (opcional, pode ser feito via CSS classes)
        captionEl.style.marginBottom = expanded ? '' : '150px';
      }
    });

    // Listener para keypress em miniaturas de vídeo (delegação de eventos)
    outputInstagram.addEventListener('keypress', function (e) {
      const thumbnail = e.target.closest('.video-thumbnail');
      if (thumbnail && (e.key === 'Enter' || e.key === ' ')) {
        window.openAndPlayVideo(thumbnail);
      }
    });
  }
});

console.log('index.js carregado e inicializado.');