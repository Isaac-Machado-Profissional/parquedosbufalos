const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');
let isAnimating = false;

function lockScroll() { document.body.style.overflow = 'hidden'; }
function unlockScroll() { document.body.style.overflow = ''; }

function openMenu() {
    isAnimating = true;
    lockScroll();
    menuToggle.classList.add('active');
    mobileMenu.classList.add('open');
    menuOverlay.classList.add('active'); // <-- Mostra o blur

    gsap.to(mobileMenu, {
        x: '0%',
        duration: 0.5,
        ease: 'power2.out',
        onComplete() {
            isAnimating = false;
        }
    });
}

function closeMenu() {
    isAnimating = true;
    menuToggle.classList.remove('active');

    gsap.to(mobileMenu, {
        x: '-100%',
        duration: 0.5,
        ease: 'power2.in',
        onComplete() {
            isAnimating = false;
            mobileMenu.classList.remove('open');
            unlockScroll();
            menuOverlay.classList.remove('active'); // <-- Remove o blur
        }
    });
}



menuToggle.addEventListener('click', e => {
    e.stopPropagation();
    if (isAnimating) return;
    if (mobileMenu.classList.contains('open')) {
        closeMenu();
    } else {
        openMenu();
    }
});

// FECHAR ao clicar FORA (sem remover .open aqui)
document.addEventListener('click', e => {
    if (isAnimating) return;
    if (
        mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
    ) {
        closeMenu();  // <— chama apenas a animação de fechar
        // NÃO remova o .open aqui
    }
});

