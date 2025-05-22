# FestivalDeMusica (PopFestivalHub)

**FestivalDeMusica** es una plataforma web desarrollada en Django que permite gestionar bandas de música pop, festivales, comentarios de usuarios.

---

## Concepto

La página **FestivalDeMusica** (PopFestivalHub) es una aplicación web donde los usuarios pueden:

- Buscar y descubrir bandas de música pop.
- Ver detalles, imágenes y descripciones de cada banda.
- Comentar sobre las bandas y participar en la comunidad.
- Los administradores pueden agregar, editar y eliminar bandas, así como moderar comentarios.
- Todo el sistema está protegido por autenticación y roles de usuario (admin y usuario normal).
- El sitio cuenta con monitoreo de errores y sesiones en tiempo real usando Sentry y LogRocket.

---

## Tecnologías y Librerías Usadas

- **Python 3.8+**
- **Django**: Framework principal para el backend y la gestión de usuarios, vistas y modelos.
- **Bootstrap 5**: Para el diseño responsivo y componentes visuales.
- **JavaScript**: Para interacción dinámica, AJAX y UX mejorada.
- **Sentry**: Monitoreo de errores y performance del backend.
- **SQLite** (por defecto): Base de datos local para desarrollo.
- **HTML5/CSS3**: Estructura y estilos personalizados.
- **Django Messages**: Para mostrar notificaciones al usuario.
- **AJAX**: Para paginación y edición en vivo sin recargar la página.

---

## Estructura de Archivos

```
web-django/
│
├── mi_proyecto/
│   ├── settings.py
│   ├── urls.py
│   └── ...
│
├── mi_app/
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   ├── templates/
│   │   ├── home.html
│   │   ├── partials/
│   │   │   └── bandas_dropdown.html
│   │   └── ...
│   ├── static/
│   │   ├── css/
│   │   │   └── home.css
│   │   └── js/
│   │       └── home.js
│   └── ...
│
├── manage.py
└── requirements.txt
```

- **mi_proyecto/**: Configuración global de Django.
- **mi_app/**: Lógica de la aplicación, modelos, vistas, templates y archivos estáticos.
- **templates/**: HTML renderizado por Django.
- **static/**: Archivos estáticos (JS, CSS, imágenes).
- **partials/**: Fragmentos HTML reutilizables (como el dropdown de bandas).
- **requirements.txt**: Lista de dependencias del proyecto.

---

## ¿Cómo funciona la aplicación?

1. **Autenticación y roles**:Los usuarios deben registrarse e iniciar sesión. El rol `admin` tiene permisos extra para gestionar bandas y comentarios.
2. **Gestión de bandas**:

   - Los usuarios pueden buscar bandas usando la barra de búsqueda.
   - Los admins pueden agregar nuevas bandas mediante un modal, editar y eliminar bandas existentes.
3. **Comentarios**:

   - Los usuarios pueden dejar comentarios en las bandas.
   - Los admins pueden editar o eliminar cualquier comentario.
4. **Paginación AJAX**:

   - El listado de bandas en el dropdown se pagina dinámicamente sin recargar la página, usando AJAX y un template parcial.
5. **Monitoreo**:

   - **Sentry** captura errores del backend y los asocia a usuarios autenticados.

---

## Instalación y ejecución en localhost

### 1. Clona el repositorio

```sh
git clone https://github.com/tu_usuario/web-django.git
cd web-django
```

### 2. Crea y activa un entorno virtual

**Windows:**

```sh
python -m venv venv
venv\Scripts\activate
```

**Linux/Mac:**

```sh
python3 -m venv venv
source venv/bin/activate
```

### 3. Instala las dependencias

```sh
pip install -r requirements.txt
```

Si no tienes `requirements.txt`, instala manualmente:

```sh
pip install django sentry-sdk
```

### 4. Aplica migraciones y crea un superusuario

```sh
python manage.py migrate
python manage.py createsuperuser
```

### 5. Ejecuta el servidor de desarrollo

```sh
python manage.py runserver
```

Abre tu navegador en [http://localhost:8000](http://localhost:8000)

---

## Notas de monitoreo

- **Sentry** ya está configurado en `settings.py` con `send_default_pii=True` para capturar información de usuario.
- Puedes probar el monitoreo accediendo a `/sentry-debug/` para forzar un error y verlo reflejado en Sentry.

---

## Créditos

Desarrollado por RollingCC121.
Para dudas o mejoras, abre un issue o contacta al administrador del proyecto.

---
