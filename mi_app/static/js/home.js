document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const bandDropdown = document.getElementById('bandDropdown');
    const originalItems = Array.from(bandDropdown.querySelectorAll('li')).map(li => li.cloneNode(true));

    // Mostrar dropdown al enfocar
    searchInput.addEventListener('focus', () => {
        bandDropdown.classList.add('show');
    });

    // Ocultar dropdown al salir del input (con retardo para permitir clics)
    searchInput.addEventListener('blur', () => {
        setTimeout(() => bandDropdown.classList.remove('show'), 200);
    });

    // Filtrado en vivo
    searchInput.addEventListener('input', function() {
        const filter = this.value.toLowerCase();
        bandDropdown.innerHTML = '';
        let anyVisible = false;
        originalItems.forEach(item => {
            const text = item.innerText.toLowerCase();
            if (text.includes(filter) || filter === '') {
                bandDropdown.appendChild(item.cloneNode(true));
                anyVisible = true;
            }
        });
        if (!anyVisible) {
            bandDropdown.innerHTML = '<li><span class="dropdown-item text-muted">No se encontraron bandas.</span></li>';
        }
    });

    // --- Rotación de banners laterales ---
    // Puedes agregar más banners agregando rutas a estos arrays:
    const izqImages = [
    '/static/img/banner1.jpeg',
    '/static/img/banner2.jpeg',
    '/static/img/banner3.jpg',
    '/static/img/banner4.jpg',
    '/static/img/banner5.jpg',
    '/static/img/banner6.jpeg',
    '/static/img/banner7.jpeg',
    '/static/img/banner8.jpeg',
    '/static/img/banner9.jpeg',
    '/static/img/banner10.jpeg',
    '/static/img/banner11.jpeg',
    '/static/img/banner12.jpeg',
    '/static/img/banner13.jpeg',
    '/static/img/banner14.jpeg',
    '/static/img/banner15.jpg',
    '/static/img/banner16.jpeg',
    '/static/img/banner17.jpeg',
    '/static/img/banner18.jpg'
    ];
    const derImages = [
    '/static/img/banner1.jpeg',
    '/static/img/banner2.jpeg',
    '/static/img/banner3.jpg',
    '/static/img/banner4.jpg',
    '/static/img/banner5.jpg',
    '/static/img/banner6.jpeg',
    '/static/img/banner7.jpeg',
    '/static/img/banner8.jpeg',
    '/static/img/banner9.jpeg',
    '/static/img/banner10.jpeg',
    '/static/img/banner11.jpeg',
    '/static/img/banner12.jpeg',
    '/static/img/banner13.jpeg',
    '/static/img/banner14.jpeg',
    '/static/img/banner15.jpg',
    '/static/img/banner16.jpeg',
    '/static/img/banner17.jpeg',
    '/static/img/banner18.jpg'
    ];
    let izqIdx = 0, derIdx = 0;
    const izqImg = document.getElementById('bannerIzqImg');
    const derImg = document.getElementById('bannerDerImg');

    setInterval(() => {
        izqIdx = (izqIdx + 1) % izqImages.length;
        izqImg.style.opacity = 0;
        setTimeout(() => {
            izqImg.src = izqImages[izqIdx];
            izqImg.style.opacity = 1;
        }, 500);
    }, 4000);

    setInterval(() => {
        derIdx = (derIdx + 1) % derImages.length;
        derImg.style.opacity = 0;
        setTimeout(() => {
            derImg.src = derImages[derIdx];
            derImg.style.opacity = 1;
        }, 500);
    }, 4000);
});