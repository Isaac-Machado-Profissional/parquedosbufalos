const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');

let isAnimating = false;

// Estado inicial via GSAP (evita o "pulo" na primeira animação)
gsap.set(mobileMenu, { x: '-100%' });

function lockScroll() {
  document.body.style.overflow = 'hidden';
}

function unlockScroll() {
  document.body.style.overflow = '';
}

function animateMenu(open) {
  if (isAnimating) return;
  isAnimating = true;

  if (open) {
    lockScroll();
    menuToggle.classList.add('active');
    menuOverlay.classList.add('active');
    mobileMenu.classList.add('open');

    gsap.to(mobileMenu, {
      x: '0%',
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        isAnimating = false;
      }
    });
  } else {
    menuToggle.classList.remove('active');

    gsap.to(mobileMenu, {
      x: '-100%',
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        isAnimating = false;
        mobileMenu.classList.remove('open');
        menuOverlay.classList.remove('active');
        unlockScroll();
      }
    });
  }
}

// Alternar menu ao clicar no toggle
menuToggle.addEventListener('click', e => {
  e.stopPropagation();
  animateMenu(!mobileMenu.classList.contains('open'));
});

// Fechar ao clicar fora do menu
document.addEventListener('click', e => {
  if (
    !isAnimating &&
    mobileMenu.classList.contains('open') &&
    !mobileMenu.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    animateMenu(false);
  }
});
