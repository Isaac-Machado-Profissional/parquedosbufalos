document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('share-btn');
    const modal = document.getElementById('share-modal');
    const close = document.getElementById('share-close');
    const currentUrl = encodeURIComponent(window.location.href);
    const whatsappBtn = document.getElementById('share-whatsapp');
    const facebookBtn = document.getElementById('share-facebook');
    const twitterBtn = document.getElementById('share-twitter');
    const instagramBtn = document.getElementById('share-instagram');
    const copyBtn = document.getElementById('copy-link-btn');
    const copyFeedback = document.getElementById('copy-feedback');

    whatsappBtn.href = `https://api.whatsapp.com/send?text=Confira%20isso:%20${currentUrl}`;
    facebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
    twitterBtn.href = `https://twitter.com/intent/tweet?text=Confira%20isso&url=${currentUrl}`;


    copyBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const url = window.location.href;

        navigator.clipboard.writeText(url).then(() => {
            copyFeedback.style.display = 'inline';

            setTimeout(() => {
                copyFeedback.style.display = 'none';
            }, 2000);
        }).catch(err => {
            alert('Erro ao copiar o link.');
            console.error(err);
        });
    });
    // Abre o modal
    btn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Fecha ao clicar no "×"
    close.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fecha ao clicar fora do conteúdo
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});