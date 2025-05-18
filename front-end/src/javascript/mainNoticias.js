import { fetchNoticiasOrdenadas } from './services/noticiaService.js';
import { renderNoticias } from './components/noticiaRenderer.js';

fetchNoticiasOrdenadas()
  .then(noticias => {
    renderNoticias(noticias);
    applyReadTime();              // chama o nosso service depois de renderizar
  })
  .catch(error => console.error("Erro ao carregar notícias:", error));
