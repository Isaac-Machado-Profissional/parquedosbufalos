export const renderInstagramPosts = async (fetchInstagramFeed) => {
  // Agora, use a função importada dinamicamente
  const posts = await fetchInstagramFeed();
  const container = document.querySelector('#output-instagram');

  if (!container) {
    console.error("Contêiner para os posts não foi encontrado.");
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, 500));
  container.innerHTML = "";

  if (posts && posts.data) {
    const postsToDisplay = posts.data.slice(0, 6);
    let html = "";
    
    postsToDisplay.forEach((post, index) => {
      const fullCaption = post.caption || "";
      let truncatedCaption = fullCaption;
      let shouldTruncate = false;
      if (fullCaption.length > 80) {
        truncatedCaption = fullCaption.substring(0, 50) + '...';
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
    
      if (index % 3 === 0) {
        html += `<div class="row">`;
      }
    
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
    
      if (index % 3 === 2 || index === postsToDisplay.length - 1) {
        html += `</div>`;
      }
    });
    
    container.innerHTML = html;

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
    container.innerHTML = "<p>Nenhum post encontrado. <br> https://www.instagram.com/parquedostestes/</p>";
  }
}

document.querySelectorAll(".midias-container button").forEach((button) => {
  button.addEventListener("click", async function () {
    let outputDiv = document.getElementById("output-instagram");

    if (outputDiv.childElementCount === 0) {
      outputDiv.innerHTML = "<p>Carregando...</p>";
      const { fetchInstagramFeed } = await import('../services/instagramService.js');
      // Passa a função importada para renderInstagramPosts
      await renderInstagramPosts(fetchInstagramFeed);
    } else {
      outputDiv.innerHTML = "";
    }
  });
});
