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
    let izqIdx = 2, derIdx = 2;
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

    document.querySelectorAll('.eliminar-comentario-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const comentarioId = this.getAttribute('data-id');
            if (confirm('¿Seguro que deseas eliminar este comentario?')) {
                fetch(`/comentario/eliminar_ajax/${comentarioId}/`, {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        this.closest('.list-group-item').remove();
                    } else {
                        alert('No se pudo eliminar el comentario.');
                    }
                });
            }
        });
    });

    document.querySelectorAll('.editar-comentario-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const comentarioId = this.getAttribute('data-id');
            const listItem = this.closest('.list-group-item');
            const form = listItem.querySelector('.editar-comentario-form');
            const textoSpan = listItem.querySelector('.comentario-texto');
            const eliminarBtn = listItem.querySelector('.eliminar-comentario-btn');
            form.style.display = 'block';
            textoSpan.style.display = 'none';
            this.style.display = 'none';
            if (eliminarBtn) eliminarBtn.style.display = 'none';
            // Cancelar edición
            form.querySelector('.cancelar-edicion-btn').onclick = function() {
                form.style.display = 'none';
                textoSpan.style.display = '';
                btn.style.display = '';
                if (eliminarBtn) eliminarBtn.style.display = '';
            };
            // Guardar edición
            form.onsubmit = function(ev) {
                ev.preventDefault();
                const texto = form.querySelector('input[name="texto"]').value;
                fetch(`/comentario/editar_ajax/${comentarioId}/`, {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: new URLSearchParams({texto: texto})
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        textoSpan.childNodes[0].textContent = data.texto + ' ';
                        form.style.display = 'none';
                        textoSpan.style.display = '';
                        btn.style.display = '';
                        if (eliminarBtn) eliminarBtn.style.display = '';
                    } else {
                        alert('No se pudo editar el comentario.');
                    }
                });
            };
        });
    });

    // Editar nombre
    const editarNombreBtn = document.getElementById('editar-nombre-btn');
    if (editarNombreBtn) {
        editarNombreBtn.addEventListener('click', function() {
            const nombreElem = document.getElementById('banda-nombre');
            const nombreActual = nombreElem.textContent.trim();
            nombreElem.innerHTML = `<form id="form-editar-nombre" class="d-inline">
                <input type="text" class="form-control d-inline" style="width:200px;display:inline;" name="nuevo_nombre" value="${nombreActual}" required>
                <button type="submit" class="btn btn-gold btn-sm ms-1">Guardar</button>
                <button type="button" class="btn btn-secondary btn-sm ms-1" id="cancelar-editar-nombre">Cancelar</button>
            </form>`;
            document.getElementById('cancelar-editar-nombre').onclick = function() {
                nombreElem.textContent = nombreActual;
            };
            document.getElementById('form-editar-nombre').onsubmit = function(e) {
                e.preventDefault();
                const nuevoNombre = this.nuevo_nombre.value;
                fetch("{% url 'editar_banda_nombre' banda_detalle.id %}", {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: new URLSearchParams({nombre: nuevoNombre})
                })
                .then(r => r.json())
                .then(data => {
                    if (data.success) {
                        nombreElem.textContent = data.nombre;
                    } else {
                        alert('No se pudo actualizar el nombre.');
                        nombreElem.textContent = nombreActual;
                    }
                });
            };
        });
    }

    // Editar descripción
    const editarDescripcionBtn = document.getElementById('editar-descripcion-btn');
    if (editarDescripcionBtn) {
        editarDescripcionBtn.addEventListener('click', function() {
            const descElem = document.getElementById('banda-descripcion');
            const descActual = descElem.textContent.trim();
            descElem.innerHTML = `<form id="form-editar-desc" class="d-inline">
                <input type="text" class="form-control d-inline" style="width:300px;display:inline;" name="nueva_desc" value="${descActual}" required>
                <button type="submit" class="btn btn-gold btn-sm ms-1">Guardar</button>
                <button type="button" class="btn btn-secondary btn-sm ms-1" id="cancelar-editar-desc">Cancelar</button>
            </form>`;
            document.getElementById('cancelar-editar-desc').onclick = function() {
                descElem.textContent = descActual;
            };
            document.getElementById('form-editar-desc').onsubmit = function(e) {
                e.preventDefault();
                const nuevaDesc = this.nueva_desc.value;
                fetch("{% url 'editar_banda_desc' banda_detalle.id %}", {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: new URLSearchParams({descripcion: nuevaDesc})
                })
                .then(r => r.json())
                .then(data => {
                    if (data.success) {
                        descElem.textContent = data.descripcion;
                    } else {
                        alert('No se pudo actualizar la descripción.');
                        descElem.textContent = descActual;
                    }
                });
            };
        });
    }

    const editarBandaBtn = document.getElementById('editar-banda-btn');
    const formEditarBanda = document.getElementById('form-editar-banda');
    const urlEditarNombre = formEditarBanda.getAttribute('data-url-nombre');
    const urlEditarDesc = formEditarBanda.getAttribute('data-url-desc');
    const nombreElem = document.getElementById('banda-nombre');
    const descElem = document.getElementById('banda-descripcion');
    if (editarBandaBtn && formEditarBanda && nombreElem && descElem) {
        editarBandaBtn.addEventListener('click', function() {
            formEditarBanda.style.display = 'block';
            editarBandaBtn.style.display = 'none';
            document.getElementById('input-nuevo-nombre').value = nombreElem.textContent.trim();
            document.getElementById('input-nueva-desc').value = descElem.textContent.trim();
            nombreElem.style.display = 'none';
            descElem.style.display = 'none';
        });
        document.getElementById('cancelar-editar-banda').onclick = function() {
            formEditarBanda.style.display = 'none';
            editarBandaBtn.style.display = '';
            nombreElem.style.display = '';
            descElem.style.display = '';
        };
        formEditarBanda.onsubmit = function(e) {
            e.preventDefault();
            const nuevoNombre = document.getElementById('input-nuevo-nombre').value;
            const nuevaDesc = document.getElementById('input-nueva-desc').value;
            fetch(urlEditarNombre, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: new URLSearchParams({nombre: nuevoNombre})
            })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    nombreElem.textContent = data.nombre;
                    // Ahora editar la descripción
                    fetch(urlEditarDesc, {
                        method: 'POST',
                        headers: {
                            'X-CSRFToken': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        body: new URLSearchParams({descripcion: nuevaDesc})
                    })
                    .then(r2 => r2.json())
                    .then(data2 => {
                        if (data2.success) {
                            descElem.textContent = data2.descripcion;
                        } else {
                            alert('No se pudo actualizar la descripción.');
                        }
                        formEditarBanda.style.display = 'none';
                        editarBandaBtn.style.display = '';
                        nombreElem.style.display = '';
                        descElem.style.display = '';
                    });
                } else {
                    alert('No se pudo actualizar el nombre.');
                    formEditarBanda.style.display = 'none';
                    editarBandaBtn.style.display = '';
                    nombreElem.style.display = '';
                    descElem.style.display = '';
                }
            });
        };
    }

    // Delegación para paginación AJAX en el dropdown
    document.getElementById('bandDropdown').addEventListener('click', function(e) {
        if (e.target.classList.contains('dropdown-page-link')) {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            const query = e.target.getAttribute('data-query') || '';
            fetch(`/bandas/dropdown_ajax/?page=${page}&q=${encodeURIComponent(query)}`, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(r => r.json())
            .then(data => {
                bandDropdown.innerHTML = data.html;
            });
        }
    });
});