import videojs from '../../assets/video-js-v8.22.0/video.js';
import '../../assets/video-js-v8.22.0/video-js.css';

export const renderInstagramPosts = async (fetchInstagramFeed) => {
  // Busca os posts via a função importada
  const posts = await fetchInstagramFeed();
  const container = document.querySelector('#output-instagram');

  if (!container) {
    console.error("Contêiner para os posts não foi encontrado.");
    return;
  }

  // Simula um atraso para o loading
  await new Promise((resolve) => setTimeout(resolve, 500));
  container.innerHTML = "";

  if (posts && posts.data) {
    // Limita para 3 posts (por exemplo)
    const postsToDisplay = posts.data.slice(0, 3);
    let html = "";

    postsToDisplay.forEach((post, index) => {
      const fullCaption = post.caption || "";
      let truncatedCaption = fullCaption;
      let shouldTruncate = false;

      // Trunca a legenda se for maior que 30 caracteres
      if (fullCaption.length > 30) {
        truncatedCaption = fullCaption.substring(0, 30);
        shouldTruncate = true;
      }

      let mediaElement = "";

      // Manipula cada tipo de mídia
      if (post.media_type === "VIDEO") {
        // Para vídeos: exibe a thumbnail com data-caption para uso no modal
        const thumbnail = post.thumbnail_url ? post.thumbnail_url : post.media_url;
        mediaElement = `
        <div class="video-thumbnail position-relative" 
          data-video-url="${post.media_url}" 
          data-caption="${post.caption ? post.caption.substring(0, 30) : 'Vídeo'}"
          style="cursor: pointer;">
    
          <img src="${thumbnail}" class="card-img-top" alt="${post.caption || 'Sem legenda'}">
    
          <span class="play-button">
            <i class="bi bi-circle-fill"></i>
            <i class="bi bi-play-fill"></i>
          </span>
        </div>
        `;
      } else if (post.media_type === "CAROUSEL_ALBUM" && post.children && post.children.data) {
        // Se for post carrossel, monta um slider (utilizando o Bootstrap Carousel)
        let carouselItems = "";
        post.children.data.forEach((child, childIndex) => {
          carouselItems += `
            <div class="carousel-item ${childIndex === 0 ? "active" : ""}">
              <img src="${child.media_url}" class="d-block w-100" alt="${post.caption || 'Imagem do post'}">
            </div>
          `;
        });
        mediaElement = `
          <div id="carousel${post.id}" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              ${carouselItems}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel${post.id}" data-bs-slide="prev">
              <span class="carousel-custom-icon">
                <i class="bi bi-arrow-left-circle-fill"></i>
              </span>
            </button>

            <button class="carousel-control-next" type="button" data-bs-target="#carousel${post.id}" data-bs-slide="next">
              <span class="carousel-custom-icon">
                <i class="bi bi-arrow-right-circle-fill"></i>
              </span>
            </button>
          </div>
        `;
      } else {
        // Para imagem única ou outros tipos de post
        mediaElement = `<img src="${post.media_url}" class="card-img-top" alt="${post.caption || 'Sem legenda'}">`;
      }

      // Abre uma nova linha a cada 3 posts
      if (index % 3 === 0) {
        html += `<div class="row">`;
      }

      let captionHTML = "";
      if (shouldTruncate) {
        const truncatedHTML = `${truncatedCaption} … <a href="#" class="toggle-caption">mais</a>`;
        const fullHTML = `${fullCaption} <a href="#" class="toggle-caption">menos</a>`;
        captionHTML = `
          <p class="instagram-caption"
             data-fulltext="${fullHTML.replace(/"/g, '&quot;')}"
             data-truncatedtext="${truncatedHTML.replace(/"/g, '&quot;')}"
             data-expanded="false">
             ${truncatedHTML}
          </p>
        `;
      } else {
        captionHTML = `<p class="instagram-caption">${fullCaption}</p>`;
      }

      html += `
        <div class="col-12 col-md-4 mb-4">
          <div class="card instagram-post">
            ${mediaElement}
            <div class="card-body">
              ${captionHTML}
              <a class="instagram-link" href="${post.permalink}" target="_blank">Ver no Instagram</a>
            </div>
          </div>
        </div>
      `;

      if (index % 3 === 2 || index === postsToDisplay.length - 1) {
        html += `</div>`;
      }
    });

    container.innerHTML = html;

    // Listener para a funcionalidade de toggle (mais/menos) nas legendas
    container.addEventListener('click', function (e) {
      if (e.target.classList.contains('toggle-caption')) {
        e.preventDefault();
        const captionEl = e.target.closest('.instagram-caption');

        if (captionEl) {
          const expanded = captionEl.getAttribute('data-expanded') === 'true';

          if (expanded) {
            captionEl.innerHTML = captionEl.getAttribute('data-truncatedtext') || '';
            captionEl.setAttribute('data-expanded', 'false');
          } else {
            captionEl.innerHTML = captionEl.getAttribute('data-fulltext') || '';
            captionEl.setAttribute('data-expanded', 'true');
          }
        } else {
          console.warn('Legenda .instagram-caption não encontrada.');
        }
      }
    });
  } else {
    container.innerHTML = `<p>Nenhum post encontrado.<br> https://www.instagram.com/parquedostestes/</p>`;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const outputDiv = document.getElementById("output-instagram");

  async function toggleInstagramFeed() {
    if (outputDiv.childElementCount === 0) {
      outputDiv.innerHTML = "<p>Carregando...</p>";
      const { fetchInstagramFeed } = await import('../services/instagramService.js');
      await renderInstagramPosts(fetchInstagramFeed);
    } else {
      outputDiv.innerHTML = "";
    }
  }

  // Roda a função automaticamente assim que a página carregar
  toggleInstagramFeed();

  // Adiciona o evento de clique para alternar o estado
  document.querySelectorAll(".midias-container button").forEach((button) => {
    button.addEventListener("click", toggleInstagramFeed);
  });
});


// Inicializa o Video.js

const videoJsPlayer = videojs('videoPlayer', {
  autoplay: false,
  controls: true,
  fluid: true,      // para responsividade
  controlBar: {
    volumePanel: { inline: true }
  }
});

document.addEventListener('click', function (e) {
  const thumb = e.target.closest('.video-thumbnail');
  if (!thumb) return;

  e.preventDefault();
  const videoUrl = thumb.getAttribute('data-video-url');
  const caption = thumb.getAttribute('data-caption') || 'Vídeo';
  if (!videoUrl) return;

  // Atualiza rodapé
  document.getElementById('videoModalFooter').textContent = caption;

  // Troca a fonte do Video.js e prepara reprodução
  videoJsPlayer.src({ src: videoUrl, type: 'video/mp4' });
  videoJsPlayer.load();                                      // recarrega o elemento
  videoJsPlayer.play();                                      // toca automaticamente

  // Abre o modal
  const modalEl = document.getElementById('videoModal');
  const bsModal = new bootstrap.Modal(modalEl);
  bsModal.show();

  // No fechamento, pausa e limpa fonte
  modalEl.addEventListener('hidden.bs.modal', function () {
    videoJsPlayer.pause();
    videoJsPlayer.src({ src: '', type: '' });
  }, { once: true });
});