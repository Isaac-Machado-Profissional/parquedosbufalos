const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

let isAnimating = false;

menuToggle.addEventListener('click', () => {
    if (isAnimating) return;  // Evita múltiplos cliques rápidos
    isAnimating = true;

    const isOpen = mobileMenu.classList.contains('open');

    if (isOpen) {
        gsap.to(mobileMenu, {
            x: "-100%",
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
                mobileMenu.classList.remove('open');
                menuToggle.classList.remove('open'); // Remove o "X" do botão
                isAnimating = false;
            }
        });
    } else {
        mobileMenu.style.visibility = "visible";
        gsap.fromTo(mobileMenu,
            { x: "-100%" },
            {
                x: "0%",
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    mobileMenu.classList.add('open');
                    menuToggle.classList.add('open'); // Torna o botão um "X"
                    isAnimating = false;
                }
            }
        );
    }
});
