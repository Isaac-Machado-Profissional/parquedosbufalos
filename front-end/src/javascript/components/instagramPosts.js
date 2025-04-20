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
    // Limita para 6 posts
    const postsToDisplay = posts.data.slice(0, 6);
    let html = "";

    postsToDisplay.forEach((post, index) => {
      const fullCaption = post.caption || "";
      let truncatedCaption = fullCaption;
      let shouldTruncate = false;

      // Se a legenda tiver mais de 80 caracteres, a truncamos para os primeiros 50
      if (fullCaption.length > 80) {
        truncatedCaption = fullCaption.substring(0, 50);
        shouldTruncate = true;
      }

      let mediaElement = "";
      if (post.media_type === "VIDEO") {
        const thumbnail = post.thumbnail_url ? post.thumbnail_url : post.media_url;
        mediaElement = `
          <div class="video-thumbnail position-relative" data-video-url="${post.media_url}">
            <img src="${thumbnail}" class="card-img-top" alt="${post.caption || 'Sem legenda'}">
            <span class="play-icon position-absolute" style="top:50%; left:50%; transform: translate(-50%, -50%);">
              <i class="bi bi-play-circle-fill" style="font-size: 3rem; color: rgba(255,255,255,0.8);"></i>
            </span>
          </div>
        `;
      } else {
        mediaElement = `<img src="${post.media_url}" class="card-img-top" alt="${post.caption || 'Sem legenda'}">`;
      }

      // Abre nova linha a cada 3 posts
      if (index % 3 === 0) {
        html += `<div class="row">`;
      }

      let captionHTML = "";
      if (shouldTruncate) {
        // Usamos .replace(/"/g, '&quot;') para garantir que nenhuma aspa quebre o atributo
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

    // Registra o listener de clique usando event delegation para os links de toggle
    container.addEventListener('click', function (e) {
      if (e.target.classList.contains('toggle-caption')) {
        e.preventDefault();
        const captionEl = e.target.closest('.instagram-caption');
        const expanded = captionEl.getAttribute('data-expanded') === 'true';

        if (expanded) {
          // Volta para a versão truncada
          captionEl.innerHTML = captionEl.getAttribute('data-truncatedtext');
          captionEl.setAttribute('data-expanded', 'false');
        } else {
          // Expande para a legenda completa
          captionEl.innerHTML = captionEl.getAttribute('data-fulltext');
          captionEl.setAttribute('data-expanded', 'true');
        }
      }
    });
  } else {
    container.innerHTML = `<p>Nenhum post encontrado.<br> https://www.instagram.com/parquedostestes/</p>`;
  }
};

document.querySelectorAll(".midias-container button").forEach((button) => {
  button.addEventListener("click", async function () {
    const outputDiv = document.getElementById("output-instagram");
    if (outputDiv.childElementCount === 0) {
      outputDiv.innerHTML = "<p>Carregando...</p>";
      const { fetchInstagramFeed } = await import('../services/instagramService.js');
      await renderInstagramPosts(fetchInstagramFeed);
    } else {
      outputDiv.innerHTML = "";
    }
  });
});
