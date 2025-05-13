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

  // Verficiar e aplicar links vindos da legenda do Instagram
  function linkify(text) {
    return text
      // 1) Linka http:// e https://
      .replace(
        /(https?:\/\/[^\s<]+)/g,
        url => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
      )
      // 2) Linka www.
      .replace(
        /\bwww\.[^\s<]+\b/g,
        url => {
          const href = `https://${url}`;
          return `<a href="${href}" target="_blank" rel="noopener noreferrer">${url}</a>`;
        }
      )
      // 3) Linka domínios encurtadores como bit.ly, tinyurl, t.co etc.
      .replace(
        /\b(?:bit\.ly|tinyurl\.com|t\.co|is\.gd|buff\.ly|ow\.ly|rebrand\.ly|rb\.gy)\/[^\s<]+\b/gi,
        url => {
          const href = `https://${url}`;
          return `<a href="${href}" target="_blank" rel="noopener noreferrer">${url}</a>`;
        }
      );
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
      const caption = post.caption || "";


      // Trunca a legenda se for maior que 30 caracteres
      if (fullCaption.length > 125) {
        truncatedCaption = fullCaption.substring(0, 125);
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
          data-caption="${post.caption ? post.caption.substring(0, 30).trim() + '…' : 'Vídeo...'}"
          style="cursor: pointer;"
          tabindex="0"
          role="button"
          aria-label="Reproduzir vídeo">
          <img src="${thumbnail}" class="card-img-top" alt="${post.caption || 'Sem legenda.'}">

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
        let indicators = `<div class="carousel-indicators">`;
        post.children.data.forEach((_, i) => {
          indicators += `
            <button 
              type="button" 
              data-bs-target="#carousel${post.id}" 
              data-bs-slide-to="${i}" 
              class="custom-indicator ${i === 0 ? 'active' : ''}" 
              data-bs-interval="false"
              aria-current="${i === 0 ? 'true' : 'false'}" 
              aria-label="Slide ${i + 1}">
                <span class="progress-ball"></span>
            </button>
          `;
        });
        indicators += `</div>`;
        // Imagens carrossel
        mediaElement = `
          <div id="carousel${post.id}" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
          ${indicators}
         </div>  
          <div class="carousel-inner">
              ${carouselItems}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel${post.id}" data-bs-slide="prev">
              <span class="carousel-custom-icon">
                <svg width="48" height="48" viewBox="0 0 25 24" fill="white" xmlns="http://www.w3.org/2000/svg" transform="rotate(360 0 0)">
                <path d="M14.1085 9.28033C14.4013 8.98744 14.4013 8.51256 14.1085 8.21967C13.8156 7.92678 13.3407 7.92678 13.0478 8.21967L9.79779 11.4697C9.5049 11.7626 9.5049 12.2374 9.79779 12.5303L13.0478 15.7803C13.3407 16.0732 13.8156 16.0732 14.1085 15.7803C14.4013 15.4874 14.4013 15.0126 14.1085 14.7197L11.3888 12L14.1085 9.28033Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3281 2C6.80528 2 2.32812 6.47715 2.32812 12C2.32812 17.5228 6.80528 22 12.3281 22C17.851 22 22.3281 17.5228 22.3281 12C22.3281 6.47715 17.851 2 12.3281 2ZM3.82812 12C3.82812 7.30558 7.6337 3.5 12.3281 3.5C17.0225 3.5 20.8281 7.30558 20.8281 12C20.8281 16.6944 17.0225 20.5 12.3281 20.5C7.6337 20.5 3.82812 16.6944 3.82812 12Z" fill="white"/>
                </svg>
              </span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel${post.id}" data-bs-slide="next">
              <span class="carousel-custom-icon">
                <svg width="48" height="48" viewBox="0 0 25 24" fill="white" xmlns="http://www.w3.org/2000/svg" transform="rotate(180 0 0)">
                <path d="M14.1085 9.28033C14.4013 8.98744 14.4013 8.51256 14.1085 8.21967C13.8156 7.92678 13.3407 7.92678 13.0478 8.21967L9.79779 11.4697C9.5049 11.7626 9.5049 12.2374 9.79779 12.5303L13.0478 15.7803C13.3407 16.0732 13.8156 16.0732 14.1085 15.7803C14.4013 15.4874 14.4013 15.0126 14.1085 14.7197L11.3888 12L14.1085 9.28033Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3281 2C6.80528 2 2.32812 6.47715 2.32812 12C2.32812 17.5228 6.80528 22 12.3281 22C17.851 22 22.3281 17.5228 22.3281 12C22.3281 6.47715 17.851 2 12.3281 2ZM3.82812 12C3.82812 7.30558 7.6337 3.5 12.3281 3.5C17.0225 3.5 20.8281 7.30558 20.8281 12C20.8281 16.6944 17.0225 20.5 12.3281 20.5C7.6337 20.5 3.82812 16.6944 3.82812 12Z" fill="white"/>
                </svg>
              </span>
            </button>
          </div>
        `;
      } else {
        // Para imagem única ou outros tipos de post
        mediaElement = `<img src="${post.media_url}" class="card-img-top w-100 h-100" alt="${post.caption || 'Sem legenda'}">`;
      }

      // Abre uma nova linha a cada 3 posts
      if (index % 3 === 0) {
        html += `<div class="row">`;
      }

      let captionHTML = "";
      if (shouldTruncate) {
        const truncatedHTML = `${linkify(truncatedCaption)}…<a href="#" class="toggle-caption"><br>mais</a>`;
        const fullHTML = `${(linkify(fullCaption))} <a href="#" class="toggle-caption"><br>menos</a>`;
        captionHTML = `
          <p class="instagram-caption"
             data-fulltext="${fullHTML.replace(/"/g, '&quot;')}"
             data-truncatedtext="${truncatedHTML.replace(/"/g, '&quot;')}"
             data-expanded="false">
            ${linkify(truncatedHTML)}
          </p>
        `;
      } else {
        captionHTML = `<p class="instagram-caption">${(linkify(fullCaption))}</p>`;
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

        if (!captionEl) {
          console.warn('Legenda .instagram-caption não encontrada.');
          return;
        }

        const expanded = captionEl.getAttribute('data-expanded') === 'true';

        if (expanded) {
          captionEl.innerHTML = captionEl.getAttribute('data-truncatedtext') || '';
          captionEl.setAttribute('data-expanded', 'false');

          // 🔽 Remove a margin inline para voltar ao padrão CSS
          captionEl.style.marginBottom = '';
        } else {
          captionEl.innerHTML = captionEl.getAttribute('data-fulltext') || '';
          captionEl.setAttribute('data-expanded', 'true');

          // 🔼 Adiciona margem apenas se for o último
          const allCaptions = container.querySelectorAll('.instagram-caption');
          const isLast = captionEl === allCaptions[allCaptions.length - 1];
          captionEl.style.marginBottom = '150px';
        }
      }
    });

  } else {
    container.innerHTML = `<p>Nenhum post encontrado.<br> https://www.instagram.com/parquedostestes/</p>`;
  }
};


document.addEventListener("DOMContentLoaded", function () {
  const outputDiv = document.getElementById("output-instagram");
  const buttonImg = document.getElementById("buttonImg");

  async function toggleInstagramFeed() {
    const isEmpty = outputDiv.childElementCount === 0;

    if (isEmpty) {
      outputDiv.innerHTML = `
        <div class="instagram-loading"></div>
      `;
      const { fetchInstagramFeed } = await import(
        "../services/instagramService.js"
      );
      await renderInstagramPosts(fetchInstagramFeed);

      // troca para colorido e revela
      buttonImg.src =
        "src/assets/index/instagram-logo/Instagram-logo-color.png";
      requestAnimationFrame(() => {
        buttonImg.classList.add("reveal");
      });
    } else {
      outputDiv.innerHTML = "";

      // esconde colorido
      buttonImg.classList.remove("reveal");
      // após a animação, volta o src para B&W
      setTimeout(() => {
        buttonImg.src =
          "src/assets/index/instagram-logo/Instagram-logo-black-white.png";
      }, 400);
    }
  }

  toggleInstagramFeed();
  document
    .querySelectorAll(".midias-container button")
    .forEach((btn) => btn.addEventListener("click", toggleInstagramFeed));

});

// Função para abrir o modal e reproduzir o vídeo

// Inicializa o Video.js globalmeente
window.videoJsPlayer = videojs('videoPlayer', {
  autoplay: false,
  controls: true,
  fluid: true,  // Responsividade
  controlBar: {
    volumePanel: { inline: true },
    subtitlesButton: true,  // Garante que o botão de legendas será mostrado
    liveDisplay: true,  // Se for um vídeo ao vivo
  },
});
window.openAndPlayVideo = function (clickedElement) {
  const videoElement = clickedElement.closest('.video-thumbnail');
  const videoUrl = videoElement ? videoElement.getAttribute('data-video-url') : '';
  const caption = videoElement ? videoElement.getAttribute('data-caption') : '';

  if (!videoUrl) return;

  window.videoJsPlayer.src({ src: videoUrl, type: 'video/mp4' });
  window.videoJsPlayer.load();
  window.videoJsPlayer.play();

  const modalEl = document.getElementById('videoModal');
  const bsModal = new bootstrap.Modal(modalEl);
  bsModal.show();

  const modalCaption = modalEl.querySelector('.modal-caption');
  if (modalCaption) modalCaption.textContent = caption || 'Sem legenda disponível';

  const modalFooter = modalEl.querySelector('#videoModalFooter');
  if (modalFooter) modalFooter.textContent = caption || 'Título não disponível';

  modalEl.addEventListener('hidden.bs.modal', function () {
    window.videoJsPlayer.pause();
    window.videoJsPlayer.currentTime(0);
    window.videoJsPlayer.src({ src: '', type: '' });
    window.videoJsPlayer.load();

    if (modalCaption) modalCaption.textContent = '';
    if (modalFooter) modalFooter.textContent = '';
  }, { once: true });
};

// Usando event delegation para lidar com o clique nas miniaturas
document.querySelector('#output-instagram').addEventListener('click', function (e) {
  const thumbnail = e.target.closest('.video-thumbnail');
  if (thumbnail) {
    window.openAndPlayVideo(thumbnail);
  }
});

// Adiciona o evento de pressionamento da tecla Enter ou Espaço
document.querySelector('#output-instagram').addEventListener('keypress', function (e) {
  const thumbnail = e.target.closest('.video-thumbnail');
  if (thumbnail && (e.key === 'Enter' || e.key === ' ')) {
    window.openAndPlayVideo(thumbnail);
  }
});