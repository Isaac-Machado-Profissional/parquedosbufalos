document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('progress-slider');
  const wrapper = document.querySelector('.news-scroll-wrapper');
  const carousel = document.querySelector('.news-latest');

  function updateLabel(val) {
      slider.style.setProperty('--percent', val + '%');
  }

  // Slider → Scroll
  slider.addEventListener('input', () => {
      const pct = slider.value / 100;
      const maxScroll = carousel.scrollWidth - wrapper.clientWidth;
      wrapper.scrollLeft = pct * maxScroll;
      updateLabel(slider.value);
  });

  // Scroll → Slider
  wrapper.addEventListener('scroll', () => {
      const maxScroll = carousel.scrollWidth - wrapper.clientWidth;
      const pct = wrapper.scrollLeft / maxScroll;
      const val = Math.round(pct * 100);
      slider.value = val;
      updateLabel(val);
  });

  // 🔁 Simulação de "destravamento" inicial com animação leve
  setTimeout(() => {
      // força scroll 0 → atualiza gradualmente
      wrapper.scrollLeft = 0;
      slider.value = 0;
      updateLabel(0);

      const maxScroll = carousel.scrollWidth - wrapper.clientWidth;

      // scroll suave para a posição "real" (ex: metade do conteúdo visível, opcional)
      const targetScroll = 0; // ou calcule baseado no que quiser
      wrapper.scrollTo({ left: targetScroll, behavior: 'smooth' });
  }, 800); // <- tempo em ms
});
