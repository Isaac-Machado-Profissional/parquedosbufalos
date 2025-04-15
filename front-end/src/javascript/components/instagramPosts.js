import { fetchInstagramFeed } from '../services/instagramService.js';

export const renderInstagramPosts = async () => {
  // Busca os posts do Instagram
  const posts = await fetchInstagramFeed();
  const container = document.querySelector('#output-instagram');

  if (!container) {
    console.error("Contêiner para os posts não foi encontrado.");
    return;
  }

  // Atrasa o carregamnto pq depois quero fazer uma animacao de loading aq cpa
  await new Promise((resolve) => setTimeout(resolve, 500));
  container.innerHTML = "";

  // Limita p 6 posts (2 linhas com 3 posts cada)
  if (posts && posts.data) {
    const postsToDisplay = posts.data.slice(0, 6);
    let html = "";
    
    postsToDisplay.forEach((post, index) => {

      // Truncar a legenda
      const fullCaption = post.caption || "";
      let truncatedCaption = fullCaption;
      let shouldTruncate = false;
      if (fullCaption.length > 80) {
        truncatedCaption = fullCaption.substring(0, 50) + '...';
        shouldTruncate = true;
      }
      
      // Escolhe o elemento de mídia de acordo com o tipo
      let mediaElement = "";
      if (post.media_type === "VIDEO") {
        // Verifica se o thumbnail_url está disponível; caso contrário, pode usar uma imagem padrão
        const thumbnail = post.thumbnail_url ? post.thumbnail_url : post.media_url;
        mediaElement = `
          <div class="video-thumbnail position-relative">
            <img src="${thumbnail}" class="card-img-top" alt="${post.caption || 'Sem legenda'}">
            <span class="play-icon position-absolute" style="top:50%; left:50%; transform: translate(-50%, -50%); font-size: 3rem; color: rgba(255,255,255,0.8);">
              &#9658;
            </span>
          </div>
        `;
      } else {
        mediaElement = `<img src="${post.media_url}" class="card-img-top" alt="${post.caption || 'Sem legenda'}">`;
      }

      // Inicia uma nova linha a cada 3 posts
      if (index % 3 === 0) {
        html += `<div class="row">`;
      }

      // Constrói o card para cada post usando o grid do Bootstrap
      html += `
        <div class="col-4 mb-4">
          <div class="card">
            ${mediaElement}
            <div class="card-body">
              <p class="card-text caption" 
                 data-fulltext="${fullCaption}" 
                 data-truncatedtext="${truncatedCaption}" 
                 data-expanded="false">
                 ${shouldTruncate ? truncatedCaption : fullCaption}
              </p>
              ${shouldTruncate ? '<a href="#" class="toggle-caption">mais</a>' : ''}
              <a href="${post.permalink}" target="_blank">Ver no Instagram</a>
            </div>
          </div>
        </div>
      `;

      // Fecha a linha após 3 posts ou se for o último
      if (index % 3 === 2 || index === postsToDisplay.length - 1) {
        html += `</div>`;
      }
    });
    
    container.innerHTML = html;

    // Listener para alternar a exibição da legenda (mais/menos)
    document.querySelectorAll('.toggle-caption').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const captionEl = this.previousElementSibling;
        if (captionEl.getAttribute('data-expanded') === 'true') {
          captionEl.textContent = captionEl.getAttribute('data-truncatedtext');
          captionEl.setAttribute('data-expanded', 'false');
          this.textContent = 'mais';
        } else {
          captionEl.textContent = captionEl.getAttribute('data-fulltext');
          captionEl.setAttribute('data-expanded', 'true');
          this.textContent = 'menos';
        }
      });
    });
  } else {
    container.innerHTML = "<p>Nenhum post encontrado.</p>";
  }
};
