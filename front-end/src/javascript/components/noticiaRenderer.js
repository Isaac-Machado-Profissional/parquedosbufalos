export function renderNoticias(noticias, containerId = 'showNoticia') {
  const container = document.getElementById(containerId);
  const containerDestaque = document.querySelector('.news-highlighted .col-12');
  const containerOutras = document.getElementById('news-carousel');

  // Limpa elementos previamente inseridos
  if (container) {
    container.querySelectorAll('.from-json').forEach(el => el.remove());
  }
  if (containerOutras) {
    containerOutras.innerHTML = '';
  }

  // Ordena por data mais recente
  const noticiasOrdenadas = [...noticias].sort((a, b) =>
    new Date(b.dataPublicacao) - new Date(a.dataPublicacao)
  );

  // Encontra notícia em destaque (se existir)
  const destaque = noticiasOrdenadas.find(n => n.destaque === 'sim');
  const outrasNoticias = destaque
    ? noticiasOrdenadas.filter(n => n !== destaque)
    : noticiasOrdenadas;

  // Página de Notícias(Destauqe):
  if (containerDestaque && destaque) {
    containerDestaque.innerHTML = `
      <a href="${destaque.link}">
        <div class="card mb-4">
          <div class="card-body">
            <img src="${destaque.imagem}" alt="${destaque.alt || 'Imagem da Notícia Destaque'}">
            <h5 class="card-title">${destaque.titulo}</h5>
            <p class="card-text">${destaque.conteudo? destaque.conteudo.replace(/<[^>]+>/g, '').slice(0, 150): ''}...
          </div>
        </div>
      </a>
    `;
  }

  // Página notícia(Horizontal slider - Outras notícias):
  if (containerOutras) {
    outrasNoticias.slice(0,6).forEach(n => {
      const noticiaHTML = `
        <div class="news-card-horizontal">
          <a href="${n.link}">
            <div class="card-body">
              <img src="${n.imagem}" alt="${n.alt || 'Notícia'}" class="news-img" />
              <div class="card-text-content">
                <h5 class="card-title">${n.titulo}</h5>
              </div>
            </div>
          </a>
        </div>
      `;
      containerOutras.insertAdjacentHTML('beforeend', noticiaHTML);
    });
  }

  // Página de mais notícias(Todas as notícias):
  if (container) {
    noticiasOrdenadas.forEach(n => {
      const year = new Date(n.dataPublicacao).getFullYear();
      const cardHTML = `
        <div class="blockNew from-json col-6 col-sm-4 col-lg-3" data-ano="${year}">
          <a href="${n.link}">
            <div class="card mb-4">
              <div class="card-body">
                <img src="${n.imagem}" alt="${n.alt || 'Imagem da notícia'}">
                <h5 class="card-title">${n.titulo}</h5>
              </div>
              <h6 class="data d-flex align-items-center justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" class="lucide lucide-calendar-days-icon lucide-calendar-days">
                  <path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M3 10h18" /><path d="M8 14h.01" /><path d="M12 14h.01" />
                  <path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>
                <span class="allNewYear">${year}</span>
              </h6>
            </div>
          </a>
        </div>`;
      container.insertAdjacentHTML('beforeend', cardHTML);
    });
  }
}
