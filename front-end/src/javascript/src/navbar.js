document.addEventListener('DOMContentLoaded', () => {
    // Tenta obter os elementos APÓS o DOM estar completamente carregado
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    // VERIFICAÇÃO CRUCIAL:
    // Se algum dos elementos essenciais não for encontrado, não continue.
    if (!menuToggle || !mobileMenu || !menuOverlay) {
        console.warn('Elementos essenciais do Navbar (menuToggle, mobileMenu, ou menuOverlay) não encontrados. Script do Navbar não inicializado completamente.');
        return; // Impede a execução do restante do script se os elementos não existirem
    }

    let isAnimating = false;

    // Estado inicial via GSAP (agora é seguro, pois mobileMenu existe)
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
    // Agora é seguro adicionar o listener, pois menuToggle foi verificado
    menuToggle.addEventListener('click', e => {
        e.stopPropagation();
        animateMenu(!mobileMenu.classList.contains('open'));
    });

    // Fechar ao clicar fora do menu
    // document sempre existe, então este listener é seguro de adicionar aqui.
    // As verificações internas para mobileMenu e menuToggle também são seguras
    // porque já verificamos a existência deles no início.
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
});