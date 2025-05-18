export function renderNoticias(noticias, containerId = 'showNoticia') {
  const container = document.getElementById(containerId);
  container.querySelectorAll('.from-json').forEach(el => el.remove());

  noticias.forEach(n => {
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
                  stroke-linejoin="round"
                  class="lucide lucide-calendar-days-icon lucide-calendar-days">
                  <path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" />
                </svg>
              <span class="allNewYear">${year}</span>
            </h6>
          </div>
        </a>
      </div>`;
    container.insertAdjacentHTML('beforeend', cardHTML);
  });
}
