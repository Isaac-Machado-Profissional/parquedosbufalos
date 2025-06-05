document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const yearFilterDropdownButton = document.getElementById('yearFilterDropdown');
  const yearFilterOptionsList = document.getElementById('yearFilterOptions');
  // Pega a referência do SVG dentro do botão
  const yearFilterSVG = yearFilterDropdownButton ? yearFilterDropdownButton.querySelector('svg.lucide-chevron-down-icon') : null;

  let anosAtualmenteAplicados = [];

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  function filterNews() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
    const cards = document.querySelectorAll('.blockNew');
    cards.forEach(card => {
      const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
      let year = card.getAttribute('data-ano');
      if (!year) {
        const yearSpan = card.querySelector('.allNewYear');
        if (yearSpan) { year = yearSpan.textContent.trim(); }
      }
      const matchesSearch = title.includes(searchTerm);
      const matchesYear = anosAtualmenteAplicados.length === 0 || (year && anosAtualmenteAplicados.includes(year));
      card.style.display = (matchesSearch && matchesYear) ? '' : 'none';
    });
  }

  function updateSelectedCount() {
    if (yearFilterOptionsList && yearFilterDropdownButton) {
      const count = yearFilterOptionsList.querySelectorAll('input[type="checkbox"]:checked').length;
      const isDropdownOpen = yearFilterDropdownButton.getAttribute('aria-expanded') === 'true';

      if (count > 0) {
        yearFilterDropdownButton.classList.add('active-filter');
        if (yearFilterSVG) yearFilterSVG.classList.add('active'); // Adiciona 'active' ao SVG
      } else {
        if (!isDropdownOpen) {
          yearFilterDropdownButton.classList.remove('active-filter');
          if (yearFilterSVG) yearFilterSVG.classList.remove('active'); // Remove 'active' do SVG
        }
        // Se dropdown aberto e count=0, botão e SVG permanecem ativos (devido a 'show.bs.dropdown')
      }
    }
  }

  function createYearCheckboxItem(year) {
    const listItem = document.createElement('li');
    const divFormCheck = document.createElement('div');
    divFormCheck.className = 'form-check';
    const inputCheckbox = document.createElement('input');
    inputCheckbox.className = 'form-check-input';
    inputCheckbox.type = 'checkbox';
    inputCheckbox.value = year;
    inputCheckbox.id = `year${year}`;
    const label = document.createElement('label');
    label.className = 'form-check-label';
    label.htmlFor = `year${year}`;
    label.textContent = year;
    divFormCheck.appendChild(inputCheckbox);
    divFormCheck.appendChild(label);
    listItem.appendChild(divFormCheck);

    inputCheckbox.addEventListener('change', function () {
      const selectedYearsFromCheckboxes = [];
      const currentCheckboxes = yearFilterOptionsList.querySelectorAll('input[type="checkbox"]:checked');
      currentCheckboxes.forEach(cb => {
        selectedYearsFromCheckboxes.push(cb.value);
      });
      anosAtualmenteAplicados = selectedYearsFromCheckboxes;
      filterNews();
      updateSelectedCount();
    });
    return listItem;
  }

  function populateYearFilter() { // (Sem alterações nesta função, apenas para contexto)
    if (!yearFilterOptionsList) return;
    const cards = document.querySelectorAll('.blockNew');
    const existingYears = new Set();
    cards.forEach((card) => { /* ... extração de ano ... */
      let year = card.getAttribute('data-ano');
      if (!year) { const yearSpan = card.querySelector('.allNewYear'); if (yearSpan) { year = yearSpan.textContent.trim(); } }
      if (year && /^\d{4}$/.test(year)) { existingYears.add(year); }
    });
    yearFilterOptionsList.innerHTML = '';
    if (existingYears.size === 0) {
      const noYearsItem = document.createElement('li');
      noYearsItem.innerHTML = '<span class="dropdown-item-text">Nenhum ano disponível</span>';
      yearFilterOptionsList.appendChild(noYearsItem);
      if (yearFilterDropdownButton) { yearFilterDropdownButton.disabled = true; }
      return;
    }
    if (yearFilterDropdownButton) { yearFilterDropdownButton.disabled = false; }
    const sortedYears = Array.from(existingYears).sort((a, b) => b - a);
    sortedYears.forEach(year => {
      const checkboxItem = createYearCheckboxItem(year);
      yearFilterOptionsList.appendChild(checkboxItem);
    });
  }

  function inicializarFiltrosDinamicos() { // (Sem alterações nesta função, apenas para contexto)
    populateYearFilter();
    if (yearFilterOptionsList) { /* ... listener de stopPropagation ... */
      yearFilterOptionsList.addEventListener('click', function (event) {
        if (event.target.closest('.form-check') || (event.target.type && event.target.type === 'checkbox') || (event.target.tagName === 'LABEL')) {
          event.stopPropagation();
        }
      });
    }
    updateSelectedCount();
    filterNews();
  }

  if (searchInput) {
    searchInput.addEventListener('input', debounce(filterNews, 300));
  }

  if (yearFilterDropdownButton && yearFilterOptionsList) {
    yearFilterDropdownButton.addEventListener('show.bs.dropdown', function () {
      yearFilterDropdownButton.classList.add('active-filter');
      if (yearFilterSVG) yearFilterSVG.classList.add('active'); // Adiciona 'active' ao SVG
    });

    yearFilterDropdownButton.addEventListener('hide.bs.dropdown', function () {
      if (yearFilterSVG) yearFilterSVG.classList.remove('active'); // Remove 'active' do SVG

      const anyYearSelected = yearFilterOptionsList.querySelector('input[type="checkbox"]:checked');
      if (!anyYearSelected) {
        yearFilterDropdownButton.classList.remove('active-filter');
      }
    });
  }

  document.addEventListener('noticiasCarregadas', () => {
    setTimeout(inicializarFiltrosDinamicos, 50);
  });
});