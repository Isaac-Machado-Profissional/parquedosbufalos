document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('progress-slider');
    const wrapper = document.querySelector('.news-scroll-wrapper');
    const carousel = document.querySelector('.news-latest');

    let isSyncing = false;
    let rafPending = false;
    let maxScroll = 0;

    const calculateMax = () => {
        maxScroll = carousel.scrollWidth - wrapper.clientWidth;
    };

    // Aplica efeito loading visual
    slider.classList.add('loading');
    slider.disabled = true; // impede interação antes do load

    // 1️⃣ Cálculo inicial de limites
    window.addEventListener('load', () => {
        calculateMax();

        // Após load completo, tira loading
        slider.classList.remove('loading');
        slider.disabled = false;
    }, { passive: true });

    window.addEventListener('resize', calculateMax, { passive: true });

    function updateLabel(val) {
        slider.style.setProperty('--percent', val + '%');
    }

    // Slider → Scroll
    slider.addEventListener('input', () => {
        if (slider.disabled) return;
        isSyncing = true;
        const pct = slider.value / 100;
        wrapper.scrollLeft = pct * maxScroll;
        updateLabel(slider.value);
        requestAnimationFrame(() => { isSyncing = false; });
    });

    // Scroll → Slider
    wrapper.addEventListener('scroll', () => {
        if (isSyncing || rafPending || slider.disabled) return;
        rafPending = true;
        requestAnimationFrame(() => {
            const pct = wrapper.scrollLeft / maxScroll;
            const val = Math.round(pct * 100);
            slider.value = val;
            updateLabel(val);
            rafPending = false;
        });
    }, { passive: true });
    // Reforça que o wrapper receba o foco após qualquer "hover" ou clique
    wrapper.addEventListener('mouseenter', () => {
        wrapper.scrollLeft = wrapper.scrollLeft + 1; // pequena mudança → "reativa"
        wrapper.scrollLeft = wrapper.scrollLeft - 1;
    });

    wrapper.addEventListener('touchstart', () => {
        wrapper.scrollLeft += 1;
        wrapper.scrollLeft -= 1;
      }, { passive: true });
      

});
