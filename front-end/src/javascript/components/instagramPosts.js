import videojs from '../../assets/video-js-v8.22.0/video.js';
import '../../assets/video-js-v8.22.0/video-js.css';

export const renderInstagramPosts = async (fetchInstagramFeed) => {
  const posts = await fetchInstagramFeed();
  const container = document.querySelector('#output-instagram');

  if (!container) {
    console.error("Contêiner para os posts não foi encontrado.");
    return;
  }

  function linkify(text) {
    return text
      .replace(/(https?:\/\/[^\s<]+)/g, url => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`)
      .replace(/\bwww\.[^\s<]+\b/g, url => {
        const href = `https://${url}`;
        return `<a href="${href}" target="_blank" rel="noopener noreferrer">${url}</a>`;
      })
      .replace(/\b(?:bit\.ly|tinyurl\.com|t\.co|is\.gd|buff\.ly|ow\.ly|rebrand\.ly|rb\.gy)\/[^\s<]+\b/gi, url => {
        const href = `https://${url}`;
        return `<a href="${href}" target="_blank" rel="noopener noreferrer">${url}</a>`;
      });
  }

  await new Promise(resolve => setTimeout(resolve, 500));
  container.innerHTML = "";

  if (posts && posts.data) {
    const postsToDisplay = posts.data.slice(0, 3);
    let html = "";

    postsToDisplay.forEach((post, index) => {
      const fullCaption = post.caption || "";
      let truncatedCaption = fullCaption;
      let shouldTruncate = false;

      if (fullCaption.length > 125) {
        truncatedCaption = fullCaption.substring(0, 125);
        shouldTruncate = true;
      }

      let mediaElement = "";

      if (post.media_type === "VIDEO") {
        const thumbnail = post.thumbnail_url || post.media_url;
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
      } else if (post.media_type === "CAROUSEL_ALBUM" && post.children?.data) {
        let carouselItems = post.children.data.map((child, i) => `
          <div class="carousel-item ${i === 0 ? "active" : ""}">
            <img src="${child.media_url}" class="d-block w-100" alt="${post.caption || 'Imagem do post'}">
          </div>`).join("");

        let indicators = post.children.data.map((_, i) => `
          <button 
            type="button" 
            data-bs-target="#carousel${post.id}" 
            data-bs-slide-to="${i}" 
            class="custom-indicator ${i === 0 ? 'active' : ''}" 
            data-bs-interval="false"
            aria-current="${i === 0 ? 'true' : 'false'}" 
            aria-label="Slide ${i + 1}">
              <span class="progress-ball"></span>
          </button>`).join("");

        mediaElement = `
          <div id="carousel${post.id}" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              ${indicators}
            </div>
            <div class="carousel-inner">
              ${carouselItems}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel${post.id}" data-bs-slide="prev">
              <span class="carousel-custom-icon">‹</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel${post.id}" data-bs-slide="next">
              <span class="carousel-custom-icon">›</span>
            </button>
          </div>`;
      } else {
        mediaElement = `<img src="${post.media_url}" class="card-img-top w-100 h-100" alt="${post.caption || 'Sem legenda'}">`;
      }

      if (index % 3 === 0) html += `<div class="row">`;

      let captionHTML = "";
      if (shouldTruncate) {
        const truncatedHTML = `${linkify(truncatedCaption)}… <a href="#" class="toggle-caption"><br>mais</a>`;
        const fullHTML = `${linkify(fullCaption)} <a href="#" class="toggle-caption"><br>menos</a>`;
        captionHTML = `
          <p class="instagram-caption"
             data-fulltext="${fullHTML.replace(/"/g, '&quot;')}"
             data-truncatedtext="${truncatedHTML.replace(/"/g, '&quot;')}"
             data-expanded="false">
            ${truncatedHTML}
          </p>`;
      } else {
        captionHTML = `<p class="instagram-caption">${linkify(fullCaption)}</p>`;
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
        </div>`;

      if (index % 3 === 2 || index === postsToDisplay.length - 1) {
        html += `</div>`;
      }
    });

    container.innerHTML = html;

    container.addEventListener('click', function (e) {
      if (e.target.classList.contains('toggle-caption')) {
        e.preventDefault();
        const captionEl = e.target.closest('.instagram-caption');
        if (!captionEl) return;

        const expanded = captionEl.getAttribute('data-expanded') === 'true';
        captionEl.innerHTML = captionEl.getAttribute(expanded ? 'data-truncatedtext' : 'data-fulltext') || '';
        captionEl.setAttribute('data-expanded', expanded ? 'false' : 'true');
        captionEl.style.marginBottom = expanded ? '' : '150px';
      }
    });

  } else {
    container.innerHTML = `<p>Nenhum post encontrado.<br> <a href="https://www.instagram.com/parquedostestes/" target="_blank">Ver perfil</a></p>`;
  }
};


export async function loadInstagramFeed() {
  const outputDiv = document.getElementById('output-instagram');
  const buttonImg  = document.getElementById('buttonImg');
  if (!outputDiv || !buttonImg) return;

  // placeholder
  outputDiv.innerHTML = `<div class="instagram-loading"></div>`;

  // faz o fetch e renderiza
  const { fetchInstagramFeed } = await import('../services/instagramService.js');
  await renderInstagramPosts(fetchInstagramFeed);

  // anima o logo
  buttonImg.src = 'src/assets/index/instagram-logo/Instagram-logo-color.png';
  requestAnimationFrame(() => buttonImg.classList.add('reveal'));
}

// mantém a função de toggle original, agora só pra botoões
export async function toggleInstagramFeed() {
  const outputDiv = document.getElementById('output-instagram');
  const buttonImg  = document.getElementById('buttonImg');
  if (!outputDiv || !buttonImg) return;

  const isEmpty = outputDiv.childElementCount === 0;
  if (isEmpty) {
    // carrega (reusa nossa loadInstagramFeed)
    await loadInstagramFeed();
  } else {
    // fecha
    outputDiv.innerHTML = '';
    buttonImg.classList.remove('reveal');
    setTimeout(() => {
      buttonImg.src = 'src/assets/index/instagram-logo/Instagram-logo-black-white.png';
    }, 400);
  }
}


// Inicialização do player Video.js 
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

window.openAndPlayVideo = function (clickedElement) {
  const videoElement = clickedElement.closest('.video-thumbnail');
  const videoUrl = videoElement?.getAttribute('data-video-url');
  const caption = videoElement?.getAttribute('data-caption');

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

  modalEl.addEventListener('hidden.bs.modal', () => {
    window.videoJsPlayer.pause();
    window.videoJsPlayer.currentTime(0);
    window.videoJsPlayer.src({ src: '', type: '' });
    window.videoJsPlayer.load();

    if (modalCaption) modalCaption.textContent = '';
    if (modalFooter) modalFooter.textContent = '';
  }, { once: true });
};

document.querySelector('#output-instagram').addEventListener('click', function (e) {
  const thumbnail = e.target.closest('.video-thumbnail');
  if (thumbnail) window.openAndPlayVideo(thumbnail);
});

document.querySelector('#output-instagram').addEventListener('keypress', function (e) {
  const thumbnail = e.target.closest('.video-thumbnail');
  if (thumbnail && (e.key === 'Enter' || e.key === ' ')) {
    window.openAndPlayVideo(thumbnail);
  }
});
