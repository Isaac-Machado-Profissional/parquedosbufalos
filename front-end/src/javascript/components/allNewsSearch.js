const searchInput = document.getElementById('searchInput');
const yearFilter = document.getElementById('yearFilter');
const cards = document.querySelectorAll('.blockNew');

function filterNews() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedYear = yearFilter.value;

  cards.forEach(card => {
    const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
    const year = card.querySelector('.allNewYear')?.textContent.trim() || '';

    const matchesSearch = title.includes(searchTerm);
    const matchesYear = selectedYear === '' || year === selectedYear;

    card.style.display = (matchesSearch && matchesYear) ? '' : 'none';
  });
}

searchInput.addEventListener('input', filterNews);
yearFilter.addEventListener('change', filterNews);
