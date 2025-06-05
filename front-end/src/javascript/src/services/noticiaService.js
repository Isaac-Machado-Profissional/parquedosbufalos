export async function fetchNoticiasOrdenadas() {
    const res = await fetch('./noticias/noticias.json');
    const noticias = await res.json();
    return noticias.sort((a, b) => new Date(b.dataPublicacao) - new Date(a.dataPublicacao));
  }