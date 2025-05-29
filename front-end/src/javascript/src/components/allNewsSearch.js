function filterNews() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedYear = yearFilter.value;

  const cards = document.querySelectorAll('.blockNew'); // ← mover para dentro da função

  cards.forEach(card => {
    const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';

    // Tenta pegar o ano do atributo data-ano
    let year = card.getAttribute('data-ano');

    // Se não tiver data-ano, tenta extrair de .allNewYear
    if (!year) {
      const yearSpan = card.querySelector('.allNewYear');
      if (yearSpan) {
        year = yearSpan.textContent.trim();
      }
    }

    const matchesSearch = title.includes(searchTerm);
    const matchesYear = selectedYear === '' || year === selectedYear;

    card.style.display = (matchesSearch && matchesYear) ? '' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  searchInput.addEventListener('input', filterNews);
  yearFilter.addEventListener('change', filterNews);
});